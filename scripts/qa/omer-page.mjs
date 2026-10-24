// Playwright QA for sherpatech.ai/omer. Run against a local preview on port 4173:
//   npx vite preview --port 4173   then   node scripts/qa/omer-page.mjs
// Needs playwright installed somewhere on NODE_PATH; it is not a project dependency.

import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const results = [];
const check = (name, ok, info = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${info ? '  (' + info + ')' : ''}`);
const URL = 'http://localhost:4173/omer?utm_source=rep&utm_medium=referral&utm_campaign=omer';
for (const [label, w, h] of [['390x844', 390, 844], ['1366x900', 1366, 900]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('#rep-form');
  const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  check(`${label} no horizontal scroll`, sw <= cw, `${sw}/${cw}`);
  check(`${label} hero headline`, (await page.textContent('h1')).includes('Every call answered. Every lead captured.'));
  check(`${label} rep pill`, (await page.textContent('body')).includes('Omer Polanco sent you here'));
  check(`${label} tel link hero`, (await page.getAttribute('[data-cta="call"]', 'href')) === 'tel:+12029993475');
  check(`${label} tel link big number`, (await page.getAttribute('[data-cta="call-big"]', 'href')) === 'tel:+12029993475');
  check(`${label} booking link`, (await page.getAttribute('[data-cta="book"]', 'href')).includes('outlook.office.com/bookwithme'));
  check(`${label} noindex`, (await page.getAttribute('meta[name="robots"]', 'content')) === 'noindex, nofollow');
  const body = await page.textContent('body');
  check(`${label} prices`, ['$1,500', '$200', '100 minutes', '$500', '$50'].every((s) => body.includes(s)));
  check(`${label} minutes note`, body.includes('Call minutes beyond that are billed by the minute.'));
  check(`${label} proof line`, body.includes('chiropractic practice in Virginia'));
  check(`${label} faq count`, (await page.locator('details').count()) === 3);
  check(`${label} no banned words`, !/\u2014|Retell|Twilio|SMS|texting|per minute/.test(body));
  const gutter = await page.evaluate(() => Math.round(document.querySelector('#rep-form').getBoundingClientRect().left));
  check(`${label} 16px gutter`, gutter >= 16, `${gutter}px`);
  // Validation: empty email blocks submit (browser validation), no network call.
  check(`${label} pdf links`, (await page.locator('[data-cta="pdf"]').count()) === 3);
  let posted = false;
  page.on('request', (r) => { if (r.url().includes('hsforms.com')) posted = true; });
  await page.click('[data-cta="submit"]');
  const invalid = await page.evaluate(() => !document.querySelector('#rep-form').checkValidity());
  check(`${label} empty email blocked`, invalid && !posted);
  // Fallback: the HubSpot post is aborted so nothing reaches the live form; page shows fallback.
  await page.route(/hsforms\.com/, (route) => route.abort('failed'));
  await page.fill('input[name="email"]', 'qa@example.com');
  await page.click('[data-cta="submit"]');
  await page.waitForSelector('[role="alert"]', { timeout: 15000 });
  check(`${label} fallback shown`, (await page.textContent('[role="alert"]')).includes('That did not go through'));
  await page.screenshot({ path: `/home/user/sherpatech.ai/screenshots/omer-${label}-fallback.png`, clip: await page.locator('#lead').boundingBox() });
  await page.close();
}
// Success state: intercept the HubSpot post and verify the payload and message.
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
let payload = null;
await page.route(/hsforms\.com/, (route) => { payload = JSON.parse(route.request().postData()); route.fulfill({ status: 200, contentType: 'application/json', body: '{"inlineMessage":"ok"}' }); });
await page.goto(URL, { waitUntil: 'networkidle' });
await page.fill('input[name="firstname"]', 'QA');
await page.fill('input[name="email"]', 'qa@example.com');
await page.fill('input[name="company"]', 'ZZ Test Business');
await page.click('[data-cta="submit"]');
await page.waitForSelector('[role="status"]', { timeout: 15000 }).catch(async () => { console.log('DEBUG lead html:', (await page.innerText('#lead')).slice(0, 300), 'payload:', !!payload); });
const msg = await page.textContent('[role="status"]');
check('success message', msg.includes('Got it.') && msg.includes('Mark will reach out within one business day. Omer will check in too.'));
const f = Object.fromEntries(payload.fields.map((x) => [x.name, x.value]));
check('payload sales_rep', f.sales_rep === 'Omer Polanco');
check('payload rep_intro_date', /^\d{13}$/.test(f.rep_intro_date) && Number(f.rep_intro_date) % 86400000 === 0);
check('payload pageUri keeps utm', payload.context.pageUri.includes('utm_campaign=omer') && payload.context.pageUri.includes('utm_source=rep'));
check('payload pageName', typeof payload.context.pageName === 'string' && payload.context.pageName.length > 0);
await page.screenshot({ path: '/home/user/sherpatech.ai/screenshots/omer-390x844-success.png', clip: await page.locator('#lead').boundingBox() });
await browser.close();
console.log(results.join('\n'));
console.log(`\n${results.filter((r) => r.startsWith('PASS')).length}/${results.length} passed`);
