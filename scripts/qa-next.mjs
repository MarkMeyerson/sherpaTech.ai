// QA for /next: screenshots at phone and laptop sizes, card buttons, inline
// form with visible fields, ?path= persistence, no sideways scroll, and one
// real test submission (delete the contact afterwards).
// Run with the dev server up: node scripts/qa-next.mjs [baseUrl]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] || 'http://localhost:5173';
const BOOKING_USER = 'bookwithme/user/6234b8ab86204535933296e86a1a6799@sherpatech.ai';
const TEST_EMAIL = 'mark+next-site-test@sherpatech.ai';
mkdirSync('screenshots', { recursive: true });

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  [${detail}]` : ''}`); };

async function formState(page) {
  return page.evaluate(() => {
    const form = document.querySelector('form#next-form');
    const iframe = document.querySelector('#choose iframe');
    const fields = form
      ? Array.from(form.querySelectorAll('input, textarea, select'))
          .filter((el) => el.offsetParent !== null && el.getBoundingClientRect().height >= 44)
          .map((el) => el.name)
      : [];
    return { hasForm: !!form, hasIframe: !!iframe, fields, select: form ? form.querySelector('select').value : null };
  });
}

const viewports = [
  ['mobile-390x844', { width: 390, height: 844 }],
  ['desktop-1366x900', { width: 1366, height: 900 }],
];

for (const [label, viewport] of viewports) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto(`${base}/next`, { waitUntil: 'networkidle' });
  await page.waitForSelector('form#next-form');

  const scroll = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  check(`${label}: no horizontal scroll`, scroll.sw <= scroll.cw, `scrollWidth ${scroll.sw} clientWidth ${scroll.cw}`);

  const cards = await page.$$eval('[data-path]', (els) =>
    els.map((el) => {
      const btn = el.querySelector('a[data-cta]');
      const r = btn.getBoundingClientRect();
      const cr = el.getBoundingClientRect();
      return {
        path: el.dataset.path,
        label: btn.textContent.trim(),
        href: btn.getAttribute('href'),
        btnHeight: Math.round(r.height),
        btnWidth: Math.round(r.width),
        cardWidth: Math.round(cr.width),
        cardLeft: Math.round(cr.left),
      };
    }),
  );
  for (const c of cards) {
    // Card padding is 20px each side plus 1px borders, so a full-width button is card width minus 42.
    check(
      `${label}: ${c.path} button "${c.label}" -> ${c.href}`,
      c.btnHeight >= 44 && Math.abs(c.btnWidth - (c.cardWidth - 42)) <= 2,
      `h=${c.btnHeight} w=${c.btnWidth} card=${c.cardWidth}`,
    );
  }
  if (viewport.width === 390) {
    check(
      `${label}: cards have 16px side gutters`,
      cards.every((c) => c.cardLeft === 16 && c.cardWidth === 390 - 32),
      cards.map((c) => `${c.cardLeft}/${c.cardWidth}`).join(' '),
    );
    const h1 = await page.$eval('h1', (el) => ({ w: el.getBoundingClientRect().width, overflow: el.scrollWidth > el.clientWidth }));
    check(`${label}: headline wraps without overflow`, !h1.overflow, `width ${Math.round(h1.w)}`);
  }

  const fs = await formState(page);
  check(`${label}: form renders inline (no iframe) with 7 visible fields at 44px or taller`, fs.hasForm && !fs.hasIframe && fs.fields.length === 7, JSON.stringify(fs));
  check(`${label}: no fallback note while the form is showing`, (await page.$('text=Form not showing?')) === null);
  check(`${label}: heading text`, (await page.textContent('#choose h2')).trim() === 'Not sure which one? Tell me about your business.');

  await page.screenshot({ path: `screenshots/next-${label}.png`, fullPage: true });

  await page.click('text=Pick my path');
  await page.waitForTimeout(800);
  const pathsTop = await page.$eval('#paths', (el) => Math.round(el.getBoundingClientRect().top));
  check(`${label}: "Pick my path" scrolls to cards`, pathsTop >= 0 && pathsTop <= 120, `top=${pathsTop}`);

  const [popup] = await Promise.all([page.waitForEvent('popup', { timeout: 8000 }), page.click('a[data-cta="build"]')]);
  check(`${label}: build button opens the booking page`, popup.url().includes(BOOKING_USER), popup.url());
  await popup.close();
  const [popup2] = await Promise.all([page.waitForEvent('popup', { timeout: 8000 }), page.click('[data-path="coach"]')]);
  check(`${label}: coach card (whole card) opens the booking page`, popup2.url().includes(BOOKING_USER), popup2.url());
  await popup2.close();

  await page.click('a[data-cta="recording"]');
  await page.waitForTimeout(800);
  const url = new URL(page.url());
  const chooseTop = await page.$eval('#choose', (el) => Math.round(el.getBoundingClientRect().top));
  check(`${label}: recording button sets ?path=recording and scrolls to form`, url.searchParams.get('path') === 'recording' && chooseTop <= 120, `${page.url()} top=${chooseTop}`);
  const sel = await page.$eval('form#next-form select', (el) => el.value);
  check(`${label}: card click preselects the path on the form`, sel === 'recording_only', sel);

  const [popup3] = await Promise.all([page.waitForEvent('popup', { timeout: 8000 }), page.click('a[data-cta="group"]')]);
  check(`${label}: group button opens the Stripe payment link`, popup3.url().startsWith('https://buy.stripe.com/dRm28r4NS8977iaaOyeIw04'), popup3.url());
  await popup3.close();
  await page.close();
}

// Return from Stripe shows the cohort thank-you instead of the form.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/next?paid=cohort`, { waitUntil: 'networkidle' });
  const h = (await page.textContent('#choose h2')).trim();
  const hasForm = (await page.$('form#next-form')) !== null;
  check('?paid=cohort shows the seat-reserved message and no form', h === 'You are in.' && !hasForm, `h2=${h} form=${hasForm}`);
  await page.screenshot({ path: 'screenshots/next-mobile-paid-cohort.png', fullPage: false });
  await page.close();
}

// Direct visit with ?path=recording keeps the parameter after the form loads.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/next?path=recording&utm_source=qa`, { waitUntil: 'networkidle' });
  await page.waitForSelector('form#next-form');
  const u = new URL(page.url());
  check('direct visit keeps ?path=recording and utm_source after the form loads', u.searchParams.get('path') === 'recording' && u.searchParams.get('utm_source') === 'qa', page.url());
  const sel = await page.$eval('form#next-form select', (el) => el.value);
  check('direct visit preselects the path on the form', sel === 'recording_only', sel);
  await page.screenshot({ path: 'screenshots/next-mobile-path-recording.png', fullPage: true });
  await page.close();
}

// Real submission against the site form, then the thank-you with the build sheet link.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/next?path=recording`, { waitUntil: 'networkidle' });
  await page.waitForSelector('form#next-form');
  await page.fill('input[name=firstname]', 'QA');
  await page.fill('input[name=lastname]', 'Test');
  await page.fill('input[name=email]', TEST_EMAIL);
  await page.fill('input[name=company]', 'QA Test Co');
  await page.fill('textarea[name=voice_ai__what_to_handle]', 'Automated QA submission, safe to delete.');
  const [resp] = await Promise.all([
    page.waitForResponse((r) => r.url().includes('/submissions/v3/integration/submit/'), { timeout: 15000 }),
    page.click('button[type=submit]'),
  ]);
  check('submission accepted by HubSpot', resp.status() === 200, `HTTP ${resp.status()}`);
  const link = await page.waitForSelector('a[href="https://tinyurl.com/SherpatechLive"]', { timeout: 5000 }).catch(() => null);
  const text = link ? (await link.textContent()).trim() : null;
  check('thank-you shows the build sheet link', text === 'Open the build sheet with every prompt', String(text));
  await page.screenshot({ path: 'screenshots/next-mobile-thank-you.png', fullPage: false });
  await page.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
