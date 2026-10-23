import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { track } from '@vercel/analytics';

// Printable one-pager a sales rep can hand out: sherpatech.ai/<rep>/one-pager[/<product>].
// Sized 8.5 by 11 inches. Three versions: both products, receptionist only, assistant only.
// House rules: no em dashes, no vendor names, no per-minute prices.

const DEMO_PHONE_DISPLAY = '(202) 999-3475';

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
};

const PRODUCTS = {
  receptionist: {
    tag: 'For your business',
    title: 'AI Receptionist',
    monthly: '$200',
    setup: '$1,500 one-time setup',
    points: ['First 100 minutes each month included', 'Runs on the number you already have', 'Built and tuned for your business by Mark', 'Live within days'],
    headline: 'Every call answered. Every lead captured.',
    lead: 'An AI receptionist on your existing business number. You stay on the job. It works the phone.',
    does: [
      ['Answers every call, 24/7,', 'on the number you already have.'],
      ['Captures name, number and reason', 'for calling, then emails you a summary.'],
      ['Hands off to a person', 'when a call needs one.'],
    ],
  },
  assistant: {
    tag: 'For you',
    title: 'Personal AI Assistant',
    monthly: '$50',
    setup: '$500 one-time setup',
    points: ['Answers your personal line when you cannot', 'Screens calls, takes messages, sends you the summary', 'Same care, same builder'],
    headline: 'Never miss a call. Never take a bad one.',
    lead: 'A personal assistant on your own line. It picks up when you cannot, screens the rest, and sends you the summary.',
    does: [
      ['Picks up when you cannot,', 'day, night and weekend.'],
      ['Screens and takes messages,', 'so only the calls that matter reach you.'],
      ['Emails you a summary', 'the moment the call ends.'],
    ],
  },
};

const STEPS = [
  ['Tell us about your business.', 'Scan the code or call the demo line. Mark replies within one business day.'],
  ['Mark builds it and you hear it first.', 'Your hours, services and handoff rules go in. You test it before any customer does.'],
  ['Live within days, on your number.', 'Calls forward to the agent. Nothing changes for your callers except that someone picks up.'],
];

const VERSIONS = {
  both: {
    key: 'both',
    label: 'Both products',
    products: ['receptionist', 'assistant'],
    headline: 'Every call answered. Every lead captured.',
    lead: 'An AI receptionist for your business, or a personal assistant for your own line. Set up by SherpaTech.AI, built by hand.',
    does: PRODUCTS.receptionist.does,
    qr: '/qr/omer-one-pager.svg',
    pdf: '2026-10-23-omer-one-pager.pdf',
  },
  receptionist: {
    key: 'receptionist',
    label: 'AI Receptionist',
    products: ['receptionist'],
    headline: PRODUCTS.receptionist.headline,
    lead: PRODUCTS.receptionist.lead,
    does: PRODUCTS.receptionist.does,
    qr: '/qr/omer-one-pager-receptionist.svg',
    pdf: '2026-10-23-omer-one-pager-receptionist.pdf',
  },
  assistant: {
    key: 'assistant',
    label: 'Personal AI Assistant',
    products: ['assistant'],
    headline: PRODUCTS.assistant.headline,
    lead: PRODUCTS.assistant.lead,
    does: PRODUCTS.assistant.does,
    qr: '/qr/omer-one-pager-assistant.svg',
    pdf: '2026-10-23-omer-one-pager-assistant.pdf',
  },
};

// ── Print setup ──────────────────────────────────────────────────────────────

const PrintStyles = createGlobalStyle`
  @page {
    size: 8.5in 11in;
    margin: 0;
  }

  @media print {
    html, body {
      background: ${colors.alpineWhite} !important;
      margin: 0;
    }

    nav, footer, header.site-header, .no-print {
      display: none !important;
    }

    main {
      min-height: 0 !important;
    }

    .sheet {
      box-shadow: none !important;
      margin: 0 !important;
    }
  }
`;

// ── Screen chrome ────────────────────────────────────────────────────────────

const Stage = styled.div`
  background: #d9e1ea;
  padding: 24px 16px 48px;
  font-family: 'Open Sans', sans-serif;
  color: ${colors.ink};
  overflow-x: auto;

  @media print {
    background: none;
    padding: 0;
    overflow: visible;
  }
`;

const Toolbar = styled.div`
  max-width: 8.5in;
  margin: 0 auto 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  font-size: 14px;

  a,
  button {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 14px;
    border-radius: 8px;
    padding: 8px 14px;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid ${colors.line};
    background: ${colors.alpineWhite};
    color: ${colors.navyBlue};
  }

  a[aria-current='page'] {
    background: ${colors.navyBlue};
    color: ${colors.pearlWhite};
    border-color: ${colors.navyBlue};
  }

  button {
    background: ${colors.gold};
    border-color: ${colors.gold};
    color: ${colors.ink};
    margin-left: auto;
  }
`;

// ── Sheet ────────────────────────────────────────────────────────────────────

const Sheet = styled.article`
  box-sizing: border-box;
  width: 8.5in;
  height: 11in;
  margin: 0 auto;
  background: ${colors.alpineWhite};
  box-shadow: 0 12px 40px rgba(21, 42, 74, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: ${colors.ink};
  line-height: 1.4;
  font-size: 12.5pt;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
`;

const Band = styled.div`
  background: ${colors.navyBlue};
  color: ${colors.pearlWhite};
  padding: 0.4in 0.6in 0.35in;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BandTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const Wordmark = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 16pt;
  letter-spacing: -0.02em;

  span {
    color: ${colors.gold};
  }
`;

const Pill = styled.span`
  background: ${colors.goldSoft};
  color: ${colors.ink};
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 9.5pt;
  font-weight: 600;
`;

const Eyebrow = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 8.5pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.gold};
`;

const Headline = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 26pt;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0;
  color: ${colors.pearlWhite};
`;

const LeadLine = styled.p`
  margin: 0;
  font-size: 12pt;
  max-width: 6.2in;
  opacity: 0.92;
`;

const Body = styled.div`
  flex: 1;
  padding: 0.28in 0.6in 0;
  display: flex;
  flex-direction: column;
  gap: 0.2in;
`;

const SectionLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 8.5pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.gold};
  margin-bottom: 6px;
`;

const Does = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  li {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 8px;
    align-items: start;
    font-size: 10.5pt;
    line-height: 1.35;
  }

  svg {
    width: 18px;
    height: 18px;
    color: ${colors.gold};
    margin-top: 2px;
  }

  strong {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
  }
`;

const Prices = styled.div`
  display: grid;
  grid-template-columns: ${(p) => (p.$count > 1 ? 'repeat(2, 1fr)' : '1fr')};
  gap: 14px;
`;

const PriceCard = styled.div`
  border: 1.5px solid ${(p) => (p.$featured ? colors.gold : colors.line)};
  border-radius: 12px;
  padding: ${(p) => (p.$single ? '16px 22px' : '14px 18px')};
  display: ${(p) => (p.$single ? 'grid' : 'flex')};
  grid-template-columns: 1fr 1.2fr;
  flex-direction: column;
  gap: 6px 24px;
  background: ${(p) => (p.$featured ? colors.pearlWhite : colors.alpineWhite)};

  h3 {
    font-family: 'Inter', sans-serif;
    font-size: 13pt;
    font-weight: 700;
    margin: 0;
  }

  ul {
    margin: 4px 0 0;
    padding-left: 16px;
    font-size: 10pt;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
`;

const Tag = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 8pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.muted};
`;

const Amount = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 24pt;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;

  small {
    font-size: 10pt;
    font-weight: 600;
    color: ${colors.muted};
  }
`;

const Setup = styled.div`
  color: ${colors.muted};
  font-size: 10pt;
`;

const Note = styled.p`
  margin: 8px 0 0;
  font-size: 9.5pt;
  color: ${colors.muted};
`;

const Steps = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  counter-reset: step;

  li {
    counter-increment: step;
    border-top: 2px solid ${colors.gold};
    padding-top: 8px;
    font-size: 10pt;
    line-height: 1.35;
    color: ${colors.muted};
  }

  li::before {
    content: counter(step);
    display: inline-block;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 11pt;
    color: ${colors.gold};
    margin-bottom: 4px;
  }

  strong {
    display: block;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 10.5pt;
    color: ${colors.ink};
  }
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.3in;
  align-items: center;
  margin-top: auto;
  padding-bottom: 0.2in;
`;

const Demo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .number {
    font-family: 'Inter', sans-serif;
    font-size: 26pt;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: ${colors.navyBlue};
    line-height: 1.1;
  }

  .hint {
    font-size: 10.5pt;
    color: ${colors.muted};
  }
`;

const QrBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;

  img {
    width: 1.45in;
    height: 1.45in;
    display: block;
  }

  .caption {
    font-family: 'Inter', sans-serif;
    font-size: 8.5pt;
    font-weight: 700;
    color: ${colors.navyBlue};
  }

  .url {
    font-size: 8.5pt;
    color: ${colors.muted};
  }
`;

const Foot = styled.div`
  border-top: 1px solid ${colors.line};
  padding: 0.18in 0.6in 0.3in;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3in;
  font-size: 9.5pt;
  color: ${colors.muted};

  strong {
    display: block;
    font-family: 'Inter', sans-serif;
    font-size: 11pt;
    color: ${colors.ink};
  }
`;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// ── Page ─────────────────────────────────────────────────────────────────────

const OnePager = ({ rep }) => {
  const { product } = useParams();
  const version = VERSIONS[product] || VERSIONS.both;
  const single = version.products.length === 1;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${version.label} one-pager, ${rep.name} | SherpaTech.AI`;
    let robots = document.head.querySelector('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    const previous = robots.getAttribute('content');
    robots.setAttribute('content', 'noindex, nofollow');
    return () => {
      document.title = previousTitle;
      if (created) robots.remove();
      else if (previous) robots.setAttribute('content', previous);
    };
  }, [rep, version]);

  const print = () => {
    track('rep_one_pager_print', { rep: rep.slug, version: version.key });
    window.print();
  };

  return (
    <Stage>
      <PrintStyles />
      <Toolbar className="no-print">
        {Object.values(VERSIONS).map((v) => (
          <Link
            key={v.key}
            to={v.key === 'both' ? `/${rep.slug}/one-pager` : `/${rep.slug}/one-pager/${v.key}`}
            aria-current={v.key === version.key ? 'page' : undefined}
          >
            {v.label}
          </Link>
        ))}
        <button type="button" onClick={print}>
          Print or save as PDF
        </button>
      </Toolbar>

      <Sheet className="sheet" data-version={version.key}>
        <Band>
          <BandTop>
            <Wordmark>
              SherpaTech<span>.AI</span>
            </Wordmark>
            <Pill>{rep.blurb}</Pill>
          </BandTop>
          <Eyebrow>{single ? PRODUCTS[version.products[0]].tag : 'AI phone agents for owner-operators'}</Eyebrow>
          <Headline>{version.headline}</Headline>
          <LeadLine>{version.lead}</LeadLine>
        </Band>

        <Body>
          <div>
            <SectionLabel>What it does</SectionLabel>
            <Does>
              {version.does.map(([strong, rest]) => (
                <li key={strong}>
                  <CheckIcon />
                  <span>
                    <strong>{strong}</strong> {rest}
                  </span>
                </li>
              ))}
            </Does>
          </div>

          <div>
            <SectionLabel>What it costs</SectionLabel>
            <Prices $count={version.products.length}>
              {version.products.map((key, i) => {
                const p = PRODUCTS[key];
                return (
                  <PriceCard key={key} $featured={i === 0} $single={single}>
                    <div>
                      <Tag>{p.tag}</Tag>
                      <h3>{p.title}</h3>
                      <Amount>
                        {p.monthly}
                        <small>/month</small>
                      </Amount>
                      <Setup>{p.setup}</Setup>
                    </div>
                    <ul>
                      {p.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </PriceCard>
                );
              })}
            </Prices>
            <Note>
              {version.products.includes('receptionist')
                ? 'Call minutes beyond that are billed by the minute. Mark sends an estimate based on your call volume.'
                : 'Call minutes are billed by the minute. Mark sends an estimate based on your call volume.'}
            </Note>
          </div>

          {single && (
            <div>
              <SectionLabel>How it works</SectionLabel>
              <Steps>
                {STEPS.map(([title, body]) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    {body}
                  </li>
                ))}
              </Steps>
            </div>
          )}

          <Bottom>
            <Demo>
              <SectionLabel>Hear it now</SectionLabel>
              <div className="number">{DEMO_PHONE_DISPLAY}</div>
              <div className="hint">Call the demo line and ask it anything. A chiropractic practice in Virginia runs on it today.</div>
            </Demo>
            <QrBox>
              <img src={version.qr} alt={`QR code for sherpatech.ai/${rep.slug}`} />
              <div className="caption">Scan to get a quote</div>
              <div className="url">sherpatech.ai/{rep.slug}</div>
            </QrBox>
          </Bottom>
        </Body>

        <Foot>
          <div>
            <strong>{rep.name}</strong>
            Independent sales representative, {rep.location}
            <br />
            {rep.contactEmail}
            {rep.contactPhone ? <> &middot; {rep.contactPhone}</> : null}
          </div>
          <div>
            <strong>Mark Meyerson, SherpaTech.AI</strong>
            Builds every agent himself. 30 years running technology for businesses and nonprofits.
            <br />
            sherpatech.ai
          </div>
        </Foot>
      </Sheet>
    </Stage>
  );
};

export default OnePager;
