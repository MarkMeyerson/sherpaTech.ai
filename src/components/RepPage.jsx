import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { track } from '@vercel/analytics';
import DemoCallPreview from './DemoCallPreview';

// Sales rep page: sherpatech.ai/<rep slug>. Rendered from an entry in src/data/reps.js.
// One job: let the person the rep sent here hear the receptionist, see the price,
// and leave their details with the rep's name already attached in HubSpot.
// House rules: no em dashes, no vendor names, no per-minute prices, phone first.

// ── Links ────────────────────────────────────────────────────────────────────
// Same booking link as /next.
const BOOKING_URL =
  'https://outlook.office.com/bookwithme/user/6234b8ab86204535933296e86a1a6799@sherpatech.ai?anonymous';

const DEMO_PHONE_DISPLAY = '(202) 999-3475';
const DEMO_PHONE_HREF = 'tel:+12029993475';
const FALLBACK_EMAIL = 'mark@sherpatech.ai';

// ── HubSpot ──────────────────────────────────────────────────────────────────
// The page renders its own inputs and posts to the Forms Submission API, same as /next.
const HUBSPOT_PORTAL_ID = '243001979';
const submitUrl = (formId) =>
  `https://api-na2.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formId}`;

// Reused from the /next form so the answer lands on the same contact property.
const WANT_PROP = 'voice_ai__what_to_handle';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'];

// ── Content ──────────────────────────────────────────────────────────────────

const DOES = [
  ['Answers every call, 24/7,', 'on the number you already have.'],
  ['Knows your business,', 'your hours, your services, your service area.'],
  ['Captures name, number and reason', 'for calling, every time.'],
  ['Emails you a summary', 'the moment the call ends.'],
  ['Hands off to a person', 'when a call needs one.'],
];

const PRICES = [
  {
    key: 'receptionist',
    tag: 'For your business',
    title: 'AI Receptionist',
    monthly: '$200',
    setup: '$1,500 one-time setup',
    points: ['First 100 minutes each month included', 'Runs on the number you already have', 'Built and tuned for your business by Mark'],
    cta: 'Get a quote',
    featured: true,
  },
  {
    key: 'assistant',
    tag: 'For you',
    title: 'Personal AI Assistant',
    monthly: '$50',
    setup: '$500 one-time setup',
    points: ['Answers your personal line when you cannot', 'Screens calls, takes messages, sends you the summary', 'Same care, same builder'],
    cta: 'Ask about it',
    featured: false,
  },
];

const PRICE_NOTE = 'Call minutes beyond that are billed by the minute. Mark sends an estimate based on your call volume.';

const PROOF =
  'This is the same setup I run for a chiropractic practice in Virginia today: every call answered, booked, and summarized for the owner.';

const MARK_BIO = 'Mark Meyerson has spent 30 years running technology for businesses and nonprofits. He builds every agent himself.';

const FAQ = [
  {
    q: 'Does my phone number change?',
    a: 'No. Calls forward from the number already on your truck, your website and your business cards. Customers dial the same number they always have, and someone picks up.',
  },
  {
    q: 'How fast can it be live?',
    a: 'Within days. We gather your hours, services and preferences, Mark builds and tests it, and you hear it before it ever takes a customer call.',
  },
  {
    q: 'What happens after I submit the form?',
    a: 'Mark replies within one business day to set up a short call and send you an estimate for your call volume.',
  },
];

// ── Styles ───────────────────────────────────────────────────────────────────

const colors = {
  navyBlue: '#1B365D',
  mountainBlue: '#2B517A',
  iceBlue: '#E8EEF4',
  pearlWhite: '#F7FAFC',
  alpineWhite: '#FFFFFF',
  gold: '#C9962E',
  goldSoft: '#F3E6C4',
  ink: '#152A4A',
  muted: '#4A5D74',
  line: '#CFD9E4',
  ok: '#2E7D5B',
};

const PageContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  color: ${colors.ink};
  line-height: 1.55;
  overflow-x: hidden;
  background: ${colors.pearlWhite};

  a:focus-visible,
  button:focus-visible,
  summary:focus-visible {
    outline: 3px solid ${colors.gold};
    outline-offset: 3px;
  }
`;

const Wrap = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
`;

const Section = styled.section`
  background: ${(p) => p.$bg || 'transparent'};
  padding: 44px 0;

  @media (min-width: 768px) {
    padding: 56px 0;
  }
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Eyebrow = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.gold};
`;

const H2 = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 700;
  line-height: 1.15;
  margin: 0;
  color: ${(p) => p.$color || colors.navyBlue};
`;

const Lead = styled.p`
  margin: 0;
  font-size: 1.05rem;
  color: ${colors.muted};
`;

// ── Hero ─────────────────────────────────────────────────────────────────────

const Hero = styled.section`
  background: ${colors.navyBlue};
  color: ${colors.pearlWhite};
  padding: 48px 0 44px;

  @media (min-width: 768px) {
    padding: 64px 0 56px;
  }
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  background: ${colors.goldSoft};
  color: ${colors.ink};
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;

  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.gold};
    display: inline-block;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 7vw, 3rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.01em;
  margin: 0;
  color: ${colors.pearlWhite};
  overflow-wrap: anywhere;
`;

const HeroLead = styled.p`
  margin: 0;
  font-size: 1.12rem;
  max-width: 34em;
  color: ${colors.pearlWhite};
  opacity: 0.92;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 52px;
  padding: 14px 22px;
  border-radius: 12px;
  border: 2px solid transparent;
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.12s ease;
  box-sizing: border-box;

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 22px;
    height: 22px;
    flex: none;
  }

  @media (min-width: 640px) {
    width: auto;
    min-width: 240px;
  }
`;

const GoldButton = styled(Button)`
  background: ${colors.gold};
  color: ${colors.ink};

  &:hover {
    background: #b8862a;
  }
`;

const GhostButton = styled(Button)`
  background: transparent;
  border-color: rgba(247, 250, 252, 0.5);
  color: ${colors.pearlWhite};

  &:hover {
    background: rgba(247, 250, 252, 0.1);
  }
`;

const NavyButton = styled(Button)`
  background: ${colors.navyBlue};
  color: ${colors.pearlWhite};

  &:hover {
    background: ${colors.mountainBlue};
  }
`;

const OutlineButton = styled(Button)`
  background: transparent;
  border-color: ${colors.line};
  color: ${colors.ink};

  &:hover {
    background: ${colors.iceBlue};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const DemoNumber = styled.p`
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.9;

  a {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
    color: ${colors.pearlWhite};
    white-space: nowrap;
  }
`;

// ── Hear it ──────────────────────────────────────────────────────────────────

const BigNumber = styled.a`
  display: block;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.8rem, 8vw, 2.6rem);
  font-weight: 800;
  letter-spacing: 0.02em;
  color: ${colors.navyBlue};
  text-decoration: none;
  margin: 8px 0 0;
`;

const Centered = styled.div`
  text-align: center;
`;

// ── What it does ─────────────────────────────────────────────────────────────

const Does = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;

  li {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 12px;
    align-items: start;
    font-size: 1.05rem;
  }

  svg {
    width: 26px;
    height: 26px;
    color: ${colors.gold};
    margin-top: 2px;
  }

  strong {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
  }
`;

// ── Prices ───────────────────────────────────────────────────────────────────

const Prices = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const PriceCard = styled.div`
  background: ${colors.alpineWhite};
  border: 1px solid ${(p) => (p.$featured ? colors.gold : colors.line)};
  box-shadow: ${(p) => (p.$featured ? '0 8px 28px rgba(21, 42, 74, 0.1)' : 'none')};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;

  h3 {
    font-family: 'Inter', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    margin: 0;
  }

  ul {
    margin: 4px 0 0;
    padding-left: 18px;
    font-size: 0.97rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  a {
    margin-top: auto;
    width: 100%;
  }
`;

const Tag = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.muted};
`;

const Amount = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;

  small {
    font-size: 1rem;
    font-weight: 600;
    color: ${colors.muted};
  }
`;

const Setup = styled.p`
  margin: 0;
  color: ${colors.muted};
  font-size: 0.95rem;
`;

const Note = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${colors.muted};
`;

// ── Proof ────────────────────────────────────────────────────────────────────

const Proof = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: ${colors.alpineWhite};
  border-left: 4px solid ${colors.gold};
  padding: 18px 20px;
  border-radius: 0 12px 12px 0;

  p {
    margin: 0;
    font-size: 1.08rem;
  }

  svg {
    width: 28px;
    height: 28px;
    flex: none;
    color: ${colors.gold};
  }
`;

// ── Form ─────────────────────────────────────────────────────────────────────

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
  font-size: 0.92rem;
  min-width: 0;

  input,
  textarea {
    font: inherit;
    font-weight: 400;
    font-size: 16px;
    padding: 12px 14px;
    border: 1px solid ${colors.line};
    border-radius: 10px;
    background: ${colors.alpineWhite};
    color: ${colors.ink};
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  input:focus,
  textarea:focus {
    outline: 2px solid ${colors.mountainBlue};
    outline-offset: 1px;
    border-color: ${colors.mountainBlue};
  }

  textarea {
    min-height: 96px;
    resize: vertical;
  }
`;

const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 52px;
  padding: 14px 22px;
  border: 0;
  border-radius: 12px;
  background: ${colors.gold};
  color: ${colors.ink};
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #b8862a;
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const Fine = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${colors.muted};
`;

const ErrorNote = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #b23b3b;

  a {
    color: ${colors.navyBlue};
    font-weight: 700;
  }
`;

const Success = styled.div`
  background: ${colors.alpineWhite};
  border: 1px solid ${colors.ok};
  border-radius: 16px;
  padding: 28px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;

  svg {
    width: 40px;
    height: 40px;
    color: ${colors.ok};
  }

  h3 {
    font-family: 'Inter', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

// ── About ────────────────────────────────────────────────────────────────────

const People = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Person = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${colors.alpineWhite};
  border: 1px solid ${colors.line};
  border-radius: 16px;
  padding: 22px;
  min-width: 0;

  h3 {
    font-family: 'Inter', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 0.98rem;
  }
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${colors.mountainBlue};
  color: ${colors.pearlWhite};
  display: grid;
  place-items: center;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Role = styled.p`
  color: ${colors.muted};
  font-size: 0.85rem;
`;

// ── FAQ ──────────────────────────────────────────────────────────────────────

const Faq = styled.details`
  border-top: 1px solid ${colors.line};
  padding: 14px 0;

  &:last-of-type {
    border-bottom: 1px solid ${colors.line};
  }

  summary {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.05rem;
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::after {
    content: '+';
    font-size: 1.4rem;
    color: ${colors.gold};
    flex: none;
    line-height: 1;
  }

  &[open] summary::after {
    content: '\\2212';
  }

  p {
    margin: 0;
    padding-top: 10px;
  }
`;

const Downloads = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const DownloadLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 14px 16px;
  background: ${colors.alpineWhite};
  border: 1px solid ${colors.line};
  border-radius: 12px;
  color: ${colors.ink};
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.98rem;

  &:hover {
    border-color: ${colors.gold};
  }

  svg {
    width: 22px;
    height: 22px;
    flex: none;
    color: ${colors.gold};
  }

  small {
    display: block;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 0.82rem;
    color: ${colors.muted};
  }
`;

const FootNote = styled.footer`
  padding: 28px 0 40px;
  color: ${colors.muted};
  font-size: 0.88rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

// ── Icons ────────────────────────────────────────────────────────────────────

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.8 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2 15 8.5l7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.1l1.4-7L2 9.3l7-.8z" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M12 18v-6" />
    <path d="m9 15 3 3 3-3" />
  </svg>
);

const DoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12 3 3 5-6" />
  </svg>
);

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

function readCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

function readUtm() {
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });
  return utm;
}

// HubSpot date properties take midnight UTC in milliseconds.
function todayUtcMs() {
  const d = new Date();
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

const EMPTY_FORM = { firstname: '', lastname: '', email: '', phone: '', company: '', [WANT_PROP]: '' };

// ── Form ─────────────────────────────────────────────────────────────────────

const RepForm = ({ rep, utm }) => {
  const [values, setValues] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

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
    fields.push({ objectTypeId: '0-1', name: 'sales_rep', value: rep.salesRep });
    fields.push({ objectTypeId: '0-1', name: 'rep_intro_date', value: String(todayUtcMs()) });

    // pageUri keeps the full URL, so any utm_ parameters ride along to HubSpot.
    const context = { pageUri: window.location.href, pageName: document.title };
    const hutk = readCookie('hubspotutk');
    if (hutk) context.hutk = hutk;

    try {
      const res = await fetch(submitUrl(rep.formId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, context }),
      });
      if (!res.ok) throw new Error(`HubSpot ${res.status}`);
      setStatus('sent');
      track('rep_form_submitted', { rep: rep.slug, ...utm });
    } catch {
      setStatus('error');
      track('rep_form_failed', { rep: rep.slug });
    }
  };

  if (status === 'sent') {
    return (
      <Success role="status">
        <DoneIcon />
        <h3>Got it.</h3>
        <p>
          Mark will reach out within one business day. {rep.firstName} will check in too.
        </p>
        <p>
          While you wait, call the demo line at <a href={DEMO_PHONE_HREF}>{DEMO_PHONE_DISPLAY}</a> and put it through its paces.
        </p>
      </Success>
    );
  }

  return (
    // hs-do-not-collect keeps HubSpot's tracking script from logging this as a
    // second "non-HubSpot form"; the submit handler already posts to HubSpot.
    <Form id="rep-form" hs-do-not-collect="" onSubmit={submit}>
      <Row>
        <Field>
          First name
          <input name="firstname" autoComplete="given-name" value={values.firstname} onChange={update} />
        </Field>
        <Field>
          Last name
          <input name="lastname" autoComplete="family-name" value={values.lastname} onChange={update} />
        </Field>
      </Row>
      <Row>
        <Field>
          Email
          <input type="email" name="email" autoComplete="email" required value={values.email} onChange={update} />
        </Field>
        <Field>
          Phone
          <input type="tel" name="phone" autoComplete="tel" value={values.phone} onChange={update} />
        </Field>
      </Row>
      <Field>
        Business name
        <input name="company" autoComplete="organization" value={values.company} onChange={update} />
      </Field>
      <Field>
        What would you want handled?
        <textarea name={WANT_PROP} rows={4} value={values[WANT_PROP]} onChange={update} />
      </Field>
      {status === 'error' && (
        <ErrorNote role="alert">
          That did not go through.{' '}
          {rep.hostedFormUrl ? (
            <>
              <a href={rep.hostedFormUrl} target="_blank" rel="noopener noreferrer">
                Open the form in a new tab
              </a>{' '}
              and send it from there.
            </>
          ) : (
            <>
              Email <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a> and mention {rep.name}.
            </>
          )}
        </ErrorNote>
      )}
      <Submit type="submit" disabled={status === 'sending'} data-cta="submit">
        {status === 'sending' ? 'Sending' : 'Send'}
      </Submit>
      <Fine>No spam, no list. Just a reply from a real person.</Fine>
    </Form>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

const RepPage = ({ rep }) => {
  const [utm] = useState(() => readUtm());
  const title = `Every call answered | SherpaTech.AI`;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    const cleanups = [
      setMeta('name', 'description', `An AI receptionist on your existing number, set up by SherpaTech.AI. ${rep.blurb}.`),
      setMeta('property', 'og:title', title),
      setMeta('property', 'og:url', `https://sherpatech.ai/${rep.slug}`),
      // A rep's personal link. Keep it out of search results.
      setMeta('name', 'robots', 'noindex, nofollow'),
    ];
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
      cleanups.forEach((fn) => fn());
    };
  }, [rep, title]);

  const clicked = (event, extra = {}) => track(event, { rep: rep.slug, ...utm, ...extra });

  const scrollToForm = (e, product) => {
    e.preventDefault();
    clicked('rep_click_quote', { product });
    const el = document.getElementById('lead');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageContainer>
      {/* 1. Hero */}
      <Hero id="top">
        <Wrap>
          <Stack style={{ gap: 20 }}>
            <Pill>
              <i /> {rep.blurb}
            </Pill>
            <Eyebrow>AI Receptionist for owner-operators</Eyebrow>
            <HeroTitle>Every call answered. Every lead captured.</HeroTitle>
            <HeroLead>An AI receptionist on your existing number, set up by SherpaTech.AI. {rep.blurb}.</HeroLead>
            <ButtonRow>
              <GoldButton href={DEMO_PHONE_HREF} data-cta="call" onClick={() => clicked('rep_click_call', { where: 'hero' })}>
                <PhoneIcon />
                Call the demo line
              </GoldButton>
              <GhostButton
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="book"
                onClick={() => clicked('rep_click_book', { where: 'hero' })}
              >
                Book 20 minutes with Mark
              </GhostButton>
            </ButtonRow>
            <DemoNumber>
              Call <a href={DEMO_PHONE_HREF}>{DEMO_PHONE_DISPLAY}</a> and ask it anything.
            </DemoNumber>
          </Stack>
        </Wrap>
      </Hero>

      {/* 2. Hear it */}
      <Section>
        <Wrap>
          <Stack>
            <Centered>
              <Eyebrow>Hear it</Eyebrow>
              <H2>This is what your callers will hear.</H2>
              <Lead style={{ marginTop: 8 }}>A simulated call. The real thing is one tap away.</Lead>
            </Centered>
            <DemoCallPreview scenarios={['receptionist']} caption="Simulated preview. Business names are made up. Call the demo line to hear the real thing." />
            <BigNumber href={DEMO_PHONE_HREF} data-cta="call-big" onClick={() => clicked('rep_click_call', { where: 'hear' })}>
              {DEMO_PHONE_DISPLAY}
            </BigNumber>
          </Stack>
        </Wrap>
      </Section>

      {/* 3. What it does */}
      <Section $bg={colors.iceBlue}>
        <Wrap>
          <Stack>
            <Eyebrow>What it does</Eyebrow>
            <H2>It works the phone so you can work the job.</H2>
            <Does>
              {DOES.map(([strong, rest]) => (
                <li key={strong}>
                  <CheckIcon />
                  <span>
                    <strong>{strong}</strong> {rest}
                  </span>
                </li>
              ))}
            </Does>
          </Stack>
        </Wrap>
      </Section>

      {/* 4. Prices */}
      <Section id="pricing">
        <Wrap>
          <Stack>
            <Eyebrow>Pricing</Eyebrow>
            <H2>Simple numbers. No surprises.</H2>
            <Prices>
              {PRICES.map((p) => (
                <PriceCard key={p.key} $featured={p.featured} data-price={p.key}>
                  <Tag>{p.tag}</Tag>
                  <h3>{p.title}</h3>
                  <Amount>
                    {p.monthly}
                    <small>/month</small>
                  </Amount>
                  <Setup>{p.setup}</Setup>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  {p.featured ? (
                    <NavyButton href="#lead" data-cta={`quote-${p.key}`} onClick={(e) => scrollToForm(e, p.key)}>
                      {p.cta}
                    </NavyButton>
                  ) : (
                    <OutlineButton href="#lead" data-cta={`quote-${p.key}`} onClick={(e) => scrollToForm(e, p.key)}>
                      {p.cta}
                    </OutlineButton>
                  )}
                </PriceCard>
              ))}
            </Prices>
            <Note>{PRICE_NOTE}</Note>
          </Stack>
        </Wrap>
      </Section>

      {/* 5. Proof */}
      <Section style={{ paddingTop: 0 }}>
        <Wrap>
          <Proof>
            <StarIcon />
            <p>{PROOF}</p>
          </Proof>
        </Wrap>
      </Section>

      {/* 6. Form */}
      <Section id="lead" $bg={colors.iceBlue} style={{ scrollMarginTop: 80 }}>
        <Wrap>
          <Stack>
            <Eyebrow>Get a quote</Eyebrow>
            <H2>Tell me about your business.</H2>
            <Lead>Takes a minute. Mark replies personally within one business day.</Lead>
            <RepForm rep={rep} utm={utm} />
          </Stack>
        </Wrap>
      </Section>

      {/* 7. About */}
      <Section>
        <Wrap>
          <Stack>
            <Eyebrow>Who you are working with</Eyebrow>
            <H2>Two people. No call center.</H2>
            <People>
              <Person>
                <Avatar aria-hidden="true">{rep.photo ? <img src={rep.photo} alt="" /> : rep.initials}</Avatar>
                <h3>{rep.name}</h3>
                <Role>Your contact, {rep.location}</Role>
                <p>{rep.bio}</p>
              </Person>
              <Person>
                <Avatar aria-hidden="true">MM</Avatar>
                <h3>Mark Meyerson</h3>
                <Role>Builder, SherpaTech.AI</Role>
                <p>{MARK_BIO}</p>
              </Person>
            </People>
          </Stack>
        </Wrap>
      </Section>

      {/* 8. FAQ */}
      <Section $bg={colors.iceBlue}>
        <Wrap>
          <Stack>
            <Eyebrow>Questions people ask</Eyebrow>
            <H2>The short answers.</H2>
            <div>
              {FAQ.map((f) => (
                <Faq key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </Faq>
              ))}
            </div>
          </Stack>
        </Wrap>
      </Section>

      {/* 9. Printable one-pagers */}
      {rep.onePagers && rep.onePagers.length > 0 && (
        <Section>
          <Wrap>
            <Stack>
              <Eyebrow>Take it with you</Eyebrow>
              <H2>One page you can print or share.</H2>
              <Lead>Prices, the demo number, and a code back to this page. Letter size.</Lead>
              <Downloads>
                {rep.onePagers.map((p) => (
                  <DownloadLink
                    key={p.file}
                    href={p.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="pdf"
                    onClick={() => clicked('rep_click_pdf', { file: p.label })}
                  >
                    <FileIcon />
                    <span>
                      {p.label}
                      <small>PDF, one page</small>
                    </span>
                  </DownloadLink>
                ))}
              </Downloads>
            </Stack>
          </Wrap>
        </Section>
      )}

      <FootNote>
        <Wrap>
          <div>
            <strong>SherpaTech.AI</strong>
            <span>Arlington, Virginia. Demo line: {DEMO_PHONE_DISPLAY}.</span>
            <span>{rep.name}, independent sales representative.</span>
          </div>
        </Wrap>
      </FootNote>
    </PageContainer>
  );
};

export default RepPage;
