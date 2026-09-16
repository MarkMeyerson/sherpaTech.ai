import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// ── HubSpot ──────────────────────────────────────────────────────────────────
// Form GUID comes from scripts/hubspot/setup-cos-sprint.mjs (form "COS Sprint Interest (Fall 2026)").
const HUBSPOT_PORTAL_ID = '243001979';
const HUBSPOT_REGION = 'na2';
const COS_FORM_ID = 'TODO_COS_FORM_GUID';
const FORM_READY = COS_FORM_ID && !COS_FORM_ID.startsWith('TODO_');

const PAGE_TITLE = 'The COS Sprint | SherpaTech.AI + TechClear';
const PAGE_DESCRIPTION =
  'A four-week, small-group cohort that helps you build an AI chief of staff that briefs you, drafts for you, and keeps you on track. $300. Starts October 2026.';
const PAGE_URL = 'https://sherpatech.ai/cos';
const OG_IMAGE = 'https://sherpatech.ai/mountain-ai.jpg';

// Site brand colors (same palette as ClaudeCohort)
const colors = {
  navyBlue: '#1B365D',
  mountainBlue: '#2B517A',
  iceBlue: '#E8EEF4',
  pearlWhite: '#F7FAFC',
  alpineWhite: '#FFFFFF',
  gold: '#F5A623',
  text: '#2d3748',
  muted: '#4a5568',
};

// ── Layout ───────────────────────────────────────────────────────────────────

const PageContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  color: ${colors.navyBlue};
  line-height: 1.6;

  a:focus-visible,
  button:focus-visible,
  summary:focus-visible {
    outline: 3px solid ${colors.gold};
    outline-offset: 3px;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Section = styled.section`
  background: ${(p) => p.$bg || colors.alpineWhite};
  color: ${(p) => (p.$dark ? colors.alpineWhite : colors.navyBlue)};
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
  margin: 0 0 28px;
  text-align: ${(p) => p.$align || 'center'};
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
`;

// ── Hero ─────────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${colors.navyBlue} 0%, ${colors.mountainBlue} 100%);
  color: ${colors.alpineWhite};
  padding: 64px 0 56px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 88px 0 80px;
  }
`;

const Eyebrow = styled.p`
  display: inline-block;
  background: ${colors.gold};
  color: ${colors.navyBlue};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 20px;
  margin: 0 0 22px;
`;

const HeroTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(2.2rem, 6vw, 3.4rem);
  line-height: 1.1;
  margin: 0 0 18px;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.05rem, 2.2vw, 1.3rem);
  color: #dbe4f2;
  max-width: 640px;
  margin: 0 auto 28px;
`;

const PrimaryButton = styled.a`
  display: inline-block;
  background: ${colors.gold};
  color: ${colors.navyBlue};
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 800;
  text-decoration: none;
  padding: 16px 36px;
  border-radius: 12px;
  min-width: 220px;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #f0b830;
    transform: translateY(-1px);
  }
`;

const HeroNote = styled.p`
  font-size: 14px;
  color: #dbe4f2;
  margin: 16px auto 0;
  max-width: 460px;
`;

// ── Problem ──────────────────────────────────────────────────────────────────

const ProblemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 640px;
  display: grid;
  gap: 14px;
`;

const ProblemItem = styled.li`
  background: ${colors.alpineWhite};
  border-left: 4px solid ${colors.gold};
  border-radius: 10px;
  padding: 16px 18px;
  font-size: 16px;
  color: ${colors.text};
  box-shadow: 0 2px 10px rgba(27, 54, 93, 0.06);
`;

// ── Cards ────────────────────────────────────────────────────────────────────

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  max-width: 960px;
  margin: 0 auto;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 14px;
  padding: 24px 20px;
  box-shadow: 0 2px 12px rgba(27, 54, 93, 0.08);
  border: 1px solid #e2e8f0;
`;

const CardIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${colors.iceBlue};
  color: ${colors.navyBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 8px;
  color: ${colors.navyBlue};
`;

const CardText = styled.p`
  font-size: 15px;
  color: ${colors.muted};
  margin: 0;
  line-height: 1.6;
`;

const ClosingLine = styled.p`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  margin: 32px 0 0;
  color: ${colors.navyBlue};
`;

// ── Weeks ────────────────────────────────────────────────────────────────────

const WeekNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.gold};
  color: ${colors.navyBlue};
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

const WeekNote = styled.p`
  text-align: center;
  color: ${colors.muted};
  font-size: 16px;
  max-width: 620px;
  margin: 32px auto 0;
`;

// ── What you get ─────────────────────────────────────────────────────────────

const CheckList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 640px;
  display: grid;
  gap: 12px;
`;

const CheckItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 16px;
  color: ${colors.text};

  svg {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    margin-top: 2px;
    color: ${colors.gold};
  }
`;

// ── Price card ───────────────────────────────────────────────────────────────

const PriceCard = styled.div`
  background: ${colors.alpineWhite};
  border: 2px solid ${colors.gold};
  border-radius: 20px;
  padding: 36px 24px;
  max-width: 460px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 12px 40px rgba(245, 166, 35, 0.15);
`;

const Price = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 56px;
  font-weight: 900;
  line-height: 1;
  color: ${colors.navyBlue};
`;

const PriceSub = styled.div`
  font-size: 16px;
  color: ${colors.muted};
  margin: 8px 0 20px;
`;

const Bonus = styled.div`
  background: rgba(245, 166, 35, 0.14);
  border: 1px solid ${colors.gold};
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 700;
  color: ${colors.navyBlue};
  margin-bottom: 18px;
`;

const PriceLine = styled.p`
  font-size: 15px;
  color: ${colors.muted};
  margin: 0 0 8px;
`;

// ── Instructors ──────────────────────────────────────────────────────────────

const InstructorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 820px;
  margin: 0 auto;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InstructorCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  padding: 24px 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${colors.gold};
  color: ${colors.navyBlue};
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InstructorName = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 2px;
  color: ${colors.alpineWhite};
`;

const InstructorRole = styled.p`
  font-size: 14px;
  color: ${colors.gold};
  margin: 0 0 8px;
  font-weight: 600;
`;

const InstructorText = styled.p`
  font-size: 15px;
  color: #dbe4f2;
  margin: 0;

  a {
    color: ${colors.alpineWhite};
    text-decoration: underline;
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
    border-color: ${colors.gold};
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

// ── Form ─────────────────────────────────────────────────────────────────────

const FormWrap = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 16px;
  padding: 24px 18px;
  max-width: 640px;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(27, 54, 93, 0.08);
  scroll-margin-top: 90px;

  @media (min-width: 640px) {
    padding: 32px 28px;
  }
`;

const FormIntro = styled.p`
  text-align: center;
  color: ${colors.muted};
  font-size: 16px;
  max-width: 560px;
  margin: -12px auto 28px;
`;

const Fallback = styled.div`
  text-align: center;
  color: ${colors.muted};
  font-size: 15px;

  a {
    color: ${colors.navyBlue};
    text-decoration: underline;
    font-weight: 600;
  }
`;

// ── Partnership strip ────────────────────────────────────────────────────────

const Partnership = styled.div`
  background: ${colors.iceBlue};
  color: ${colors.navyBlue};
  text-align: center;
  font-size: 14px;
  padding: 16px 20px;

  a {
    color: ${colors.navyBlue};
    text-decoration: underline;
  }
`;

// ── Icons (inline SVG, no new dependency) ────────────────────────────────────

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const PenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// ── Content ──────────────────────────────────────────────────────────────────

const ROLES = [
  { icon: <SunIcon />, title: 'Morning brief', text: "Today's calendar, what needs you, and what can wait." },
  { icon: <InboxIcon />, title: 'Inbox triage', text: 'Sorts what needs a reply from what is noise.' },
  { icon: <PenIcon />, title: 'Drafts in your voice', text: 'Writes the reply. You review and hit send.' },
  { icon: <CalendarIcon />, title: 'Weekly review', text: "What moved, what stalled, and what you're avoiding." },
];

const WEEKS = [
  { title: 'Week 1, Foundation', text: 'Your project, house rules, and a context file that knows your business.' },
  { title: 'Week 2, Inbox and calendar', text: 'Morning brief, inbox triage, and drafts in your voice.' },
  { title: 'Week 3, Tasks and projects', text: 'One trusted list for everything, managed by talking to it.' },
  { title: 'Week 4, Rhythms', text: 'A daily check-in, a weekly review, and schedules that run without you.' },
];

const YOU_GET = [
  'Four live one-hour Zoom sessions',
  'Weekly homework with a live review',
  'Hands-on help connecting your real email, calendar, and task tools',
  'A small group: 12 seats per cohort',
  'By week four: a chief of staff that briefs you, drafts for you, and keeps you on track',
];

const FAQ = [
  {
    q: 'What do I need?',
    a: 'A laptop, the email and calendar you use for your business, and a paid Claude plan. Claude Pro is $20 a month.',
  },
  {
    q: 'Is this the same as the SBAP AI Labs?',
    a: 'No. The labs cover four different agents over four months. The Sprint goes deep on one system, your chief of staff, with weekly homework and coaching so it sticks.',
  },
  {
    q: 'I use Microsoft 365, not Google. Can I join?',
    a: "Yes. Tell us on the form, and we'll plan for it.",
  },
  {
    q: 'I already use ChatGPT. Will this help?',
    a: 'We teach in Claude so we can go deep on one tool. The concepts carry over, and ChatGPT has similar features under different names.',
  },
  {
    q: 'When does it start?',
    a: "October. We set the nights based on everyone's answers.",
  },
  {
    q: 'How do I pay?',
    a: "Once dates are set, we'll email you a payment link. Nothing is charged today.",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const previous = el.getAttribute('content');
  el.setAttribute('content', content);
  return () => {
    if (created) el.remove();
    else if (previous !== null) el.setAttribute('content', previous);
  };
}

// ── HubSpot form ─────────────────────────────────────────────────────────────

const CosForm = () => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!FORM_READY) return undefined;
    const scriptId = 'hs-form-script-cos-sprint';
    let cancelled = false;

    const createForm = () => {
      if (cancelled || !window.hbspt) return;
      window.hbspt.forms.create({
        region: HUBSPOT_REGION,
        portalId: HUBSPOT_PORTAL_ID,
        formId: COS_FORM_ID,
        target: '#hubspot-cos-form',
      });
    };

    const existing = document.getElementById(scriptId);
    if (!existing) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://js-na2.hsforms.net/forms/embed/v2.js';
      script.defer = true;
      script.async = true;
      script.onload = createForm;
      script.onerror = () => setFailed(true);
      document.body.appendChild(script);
    } else if (window.hbspt) {
      createForm();
    } else {
      existing.addEventListener('load', createForm);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (!FORM_READY || failed) {
    return (
      <Fallback>
        <p>
          The sign-up form is not available right now. Email{' '}
          <a href="mailto:mark@sherpatech.ai?subject=COS%20Sprint%20interest">mark@sherpatech.ai</a>{' '}
          with your name, business, and best evenings, and we&rsquo;ll save your spot.
        </p>
      </Fallback>
    );
  }

  return <div id="hubspot-cos-form" className="hs-form-frame" aria-live="polite" />;
};

// ── Page ─────────────────────────────────────────────────────────────────────

const CosSprint = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;
    const cleanups = [
      setMeta('name', 'description', PAGE_DESCRIPTION),
      setMeta('property', 'og:title', PAGE_TITLE),
      setMeta('property', 'og:description', PAGE_DESCRIPTION),
      setMeta('property', 'og:image', OG_IMAGE),
      setMeta('property', 'og:url', PAGE_URL),
      setMeta('property', 'og:type', 'website'),
      setMeta('name', 'twitter:card', 'summary_large_image'),
    ];
    return () => {
      document.title = previousTitle;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('save-your-spot');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const heading = el.querySelector('h2');
      if (heading) heading.focus({ preventScroll: true });
    }
  };

  return (
    <PageContainer>
      {/* 1. Hero */}
      <HeroSection>
        <Container>
          <Eyebrow>SherpaTech.AI + TechClear</Eyebrow>
          <HeroTitle>The COS Sprint</HeroTitle>
          <HeroSubtitle>
            Four weeks. One hour a week on Zoom. A chief of staff system that actually works for you.
          </HeroSubtitle>
          <PrimaryButton href="#save-your-spot" onClick={scrollToForm}>
            Save my spot
          </PrimaryButton>
          <HeroNote>$300 for 4 sessions. First 10 sign-ups get a free 30-minute setup call.</HeroNote>
        </Container>
      </HeroSection>

      {/* 2. The problem */}
      <Section $bg={colors.iceBlue}>
        <Container>
          <SectionTitle>You don&rsquo;t need another app. You need someone watching the whole board.</SectionTitle>
          <ProblemList>
            <ProblemItem>Tasks live in your head, your inbox, and five other places.</ProblemItem>
            <ProblemItem>Every day starts reactive instead of intentional.</ProblemItem>
            <ProblemItem>You&rsquo;ve tried productivity tools. They lasted two weeks.</ProblemItem>
          </ProblemList>
        </Container>
      </Section>

      {/* 3. What a chief of staff does */}
      <Section>
        <Container>
          <SectionTitle>What a chief of staff does</SectionTitle>
          <CardGrid>
            {ROLES.map((r) => (
              <Card key={r.title}>
                <CardIcon>{r.icon}</CardIcon>
                <CardTitle>{r.title}</CardTitle>
                <CardText>{r.text}</CardText>
              </Card>
            ))}
          </CardGrid>
          <ClosingLine>An accountability partner, not a filing cabinet.</ClosingLine>
        </Container>
      </Section>

      {/* 4. How the four weeks build */}
      <Section $bg={colors.pearlWhite}>
        <Container>
          <SectionTitle>How the four weeks build</SectionTitle>
          <CardGrid>
            {WEEKS.map((w, i) => (
              <Card key={w.title}>
                <WeekNumber aria-hidden="true">{i + 1}</WeekNumber>
                <CardTitle>{w.title}</CardTitle>
                <CardText>{w.text}</CardText>
              </Card>
            ))}
          </CardGrid>
          <WeekNote>
            Each week you get homework that builds on the last. We review it together live, then build the next piece.
          </WeekNote>
        </Container>
      </Section>

      {/* 5. What you get */}
      <Section>
        <Container>
          <SectionTitle>What you get</SectionTitle>
          <CheckList>
            {YOU_GET.map((item) => (
              <CheckItem key={item}>
                <CheckIcon />
                <span>{item}</span>
              </CheckItem>
            ))}
          </CheckList>
        </Container>
      </Section>

      {/* 6. Price card */}
      <Section $bg={colors.iceBlue}>
        <Container>
          <SectionTitle>Price</SectionTitle>
          <PriceCard>
            <Price>$300</Price>
            <PriceSub>for all 4 sessions</PriceSub>
            <Bonus>Launch bonus: The first 10 sign-ups get a free 30-minute 1:1 setup call.</Bonus>
            <PriceLine>Starts in October. We&rsquo;ll set the nights based on your answers.</PriceLine>
            <PriceLine>No payment today. We&rsquo;ll email a payment link once dates are set.</PriceLine>
            <div style={{ marginTop: 20 }}>
              <PrimaryButton href="#save-your-spot" onClick={scrollToForm}>
                Save my spot
              </PrimaryButton>
            </div>
          </PriceCard>
        </Container>
      </Section>

      {/* 7. Instructors */}
      <Section $bg={colors.navyBlue} $dark>
        <Container>
          <SectionTitle style={{ color: colors.alpineWhite }}>Your instructors</SectionTitle>
          <InstructorGrid>
            <InstructorCard>
              <Avatar aria-hidden="true">MM</Avatar>
              <div>
                <InstructorName>Mark Meyerson</InstructorName>
                <InstructorRole>Founder, SherpaTech.AI</InstructorRole>
                <InstructorText>Builds AI systems for nonprofits and mission-driven organizations.</InstructorText>
              </div>
            </InstructorCard>
            <InstructorCard>
              <Avatar aria-hidden="true">AR</Avatar>
              <div>
                <InstructorName>Abdullah Rafiq</InstructorName>
                <InstructorRole>Founder, TechClear</InstructorRole>
                <InstructorText>
                  Trains people in the DMV for careers in tech.{' '}
                  <a href="https://www.techclear.org" target="_blank" rel="noopener noreferrer">
                    techclear.org
                  </a>
                </InstructorText>
              </div>
            </InstructorCard>
          </InstructorGrid>
        </Container>
      </Section>

      {/* 8. FAQ */}
      <Section $bg={colors.pearlWhite}>
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

      {/* 9. Form */}
      <Section id="save-your-spot" $bg={colors.iceBlue}>
        <Container>
          <SectionTitle tabIndex={-1}>Save your spot</SectionTitle>
          <FormIntro>
            No payment today. Tell us a little about your business and your best evenings, and we&rsquo;ll follow up
            with dates and a payment link.
          </FormIntro>
          <FormWrap>
            <CosForm />
          </FormWrap>
        </Container>
      </Section>

      <Partnership>
        In partnership with{' '}
        <a href="https://www.techclear.org" target="_blank" rel="noopener noreferrer">
          TechClear
        </a>
        .
      </Partnership>
    </PageContainer>
  );
};

export default CosSprint;
