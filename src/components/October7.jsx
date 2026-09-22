import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DemoCallPreview from './DemoCallPreview';

// Event landing page for the Voice AI workshop, Wednesday, October 7, 2026.
// One job: register attendees through our own HubSpot form.
// House rules: no em dashes, no vendor names, no pricing, no cohort pitch.

// ── HubSpot ──────────────────────────────────────────────────────────────────
// Form GUID comes from scripts/hubspot/setup-oct7-workshop.mjs ("Voice AI Workshop Oct 7 Registration").
const HUBSPOT_PORTAL_ID = '243001979';
const HUBSPOT_REGION = 'na2';
const OCT7_FORM_ID = 'c3e1d92f-f311-41dd-a266-bf3d1812fa43';
const FORM_READY = OCT7_FORM_ID && !OCT7_FORM_ID.startsWith('TODO_');

const PAGE_TITLE = 'Build a Voice AI Agent Live | Free Workshop Oct 7, AWS Skills Center | SherpaTech.AI';
const PAGE_DESCRIPTION =
  'Free evening workshop for small business and nonprofit leaders. Watch two AI phone agents get built from scratch and tested live, then leave with the prompts to build your own. October 7, AWS Skills Center, Crystal City.';
const PAGE_URL = 'https://sherpatech.ai/october-7';
const OG_IMAGE = 'https://sherpatech.ai/og-october-7.png';

const MEETUP_URL = 'https://www.meetup.com/ai-innovators-network-tysons-meetup-dc-nova-md/events/316513253/';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=AWS+Skills+Center+1550-G+Crystal+Drive+Arlington+VA+22202';

// Brand tokens
const colors = {
  navyBlue: '#1B365D',
  mountainBlue: '#2B517A',
  orange: '#FF6A3D',
  iceBlue: '#E8EEF4',
  pearlWhite: '#F7FAFC',
  alpineWhite: '#FFFFFF',
  text: '#2d3748',
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
  margin: 0 auto 28px;
  text-align: ${(p) => p.$align || 'center'};
  max-width: 760px;
  color: ${(p) => (p.$light ? colors.alpineWhite : colors.navyBlue)};
`;

// ── Hero ─────────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  background: ${colors.pearlWhite};
  padding: 48px 0 56px;

  @media (min-width: 768px) {
    padding: 72px 0 80px;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1.15fr 1fr;
    gap: 48px;
  }
`;

const HeroCopy = styled.div`
  text-align: center;

  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const HeroDemo = styled.div`
  display: flex;
  justify-content: center;
`;

const Eyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${colors.mountainBlue};
  margin: 0 0 18px;
`;

const HeroTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(2.1rem, 5.5vw, 3.3rem);
  line-height: 1.1;
  margin: 0 0 18px;
  color: ${colors.navyBlue};
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  color: ${colors.mountainBlue};
  max-width: 560px;
  margin: 0 auto 28px;

  @media (min-width: 1024px) {
    margin-left: 0;
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

const HeroNote = styled.p`
  font-size: 14px;
  color: ${colors.muted};
  margin: 14px 0 0;
`;

// ── Cards ────────────────────────────────────────────────────────────────────

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 14px;
  padding: 24px 22px;
  box-shadow: 0 2px 12px rgba(27, 54, 93, 0.08);
  border: 1px solid #e2e8f0;
`;

const CardNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${colors.iceBlue};
  color: ${colors.navyBlue};
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
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

// ── Two agents ───────────────────────────────────────────────────────────────

const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 960px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Panel = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 16px;
  padding: 28px 24px;
  border-top: 5px solid ${colors.orange};
  box-shadow: 0 2px 12px rgba(27, 54, 93, 0.08);
`;

const PanelTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 10px;
  color: ${colors.navyBlue};
`;

const PanelText = styled.p`
  font-size: 16px;
  color: ${colors.text};
  margin: 0;
`;

// ── Who ──────────────────────────────────────────────────────────────────────

const PlainList = styled.ul`
  max-width: 680px;
  margin: 0 auto;
  padding-left: 22px;
  display: grid;
  gap: 10px;
  font-size: 16px;
  color: ${colors.text};

  li::marker {
    color: ${colors.orange};
  }
`;

const AfterLine = styled.p`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 17px;
  margin: 28px auto 0;
  max-width: 640px;
  color: ${colors.navyBlue};
`;

// ── Details ──────────────────────────────────────────────────────────────────

const DetailsGrid = styled.dl`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px 32px;
  max-width: 820px;
  margin: 0 auto;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Detail = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 12px;
  padding: 18px 20px;
  border: 1px solid #e2e8f0;

  dt {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${colors.mountainBlue};
    margin: 0 0 6px;
  }

  dd {
    margin: 0;
    font-size: 16px;
    color: ${colors.text};
  }

  a {
    color: ${colors.navyBlue};
    text-decoration: underline;
    font-weight: 600;
  }
`;

// ── Guide ────────────────────────────────────────────────────────────────────

const GuideCard = styled.div`
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    gap: 28px;
  }
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: ${colors.alpineWhite};
  color: ${colors.navyBlue};
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid ${colors.orange};
`;

const GuideName = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 2px;
  color: ${colors.alpineWhite};
`;

const GuideRole = styled.p`
  font-size: 14px;
  color: ${colors.orange};
  font-weight: 700;
  margin: 0 0 12px;
`;

const GuideText = styled.p`
  font-size: 16px;
  color: #dbe4f2;
  margin: 0;
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

// ── Form ─────────────────────────────────────────────────────────────────────

const FormWrap = styled.div`
  background: ${colors.alpineWhite};
  border-radius: 16px;
  padding: 24px 18px;
  max-width: 640px;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(27, 54, 93, 0.08);

  @media (min-width: 640px) {
    padding: 32px 28px;
  }

  .hs-form-field label {
    color: ${colors.navyBlue};
    font-weight: 600;
  }

  .hs-form-field input[type='text'],
  .hs-form-field input[type='email'] {
    border: 1px solid #cbd5e0;
    border-radius: 8px;
    padding: 12px;
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    width: 100%;
    box-sizing: border-box;
  }

  .hs-form-field input:focus {
    border-color: ${colors.orange};
    box-shadow: 0 0 0 3px rgba(255, 106, 61, 0.15);
    outline: none;
  }

  .hs-button {
    background: ${colors.orange};
    color: ${colors.alpineWhite};
    border: none;
    border-radius: 10px;
    padding: 14px 32px;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
  }

  .hs-button:hover {
    background: #e85a2f;
  }
`;

const FormIntro = styled.p`
  text-align: center;
  color: ${colors.muted};
  font-size: 16px;
  max-width: 600px;
  margin: -12px auto 28px;
`;

const FormFootnote = styled.p`
  text-align: center;
  color: ${colors.muted};
  font-size: 14px;
  max-width: 560px;
  margin: 20px auto 0;
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

// ── Footer strip ─────────────────────────────────────────────────────────────

const FooterStrip = styled.div`
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

// ── Content ──────────────────────────────────────────────────────────────────

const TAKEAWAYS = [
  {
    title: 'Two working agents, built in front of you.',
    text: 'A phone receptionist and an interview agent, from blank screen to live test call.',
  },
  {
    title: 'The exact prompts.',
    text: 'Everything typed on screen gets shared with attendees, so you can rebuild both agents yourself the same week.',
  },
  {
    title: 'A straight answer on cost.',
    text: 'What it actually costs to run one of these for a small team, per month and per minute, with no vendor markup hidden.',
  },
  {
    title: 'A clear picture of what breaks.',
    text: 'Where voice agents fail, what needs a human, and how to set one up so it hands off gracefully.',
  },
];

const WHO = [
  'Owners of businesses where the phone rings while your hands are busy: contractors, salons, home services, small law and accounting practices',
  'Office managers and operations leads who would be the ones running this day to day',
  'Executive directors and program leads at nonprofits and associations who need to hear from more people than they can call',
  'Anyone who has been told "you should look at AI" and wants to see something real before deciding',
];

const FAQ = [
  {
    q: 'Do I need to know how to code?',
    a: "No. Everything is built in a visual tool with plain-English prompts. You'll watch it happen, then get the prompts.",
  },
  {
    q: 'Do I need a Meetup account?',
    a: 'No. This form is the registration. Meetup is optional.',
  },
  {
    q: 'Is this a sales pitch?',
    a: "It's a working session. Mark will mention what SherpaTech does at the end, in about two minutes. The rest is building.",
  },
  {
    q: 'What should I bring?',
    a: 'Yourself. A laptop is optional. If you bring one, you can follow along and start your own agent during the session.',
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

const HS_SCRIPT_SRC = 'https://js-na2.hsforms.net/forms/embed/v2.js';

const RegistrationForm = () => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!FORM_READY) return undefined;
    const scriptId = 'hs-form-script-oct7';
    let cancelled = false;

    const createForm = () => {
      if (cancelled || !window.hbspt) return;
      window.hbspt.forms.create({
        region: HUBSPOT_REGION,
        portalId: HUBSPOT_PORTAL_ID,
        formId: OCT7_FORM_ID,
        target: '#hubspot-oct7-form',
      });
    };

    if (window.hbspt) {
      createForm();
    } else {
      const existing = document.getElementById(scriptId) || document.querySelector(`script[src="${HS_SCRIPT_SRC}"]`);
      if (existing) {
        existing.addEventListener('load', createForm);
      } else {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = HS_SCRIPT_SRC;
        script.defer = true;
        script.async = true;
        script.onload = createForm;
        script.onerror = () => setFailed(true);
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (!FORM_READY || failed) {
    return (
      <Fallback>
        <p>
          The registration form is not available right now. Email{' '}
          <a href="mailto:mark@sherpatech.ai?subject=Voice%20AI%20Workshop%20Oct%207">mark@sherpatech.ai</a> with your
          name and organization and we&rsquo;ll hold your seat.
        </p>
      </Fallback>
    );
  }

  return <div id="hubspot-oct7-form" aria-live="polite" />;
};

// ── Page ─────────────────────────────────────────────────────────────────────

const October7 = () => {
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
      setMeta('name', 'twitter:title', PAGE_TITLE),
      setMeta('name', 'twitter:description', PAGE_DESCRIPTION),
      setMeta('name', 'twitter:image', OG_IMAGE),
    ];
    return () => {
      document.title = previousTitle;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('register');
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
          <HeroGrid>
            <HeroCopy>
              <Eyebrow>Free workshop. Wednesday, October 7. AWS Skills Center, Crystal City.</Eyebrow>
              <HeroTitle>Watch a voice agent get built live. Then build your own.</HeroTitle>
              <HeroSubtitle>
                In one evening, see two working AI phone agents built from scratch and tested on real calls. Leave with
                the exact prompts to rebuild them for your business.
              </HeroSubtitle>
              <PrimaryButton href="#register" onClick={scrollToForm}>
                Save my seat
              </PrimaryButton>
              <HeroNote>Free. No technical background needed. No Meetup account required.</HeroNote>
            </HeroCopy>
            <HeroDemo>
              <DemoCallPreview />
            </HeroDemo>
          </HeroGrid>
        </Container>
      </HeroSection>

      {/* 2. What you walk away with */}
      <Section>
        <Container>
          <SectionTitle>What you walk away with</SectionTitle>
          <CardGrid>
            {TAKEAWAYS.map((t, i) => (
              <Card key={t.title}>
                <CardNumber aria-hidden="true">{i + 1}</CardNumber>
                <CardTitle>{t.title}</CardTitle>
                <CardText>{t.text}</CardText>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>

      {/* 3. Two agents */}
      <Section $bg={colors.iceBlue}>
        <Container>
          <SectionTitle>Two agents, two different jobs</SectionTitle>
          <PanelGrid>
            <Panel>
              <PanelTitle>The receptionist.</PanelTitle>
              <PanelText>
                The first thing most people picture when they hear &ldquo;voice AI.&rdquo; It answers the phone when you
                can&rsquo;t, figures out what the caller needs, captures the basics, and hands off cleanly to a person when
                it should. Built for trades, salons, small offices, and any business where the phone rings while
                everyone is busy.
              </PanelText>
            </Panel>
            <Panel>
              <PanelTitle>The interviewer.</PanelTitle>
              <PanelText>
                A different idea. Instead of waiting for calls, this agent makes them. It runs a structured interview
                with donors, members, volunteers, staff, or customers, on their schedule, and returns organized notes from
                every conversation. For a business, think post-job check-ins, quote follow-ups, and client intake. For a
                nonprofit or association, it is how you hear from fifty people when you only have staff time to call
                five.
              </PanelText>
            </Panel>
          </PanelGrid>
        </Container>
      </Section>

      {/* 4. Who should come */}
      <Section>
        <Container>
          <SectionTitle>Who should come</SectionTitle>
          <PlainList>
            {WHO.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </PlainList>
          <AfterLine>
            You do not need a technical background. If you can describe how you want a call handled, you can follow
            along.
          </AfterLine>
        </Container>
      </Section>

      {/* 5. When and where */}
      <Section $bg={colors.pearlWhite}>
        <Container>
          <SectionTitle>When and where</SectionTitle>
          <DetailsGrid>
            <Detail>
              <dt>Date</dt>
              <dd>Wednesday, October 7, 2026</dd>
            </Detail>
            <Detail>
              <dt>Time</dt>
              <dd>6:00 PM ET, doors open at 5:45</dd>
            </Detail>
            <Detail>
              <dt>Venue</dt>
              <dd>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  AWS Skills Center, 1550-G Crystal Drive, Arlington, VA 22202
                </a>
              </dd>
            </Detail>
            <Detail>
              <dt>Getting there</dt>
              <dd>Metro: Crystal City (Blue/Yellow). Garage parking on site.</dd>
            </Detail>
            <Detail>
              <dt>Host</dt>
              <dd>
                Hosted with the{' '}
                <a href={MEETUP_URL} target="_blank" rel="noopener noreferrer">
                  AI Innovators Network
                </a>
              </dd>
            </Detail>
            <Detail>
              <dt>Cost</dt>
              <dd>Free. Drinks and networking afterward at Tacombi next door.</dd>
            </Detail>
          </DetailsGrid>
        </Container>
      </Section>

      {/* 6. Your guide */}
      <Section $bg={colors.navyBlue} $dark>
        <Container>
          <SectionTitle $light>Your guide</SectionTitle>
          <GuideCard>
            <Avatar aria-hidden="true">MM</Avatar>
            <div>
              <GuideName>Mark Meyerson</GuideName>
              <GuideRole>Founder, SherpaTech.AI</GuideRole>
              <GuideText>
                Mark Meyerson spent 30 years leading technology change inside organizations before founding
                SherpaTech.AI. He builds voice agents for nonprofits, associations, and small businesses, and he teaches
                the people who run them how to do it themselves. He has presented at the AWS Skills Center before and
                comes back because the room asks good questions.
              </GuideText>
            </div>
          </GuideCard>
        </Container>
      </Section>

      {/* 7. Registration */}
      <Section id="register" $bg={colors.iceBlue} style={{ scrollMarginTop: 80 }}>
        <Container>
          <SectionTitle tabIndex={-1}>Save your seat</SectionTitle>
          <FormIntro>
            Seats are limited by the room. Register here to hold yours and to tell me what you&rsquo;d want a voice agent
            to handle, so the session covers what you actually need.
          </FormIntro>
          <FormWrap>
            <RegistrationForm />
          </FormWrap>
          <FormFootnote>
            Already RSVP&rsquo;d on Meetup? Register here too, this is where the prompts and recording get sent.
            Can&rsquo;t make it? Register anyway and check the box.
          </FormFootnote>
        </Container>
      </Section>

      {/* 8. FAQ */}
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

      {/* 9. Footer strip */}
      <FooterStrip>
        Presented by SherpaTech.AI. Hosted with the AI Innovators Network at the AWS Skills Center, Crystal City.
        Questions: <a href="mailto:mark@sherpatech.ai">mark@sherpatech.ai</a>
      </FooterStrip>
    </PageContainer>
  );
};

export default October7;
