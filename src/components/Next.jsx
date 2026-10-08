import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { track } from '@vercel/analytics';

// Follow-up page for people who heard the voice agent demo.
// One job: pick a path. Two paths book a call, two go to the form.
// House rules: no em dashes, no vendor names, no per-minute prices.

// ── Links ────────────────────────────────────────────────────────────────────
const BOOKING_URL =
  'https://outlook.office.com/bookwithme/user/6234b8ab86204535933296e86a1a6799@sherpatech.ai?anonymous';

// Stripe payment link for the $497 cohort. Empty until one exists; while it is
// empty the group card sends people to the form as a waitlist instead.
const COHORT_CHECKOUT_URL = '';

// Build sheet with every prompt from the live build. Shown after the form submits.
const BUILD_SHEET_URL = 'https://tinyurl.com/SherpatechLive';

// ── HubSpot ──────────────────────────────────────────────────────────────────
// The page renders its own form and posts to the Forms Submission API. The
// original "Voice AI next step" form (88162ad1) only renders inside a HubSpot
// iframe, which showed as a blank box on phones, and the API refuses it while
// CAPTCHA is on. scripts/hubspot/create-next-site-form.mjs made this sibling
// form with the same fields and no CAPTCHA.
const HUBSPOT_PORTAL_ID = '243001979';
const NEXT_SITE_FORM_ID = 'fdb57885-ec27-4f9e-a6c1-68ed0d3fecb4';
const SUBMIT_URL = `https://api-na2.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${NEXT_SITE_FORM_ID}`;
const HOSTED_FORM_URL = 'https://40odiz.share-na2.hsforms.com/2iBYq0VT-SNioQNWDtrjhrg';

const DEMO_PHONE_DISPLAY = '(202) 999-3475';
const DEMO_PHONE_HREF = 'tel:+12029993475';

const PAGE_TITLE = 'Pick how you want your phone answered | SherpaTech.AI';
const PAGE_DESCRIPTION =
  'You heard the voice agent demo. Choose what comes next: have it built for you, get coached while you build it, build it in a group, or just get the recording and the prompts.';

// Brand tokens
const colors = {
  navyBlue: '#1B365D',
  mountainBlue: '#2B517A',
  orange: '#FF6A3D',
  iceBlue: '#E8EEF4',
  pearlWhite: '#F7FAFC',
  alpineWhite: '#FFFFFF',
  muted: '#4a5568',
};

// ── Layout ───────────────────────────────────────────────────────────────────

const PageContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  color: ${colors.navyBlue};
  line-height: 1.6;
  overflow-x: hidden;

  a:focus-visible,
  button:focus-visible,
  summary:focus-visible,
  [role='link']:focus-visible {
    outline: 3px solid ${colors.orange};
    outline-offset: 3px;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0 20px;
  }
`;

const Section = styled.section`
  background: ${(p) => p.$bg || colors.alpineWhite};
  padding: 56px 0;

  @media (min-width: 768px) {
    padding: 72px 0;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 800;
  line-height: 1.25;
  margin: 0 auto 28px;
  text-align: center;
  max-width: 760px;
  color: ${colors.navyBlue};
`;

// ── Hero ─────────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  background: linear-gradient(180deg, ${colors.pearlWhite} 0%, ${colors.iceBlue} 100%);
  padding: 56px 0 48px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 80px 0 64px;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 auto 16px;
  max-width: 800px;
  color: ${colors.navyBlue};
  overflow-wrap: anywhere;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  color: ${colors.muted};
  margin: 0 auto 28px;
  max-width: 640px;

  a {
    color: ${colors.navyBlue};
    font-weight: 700;
    white-space: nowrap;
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  background: ${colors.orange};
  color: ${colors.alpineWhite};
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 800;
  text-decoration: none;
  padding: 16px 36px;
  border-radius: 12px;
  min-width: 220px;
  min-height: 44px;
  text-align: center;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #e85a2f;
    transform: translateY(-1px);
  }
`;

// ── Path cards ───────────────────────────────────────────────────────────────

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.div`
  background: ${colors.alpineWhite};
  border: 1px solid #e2e8f0;
  border-top: 4px solid ${colors.orange};
  border-radius: 14px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 10px 30px rgba(27, 54, 93, 0.12);
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.3;
  margin: 0 0 10px;
  color: ${colors.navyBlue};
`;

const CardPrice = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 10px;
  color: ${colors.orange};

  span {
    font-size: 15px;
    font-weight: 600;
    color: ${colors.muted};
  }
`;

const CardText = styled.p`
  font-size: 15px;
  color: ${colors.muted};
  margin: 0;
`;

const CardDetails = styled.ul`
  list-style: none;
  padding: 0;
  margin: 14px 0 0;
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: ${colors.muted};

  strong {
    color: ${colors.navyBlue};
  }
`;

const CardButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  margin-top: 20px;
  padding: 12px 16px;
  background: ${colors.orange};
  color: ${colors.alpineWhite};
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;
  text-align: center;
  border-radius: 10px;
  transition: background 0.2s;

  &:hover {
    background: #e85a2f;
  }
`;

// Push the button to the bottom so all four line up.
const CardBody = styled.div`
  flex: 1;
`;

const Proof = styled.p`
  max-width: 720px;
  margin: 32px auto 0;
  text-align: center;
  font-size: 16px;
  color: ${colors.navyBlue};
`;

// ── Form ─────────────────────────────────────────────────────────────────────

const FormWrap = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(27, 54, 93, 0.08);
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 20px;

  @media (min-width: 768px) {
    padding: 36px 40px;
  }
`;

const FormGrid = styled.form`
  display: grid;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);

    .full {
      grid-column: 1 / -1;
    }
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: ${colors.navyBlue};

  input,
  textarea,
  select {
    width: 100%;
    box-sizing: border-box;
    min-height: 44px;
    padding: 10px 12px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: ${colors.navyBlue};
    background: ${colors.alpineWhite};
    border: 1px solid #cbd5e0;
    border-radius: 8px;
  }

  textarea {
    min-height: 96px;
    resize: vertical;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid ${colors.orange};
    outline-offset: 1px;
    border-color: ${colors.orange};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  min-height: 48px;
  padding: 12px 24px;
  background: ${colors.orange};
  color: ${colors.alpineWhite};
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 800;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e85a2f;
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const FormNote = styled.p`
  max-width: 640px;
  margin: 16px auto 0;
  text-align: center;
  font-size: 14px;
  color: ${colors.muted};

  a {
    color: ${colors.navyBlue};
    font-weight: 700;
  }
`;

const ErrorNote = styled.p`
  margin: 0;
  font-size: 15px;
  color: #b42318;

  a {
    color: ${colors.navyBlue};
    font-weight: 700;
  }
`;

const ThankYou = styled.div`
  text-align: center;
  padding: 12px 0;

  h3 {
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    font-weight: 800;
    margin: 0 0 12px;
    color: ${colors.navyBlue};
  }

  p {
    margin: 0 0 20px;
    font-size: 16px;
    color: ${colors.muted};
  }
`;

// ── FAQ ──────────────────────────────────────────────────────────────────────

const FaqList = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: grid;
  gap: 10px;
`;

const FaqItem = styled.details`
  background: ${colors.alpineWhite};
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 18px;

  &[open] {
    border-color: ${colors.orange};
  }

  summary {
    cursor: pointer;
    list-style: none;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 16px;
    padding: 16px 28px 16px 0;
    position: relative;
    color: ${colors.navyBlue};
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::after {
    content: '+';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 22px;
    font-weight: 400;
    color: ${colors.mountainBlue};
  }

  &[open] summary::after {
    content: '\\2013';
  }

  p {
    margin: 0 0 16px;
    font-size: 15px;
    color: ${colors.muted};
  }
`;

// ── Content ──────────────────────────────────────────────────────────────────

// Same order as the options on the HubSpot form. `path` is the ?path= value and
// `option` is the matching dropdown value on the form.
const PATHS = [
  {
    key: 'build',
    option: 'build_it_for_me',
    title: 'Build it for me',
    price: '$1,500',
    text: 'I build and launch your voice agent.',
    details: [
      ['What you get', 'the receptionist agent built, tested with you, connected to your calendar, and live on your number.'],
      ['How long', 'live within two weeks of our first call.'],
      ['Running cost', 'Running costs are small. I show you the exact numbers on our call.'],
    ],
    cta: 'Book a 20-minute call',
    href: BOOKING_URL,
    event: 'next_click_build',
  },
  {
    key: 'coach',
    option: 'coach_me',
    title: 'Coach me, I build it',
    price: '$150',
    unit: '/hour',
    text: 'We build it together on calls.',
    cta: 'Book a 20-minute call',
    href: BOOKING_URL,
    event: 'next_click_coach',
  },
  {
    key: 'group',
    option: 'cohort',
    title: 'Build it in a group',
    price: '$497',
    text: 'Four-week cohort.',
    cta: COHORT_CHECKOUT_URL ? 'Reserve my seat' : 'Join the waitlist',
    href: COHORT_CHECKOUT_URL || null,
    event: 'next_click_group',
  },
  {
    key: 'recording',
    option: 'recording_only',
    title: 'Just the recording and the prompts',
    price: 'Free',
    text: 'The prompts are ready now. The recording follows by email.',
    cta: 'Send me the prompts',
    href: null,
    event: 'next_click_recording',
  },
];

const FAQ = [
  {
    q: 'What does it cost per call?',
    a: 'Calls are billed by the minute, and you pay only for the time the agent is on the phone. What that adds up to depends on how many calls you get and how long they run. Tell me about your phone traffic on the form and I will send you a number that fits your business.',
  },
  {
    q: 'How long does setup take?',
    a: 'Fast. A working agent can be taking real calls on a live phone number within hours, often by the next morning. From there we tune it to how your business handles calls.',
  },
  {
    q: 'What happens after I submit?',
    a: 'Mark replies within one business day with the next step for the path you picked.',
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  const created = !el;
  const previous = el ? el.getAttribute('content') : null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return () => {
    if (created) el.remove();
    else if (previous !== null) el.setAttribute('content', previous);
  };
}

function readPathParam() {
  const value = new URLSearchParams(window.location.search).get('path');
  return PATHS.some((p) => p.key === value) ? value : '';
}

// Keeps ?path= in the address bar so HubSpot records it with the submission.
function writePathParam(key) {
  const url = new URL(window.location.href);
  url.searchParams.set('path', key);
  window.history.replaceState(window.history.state, '', url);
}

function readCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

const EMPTY_FORM = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  company: '',
  voice_ai__what_to_handle: '',
  voice_ai_next_step: '',
};

// The form is plain HTML posting to HubSpot's Forms Submission API, so it
// renders the same on every phone. The page URL goes along as pageUri, which
// keeps ?path= and any UTM parameters on the submission in HubSpot.
const NextForm = ({ pathKey }) => {
  const [values, setValues] = useState(() => ({
    ...EMPTY_FORM,
    voice_ai_next_step: PATHS.find((p) => p.key === pathKey)?.option || '',
  }));
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // A card click picks the path on the form.
  useEffect(() => {
    const option = PATHS.find((p) => p.key === pathKey)?.option;
    if (option) setValues((v) => ({ ...v, voice_ai_next_step: option }));
  }, [pathKey]);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const fields = Object.entries(values)
      .filter(([, value]) => value.trim() !== '')
      .map(([name, value]) => ({ objectTypeId: '0-1', name, value: value.trim() }));
    const context = { pageUri: window.location.href, pageName: document.title };
    const hutk = readCookie('hubspotutk');
    if (hutk) context.hutk = hutk;

    try {
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, context }),
      });
      if (!res.ok) throw new Error(`HubSpot ${res.status}`);
      setStatus('sent');
      track('next_form_submitted', { path: pathKey || 'none' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <ThankYou>
        <h3>Got it.</h3>
        <p>
          {pathKey === 'recording'
            ? 'The prompts are ready now. The recording follows by email.'
            : 'Mark replies within one business day with the next step for the path you picked.'}
        </p>
        <PrimaryButton href={BUILD_SHEET_URL} target="_blank" rel="noopener noreferrer">
          Open the build sheet with every prompt
        </PrimaryButton>
      </ThankYou>
    );
  }

  return (
    <FormGrid id="next-form" onSubmit={submit} noValidate={false}>
      <Field>
        First name
        <input type="text" name="firstname" autoComplete="given-name" value={values.firstname} onChange={update} />
      </Field>
      <Field>
        Last name
        <input type="text" name="lastname" autoComplete="family-name" value={values.lastname} onChange={update} />
      </Field>
      <Field>
        Email
        <input type="email" name="email" autoComplete="email" required value={values.email} onChange={update} />
      </Field>
      <Field>
        Phone, if you would rather talk
        <input type="tel" name="phone" autoComplete="tel" value={values.phone} onChange={update} />
      </Field>
      <Field className="full">
        Business or organization
        <input type="text" name="company" autoComplete="organization" value={values.company} onChange={update} />
      </Field>
      <Field className="full">
        What do you want your phone agent to handle?
        <textarea name="voice_ai__what_to_handle" rows={4} value={values.voice_ai__what_to_handle} onChange={update} />
      </Field>
      <Field className="full">
        Which path fits you?
        <select name="voice_ai_next_step" required value={values.voice_ai_next_step} onChange={update}>
          <option value="">Pick one</option>
          {PATHS.map((p) => (
            <option key={p.option} value={p.option}>
              {p.title}
            </option>
          ))}
        </select>
      </Field>
      {status === 'error' && (
        <ErrorNote className="full">
          That did not go through.{' '}
          <a href={HOSTED_FORM_URL} target="_blank" rel="noopener noreferrer">
            Open the form in a new tab
          </a>{' '}
          and send it from there.
        </ErrorNote>
      )}
      <div className="full">
        <SubmitButton type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : 'Send'}
        </SubmitButton>
      </div>
    </FormGrid>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

const Next = () => {
  const [pathKey, setPathKey] = useState(() => readPathParam());

  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;
    const cleanups = [
      setMeta('name', 'description', PAGE_DESCRIPTION),
      setMeta('property', 'og:title', PAGE_TITLE),
      setMeta('property', 'og:description', PAGE_DESCRIPTION),
      setMeta('property', 'og:url', 'https://sherpatech.ai/next'),
      // Follow-up page for people who heard the demo. Keep it out of search results.
      setMeta('name', 'robots', 'noindex, nofollow'),
    ];
    return () => {
      document.title = previousTitle;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPaths = (e) => {
    e.preventDefault();
    scrollTo('paths');
  };

  // One handler for the card and its button. External paths open the booking
  // page in a new tab; the others tag the URL and scroll to the form.
  const choosePath = useCallback((p) => {
    track(p.event);
    if (p.href) {
      window.open(p.href, '_blank', 'noopener');
      return;
    }
    writePathParam(p.key);
    setPathKey(p.key);
    scrollTo('choose');
  }, []);

  const onCardKey = (e, p) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choosePath(p);
    }
  };

  return (
    <PageContainer>
      {/* 1. Headline and demo line */}
      <HeroSection>
        <Container>
          <HeroTitle>Pick how you want your phone answered.</HeroTitle>
          <HeroSubtitle>
            You heard the demo. Call it again any time: <a href={DEMO_PHONE_HREF}>{DEMO_PHONE_DISPLAY}</a>.
          </HeroSubtitle>
          <PrimaryButton href="#paths" onClick={scrollToPaths}>
            Pick my path
          </PrimaryButton>
        </Container>
      </HeroSection>

      {/* 2. Four paths */}
      <Section id="paths" style={{ scrollMarginTop: 80 }}>
        <Container>
          <CardGrid>
            {PATHS.map((p) => (
              <Card
                key={p.key}
                role="link"
                tabIndex={0}
                data-path={p.key}
                onClick={() => choosePath(p)}
                onKeyDown={(e) => onCardKey(e, p)}
              >
                <CardBody>
                  <CardTitle>{p.title}</CardTitle>
                  <CardPrice>
                    {p.price}
                    {p.unit && <span>{p.unit}</span>}
                  </CardPrice>
                  <CardText>{p.text}</CardText>
                  {p.details && (
                    <CardDetails>
                      {p.details.map(([label, value]) => (
                        <li key={label}>
                          <strong>{label}:</strong> {value}
                        </li>
                      ))}
                    </CardDetails>
                  )}
                </CardBody>
                <CardButton
                  href={p.href || `?path=${p.key}#choose`}
                  target={p.href ? '_blank' : undefined}
                  rel={p.href ? 'noopener noreferrer' : undefined}
                  data-cta={p.key}
                  onClick={(e) => {
                    // The card already handles the click; keep it to one action.
                    e.preventDefault();
                    e.stopPropagation();
                    choosePath(p);
                  }}
                >
                  {p.cta}
                </CardButton>
              </Card>
            ))}
          </CardGrid>
          <Proof>
            This is the same setup I run for a chiropractic practice today: every call answered, booked, and
            summarized for the owner.
          </Proof>
        </Container>
      </Section>

      {/* 3. Form */}
      <Section id="choose" $bg={colors.iceBlue} style={{ scrollMarginTop: 80 }}>
        <Container>
          <SectionTitle>Not sure which one? Tell me about your business.</SectionTitle>
          <FormWrap>
            <NextForm pathKey={pathKey} />
          </FormWrap>
        </Container>
      </Section>

      {/* 4. FAQ */}
      <Section>
        <Container>
          <SectionTitle>Questions</SectionTitle>
          <FaqList>
            {FAQ.map((f) => (
              <FaqItem key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </FaqItem>
            ))}
          </FaqList>
        </Container>
      </Section>
    </PageContainer>
  );
};

export default Next;
