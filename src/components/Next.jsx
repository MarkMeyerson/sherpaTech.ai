import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// Follow-up page for people who heard the voice agent demo.
// One job: pick a path and submit the HubSpot form.
// House rules: no em dashes, no vendor names.

// ── HubSpot ──────────────────────────────────────────────────────────────────
const HUBSPOT_PORTAL_ID = '243001979';
const HUBSPOT_REGION = 'na2';
const NEXT_FORM_ID = '88162ad1-54fe-48d8-a840-d583b6b8e1ae';
const HUBSPOT_SCRIPT_SRC = `https://js-${HUBSPOT_REGION}.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`;
const HOSTED_FORM_URL = 'https://40odiz.share-na2.hsforms.com/2iBYq0VT-SNioQNWDtrjhrg';
const FORM_TIMEOUT_MS = 7000;

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
  summary:focus-visible {
    outline: 3px solid ${colors.orange};
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

// ── Form ─────────────────────────────────────────────────────────────────────

const FormWrap = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(27, 54, 93, 0.08);
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 20px;
  min-height: 200px;

  @media (min-width: 768px) {
    padding: 36px 40px;
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

const Fallback = styled.div`
  text-align: center;
  padding: 12px 0;

  p {
    margin: 0 0 18px;
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

// Same order as the options on the HubSpot form.
const PATHS = [
  { title: 'Build it for me', price: '$1,500', text: 'I build and launch your voice agent.' },
  { title: 'Coach me, I build it', price: '$150', unit: '/hour', text: 'We build it together on calls.' },
  { title: 'Build it in a group', price: '$497', text: 'Four-week cohort.' },
  { title: 'Just the recording and the prompts', price: 'Free', text: 'Take them and go at your own pace.' },
];

const FAQ = [
  {
    q: 'What does it cost per call?',
    a: 'About 25 cents a minute once your agent is live. A typical three-minute call runs under a dollar. You pay only for the minutes the agent is on the phone.',
  },
  {
    q: 'How long does setup take?',
    a: 'If I build it for you, plan on about two weeks from our first call to a live agent answering your phone. With coaching or the cohort, the pace depends on how much time you put in between sessions.',
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

// HubSpot's embed script fills every .hs-form-frame it finds when it runs.
// The script tag is added once per mount, after the frame div exists. If no
// form shows up in time, the hosted form link takes its place.
const NextForm = () => {
  const frameRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    document.querySelectorAll(`script[src="${HUBSPOT_SCRIPT_SRC}"]`).forEach((s) => s.remove());
    const script = document.createElement('script');
    script.src = HUBSPOT_SCRIPT_SRC;
    script.defer = true;
    script.onerror = () => setFailed(true);
    document.body.appendChild(script);

    const timer = setTimeout(() => {
      const frame = frameRef.current;
      if (!frame || frame.childElementCount === 0) setFailed(true);
    }, FORM_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, []);

  if (failed) {
    return (
      <Fallback>
        <p>The form did not load here. Open it in a new tab instead.</p>
        <PrimaryButton href={HOSTED_FORM_URL} target="_blank" rel="noopener noreferrer">
          Open the form
        </PrimaryButton>
      </Fallback>
    );
  }

  return (
    <div
      ref={frameRef}
      className="hs-form-frame"
      data-region={HUBSPOT_REGION}
      data-form-id={NEXT_FORM_ID}
      data-portal-id={HUBSPOT_PORTAL_ID}
    />
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

const Next = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;
    const cleanups = [
      setMeta('name', 'description', PAGE_DESCRIPTION),
      setMeta('property', 'og:title', PAGE_TITLE),
      setMeta('property', 'og:description', PAGE_DESCRIPTION),
      setMeta('property', 'og:url', 'https://sherpatech.ai/next'),
    ];
    return () => {
      document.title = previousTitle;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('choose');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
          <PrimaryButton href="#choose" onClick={scrollToForm}>
            Pick my path
          </PrimaryButton>
        </Container>
      </HeroSection>

      {/* 2. Four paths */}
      <Section>
        <Container>
          <CardGrid>
            {PATHS.map((p) => (
              <Card key={p.title}>
                <CardTitle>{p.title}</CardTitle>
                <CardPrice>
                  {p.price}
                  {p.unit && <span>{p.unit}</span>}
                </CardPrice>
                <CardText>{p.text}</CardText>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>

      {/* 3. Form */}
      <Section id="choose" $bg={colors.iceBlue} style={{ scrollMarginTop: 80 }}>
        <Container>
          <SectionTitle>Tell me which one</SectionTitle>
          <FormWrap>
            <NextForm />
          </FormWrap>
          <FormNote>
            Form not showing?{' '}
            <a href={HOSTED_FORM_URL} target="_blank" rel="noopener noreferrer">
              Open it in a new tab
            </a>
            .
          </FormNote>
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
