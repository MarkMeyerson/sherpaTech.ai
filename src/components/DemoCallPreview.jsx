import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

// Simulated phone call preview for the October 7 workshop page.
// Stands in for a recorded demo clip. Pass videoSrc to swap in the real clip.
// Organization names in the scripts are fictional.

const colors = {
  navyBlue: '#1B365D',
  mountainBlue: '#2B517A',
  iceBlue: '#E8EEF4',
  pearlWhite: '#F7FAFC',
  alpineWhite: '#FFFFFF',
  orange: '#FF6A3D',
  bezel: '#0f172a',
  screen: '#162c4d',
};

const SCENARIOS = {
  receptionist: {
    label: 'Receptionist',
    caller: 'SherpaTech Demo Line',
    lines: [
      { who: 'agent', text: 'Thanks for calling Northside Community Clinic, this is the front desk assistant. How can I help?' },
      { who: 'caller', text: 'Hi, I need to reschedule an appointment for my mom.' },
      { who: 'agent', text: 'I can help with that. Can I get her first name and the day of the current appointment?' },
      { who: 'caller', text: "Maria, it's Thursday." },
      { who: 'agent', text: "Got it, Maria on Thursday. I'll flag this for the scheduling team and someone will call you back within the hour. Is this the best number?" },
      { who: 'caller', text: "Yes, that's fine." },
      { who: 'agent', text: "Perfect. You'll hear from us shortly. Anything else?" },
    ],
  },
  interview: {
    label: 'Interview',
    caller: 'SherpaTech Demo Line',
    lines: [
      { who: 'agent', text: 'Hi, this is the SherpaTech interview line calling on behalf of Riverbend Food Bank. Do you have about five minutes to share your experience as a volunteer?' },
      { who: 'caller', text: "Sure, I've got a few minutes." },
      { who: 'agent', text: 'Great. First, what made you decide to volunteer with Riverbend?' },
      { who: 'caller', text: 'A friend brought me to a Saturday shift and I just kept coming back.' },
      { who: 'agent', text: "That's good to hear. What's one thing that would make volunteering easier for you?" },
      { who: 'caller', text: 'Honestly, knowing the schedule further in advance.' },
      { who: 'agent', text: 'Noted. Last one: would you recommend Riverbend to a friend, and why?' },
    ],
  },
};

const INCOMING_MS = 1500;
const CHAR_MS = 26;
const LINE_GAP_MS = 650;
const LOOP_PAUSE_MS = 3000;

// ── Styles ───────────────────────────────────────────────────────────────────

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Toggle = styled.div`
  display: inline-flex;
  background: ${colors.iceBlue};
  border-radius: 999px;
  padding: 4px;
  margin-bottom: 16px;
`;

const ToggleButton = styled.button`
  border: 0;
  background: ${(p) => (p.$active ? colors.navyBlue : 'transparent')};
  color: ${(p) => (p.$active ? colors.alpineWhite : colors.mountainBlue)};
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  min-height: 36px;
`;

const Phone = styled.div`
  width: 100%;
  max-width: 360px;
  background: ${colors.bezel};
  border-radius: 40px;
  padding: 14px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.35), inset 0 0 0 2px #1e293b;

  @media (min-width: 1024px) {
    width: 320px;
  }
`;

const Screen = styled.div`
  position: relative;
  background: ${colors.screen};
  border-radius: 30px;
  height: 560px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Notch = styled.div`
  width: 96px;
  height: 22px;
  background: ${colors.bezel};
  border-radius: 0 0 14px 14px;
  margin: 0 auto;
  flex-shrink: 0;
`;

const CallCard = styled.div`
  margin: 10px 14px 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const CallAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.orange};
  color: ${colors.alpineWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const CallName = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: ${colors.alpineWhite};
  line-height: 1.2;
`;

const CallStatus = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  color: #b9c7da;
  margin-top: 2px;
  font-variant-numeric: tabular-nums;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => (p.$live ? '#34d399' : colors.orange)};
  display: inline-block;
`;

const Transcript = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 14px 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Bubble = styled.div`
  max-width: 86%;
  align-self: ${(p) => (p.$who === 'agent' ? 'flex-start' : 'flex-end')};
  background: ${(p) => (p.$who === 'agent' ? colors.iceBlue : colors.alpineWhite)};
  color: ${colors.navyBlue};
  font-family: 'Open Sans', sans-serif;
  font-size: 13.5px;
  line-height: 1.45;
  padding: 9px 12px;
  border-radius: ${(p) => (p.$who === 'agent' ? '14px 14px 14px 4px' : '14px 14px 4px 14px')};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;

const Speaker = styled.span`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${colors.mountainBlue};
  margin-bottom: 3px;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 0.95em;
  background: ${colors.navyBlue};
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: oct7-blink 0.9s steps(2, start) infinite;

  @keyframes oct7-blink {
    to {
      visibility: hidden;
    }
  }
`;

const Caption = styled.p`
  margin: 14px 0 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  color: ${colors.mountainBlue};
  text-align: center;
  max-width: 340px;
`;

const Video = styled.video`
  width: 100%;
  max-width: 360px;
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25);
  display: block;
`;

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// ── Hooks ────────────────────────────────────────────────────────────────────

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  );
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return reduced;
}

function formatTimer(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

// ── Component ────────────────────────────────────────────────────────────────

const DemoCallPreview = ({ videoSrc, poster }) => {
  const [scenario, setScenario] = useState('receptionist');
  const reduced = useReducedMotion();
  const script = useMemo(() => SCENARIOS[scenario], [scenario]);

  // Animation state
  const [connected, setConnected] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [typing, setTyping] = useState('');
  const transcriptRef = useRef(null);

  useEffect(() => {
    if (videoSrc || reduced) return undefined;

    let cancelled = false;
    const timers = [];
    const wait = (ms) =>
      new Promise((resolve) => {
        const t = setTimeout(resolve, ms);
        timers.push(t);
      });

    let tick = null;

    const run = async () => {
      while (!cancelled) {
        setConnected(false);
        setSeconds(0);
        setDoneCount(0);
        setTyping('');
        await wait(INCOMING_MS);
        if (cancelled) return;

        setConnected(true);
        let s = 0;
        tick = setInterval(() => {
          s += 1;
          setSeconds(s);
        }, 1000);

        for (let i = 0; i < script.lines.length; i += 1) {
          const text = script.lines[i].text;
          for (let c = 1; c <= text.length; c += 1) {
            if (cancelled) return;
            setTyping(text.slice(0, c));
            await wait(CHAR_MS);
          }
          setDoneCount(i + 1);
          setTyping('');
          await wait(LINE_GAP_MS);
          if (cancelled) return;
        }

        clearInterval(tick);
        tick = null;
        await wait(LOOP_PAUSE_MS);
      }
    };

    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      if (tick) clearInterval(tick);
    };
  }, [script, reduced, videoSrc]);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [doneCount, typing]);

  if (videoSrc) {
    return (
      <Wrap>
        <Video src={videoSrc} poster={poster} muted loop playsInline autoPlay controls aria-label="Demo of a voice agent on a live call" />
        <Caption>Both agents get built and tested live on October 7.</Caption>
      </Wrap>
    );
  }

  const showAll = reduced;
  const visibleLines = showAll ? script.lines : script.lines.slice(0, doneCount);
  const activeLine = !showAll && typing ? script.lines[doneCount] : null;
  const isConnected = showAll || connected;

  return (
    <Wrap>
      <Toggle role="tablist" aria-label="Demo scenario">
        {Object.entries(SCENARIOS).map(([key, s]) => (
          <ToggleButton
            key={key}
            type="button"
            role="tab"
            aria-selected={scenario === key}
            $active={scenario === key}
            onClick={() => setScenario(key)}
          >
            {s.label}
          </ToggleButton>
        ))}
      </Toggle>

      <Phone aria-label={`Simulated ${script.label.toLowerCase()} call`}>
        <Screen>
          <Notch />
          <CallCard>
            <CallAvatar>
              <PhoneIcon />
            </CallAvatar>
            <div>
              <CallName>{script.caller}</CallName>
              <CallStatus aria-live="off">
                <Dot $live={isConnected} />
                {isConnected ? `Connected ${formatTimer(showAll ? 0 : seconds)}` : 'Incoming call...'}
              </CallStatus>
            </div>
          </CallCard>

          <Transcript ref={transcriptRef} aria-live="polite">
            {visibleLines.map((line, i) => (
              <Bubble key={`${scenario}-${i}`} $who={line.who}>
                <Speaker>{line.who === 'agent' ? 'Agent' : 'Caller'}</Speaker>
                {line.text}
              </Bubble>
            ))}
            {activeLine && (
              <Bubble $who={activeLine.who}>
                <Speaker>{activeLine.who === 'agent' ? 'Agent' : 'Caller'}</Speaker>
                {typing}
                <Cursor aria-hidden="true" />
              </Bubble>
            )}
          </Transcript>
        </Screen>
      </Phone>

      <Caption>Simulated preview. Both agents get built and tested live on October 7.</Caption>
    </Wrap>
  );
};

export default DemoCallPreview;
