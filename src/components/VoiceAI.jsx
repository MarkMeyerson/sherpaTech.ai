// src/components/VoiceAI.jsx
//
// Capability page for sherpatech.ai/voice-ai
// Plain direct voice. Anonymized case study. Three CTAs.
// Backend blackout enforced: never name the orchestration platform.
// Hard rule: no em-dashes anywhere in visible copy.
//
// Swap-in points (look for TODO_):
//   - VOICE_AI_FORM_ID:  HubSpot form ID once the "Voice AI Case Study Request" form is published.
//                         Until then, the modal renders a graceful mailto fallback.
//
// Stripe checkout is scaffolded behind VITE_STRIPE_VOICE_AI_ENABLED.
// Default off. When enabled, the visible button gets a placeholder href until a SKU is wired.

import React, { useEffect, useState } from 'react';

// ─── Configuration ──────────────────────────────────────────────────────────
const VOICE_AI_FORM_ID = "55df267a-e9b3-4fce-a510-f8a50b590a28";
const HUBSPOT_PORTAL_ID = "243001979";
const HUBSPOT_REGION = "na2";
const BOOKING_URL = "https://book.sherpatech.ai";
const CASE_STUDY_PDF = "/voice-ai-case-study.pdf";
const MARK_EMAIL = "Mark@sherpatech.ai";
const STRIPE_VOICE_AI_ENABLED = import.meta.env.VITE_STRIPE_VOICE_AI_ENABLED === 'true';

// ─── Booking link with graceful fallback ────────────────────────────────────
const BOOKING_ACTIVE = BOOKING_URL && !BOOKING_URL.startsWith("TODO_");
const BOOKING_HREF = BOOKING_ACTIVE
  ? BOOKING_URL
  : `mailto:${MARK_EMAIL}?subject=Voice%20AI%20discovery%20call%20request`;
const BOOKING_TARGET = BOOKING_ACTIVE ? "_blank" : "_self";
const BOOKING_REL = BOOKING_ACTIVE ? "noopener noreferrer" : undefined;

// ─── Lightweight analytics helper ───────────────────────────────────────────
const trackCta = (event) => {
  try {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event });
    }
    if (typeof window !== 'undefined' && typeof window.va === 'function') {
      window.va('event', { name: event });
    }
  } catch (_) { /* analytics is best-effort, never blocks UX */ }
};

// ─── Hero ───────────────────────────────────────────────────────────────────
const Hero = ({ onDownloadClick }) => (
  <section className="bg-gradient-to-br from-navy-blue to-mountain-blue text-alpine-white py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-sm tracking-widest uppercase mb-4 opacity-80">A SherpaTech.AI Capability</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-inter leading-tight">
        Voice AI that listens like a senior consultant.
      </h1>
      <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-95">
        An operational diagnostic designed and delivered in weeks, not months.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={BOOKING_HREF}
          target={BOOKING_TARGET}
          rel={BOOKING_REL}
          onClick={() => trackCta('cta_book_discovery_hero')}
          className="bg-[#FF6A3D] hover:bg-[#e55a35] text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
        >
          Book a discovery call
        </a>
        <button
          type="button"
          onClick={() => { trackCta('cta_download_case_study_hero'); onDownloadClick(); }}
          className="border-2 border-alpine-white hover:bg-alpine-white hover:text-navy-blue text-alpine-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
        >
          Download the case study
        </button>
      </div>
    </div>
  </section>
);

// ─── Pain Points (exactly 3, plain direct voice) ────────────────────────────
const PAIN_POINTS = [
  {
    title: "Surveys keep losing signal.",
    body: "Survey response rates keep dropping. People skim, half-finish, and move on."
  },
  {
    title: "Phone interviews don't scale.",
    body: "A six-figure research engagement is the only way to hear a thousand voices, until now."
  },
  {
    title: "Voice carries what writing won't.",
    body: "Stakeholders say different things in writing than they do out loud. The signal you need is in the conversation."
  }
];

const PainPoints = () => (
  <section className="bg-pearl-white py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-navy-blue font-inter mb-12 text-center">
        Why traditional research falls short.
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {PAIN_POINTS.map((p) => (
          <div key={p.title} className="bg-alpine-white rounded-lg p-8 shadow-sm">
            <h3 className="font-inter font-semibold text-xl text-navy-blue mb-4">{p.title}</h3>
            <p className="text-mountain-blue leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── How It Works (exactly 3 steps) ─────────────────────────────────────────
const STEPS = [
  {
    n: "01",
    title: "Design the questionnaire.",
    body: "We translate your diagnostic goals into a structured interview the agent can run, with branching, follow-ups, and graceful redirection back to the core questions."
  },
  {
    n: "02",
    title: "Run the calls.",
    body: "A voice agent built on best-in-class speech and LLM infrastructure conducts the interviews. Participants talk to it like a person. The agent adapts phrasing to the role, stays on questionnaire, and surfaces the signals you asked for."
  },
  {
    n: "03",
    title: "Get a structured record.",
    body: "Every call produces a 22-field structured record plus the full transcript. You see patterns across the cohort within days, not weeks."
  }
];

const HowItWorks = () => (
  <section className="bg-alpine-white py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-navy-blue font-inter mb-12 text-center">
        How it works.
      </h2>
      <div className="space-y-6">
        {STEPS.map((s) => (
          <div key={s.n} className="flex gap-6 items-start bg-pearl-white rounded-lg p-6">
            <div className="text-3xl font-bold text-[#FF6A3D] font-inter shrink-0">{s.n}</div>
            <div>
              <h3 className="font-inter font-semibold text-xl text-navy-blue mb-2">{s.title}</h3>
              <p className="text-mountain-blue leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Case Study Excerpt ─────────────────────────────────────────────────────
const PRIORITY_SIGNALS = [
  "Shadow processes",
  "Error and rework culture",
  "Cross-team friction",
  "Leadership-versus-reality gap",
  "Technology handoffs",
  "AI openness"
];

const CaseStudy = ({ onDownloadClick }) => (
  <section id="case-study" className="bg-pearl-white py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <p className="text-sm tracking-widest uppercase text-mountain-blue mb-4 text-center">Case Study</p>
      <h2 className="text-3xl md:text-4xl font-bold text-navy-blue font-inter mb-3 text-center">
        Listening at Scale.
      </h2>
      <p className="text-lg text-mountain-blue mb-10 text-center max-w-2xl mx-auto">
        An operational diagnostic designed and delivered in weeks, not months.
      </p>

      <p className="text-mountain-blue leading-relaxed mb-10 text-center max-w-3xl mx-auto">
        A consulting principal needed candid voice from 1,000 people across multiple client verticals on a deadline. We stood up a voice AI interviewer, ran the cohort, and delivered a structured dataset.
      </p>

      <div className="space-y-6 mb-10">
        <blockquote className="bg-alpine-white border-l-4 border-[#FF6A3D] rounded-r-lg p-6 shadow-sm">
          <p className="text-mountain-blue leading-relaxed italic mb-4">
            &ldquo;I was really impressed with how well the agent changed the phrasing of the questions to be relevant to a C-suite person, even though they weren&rsquo;t originally designed for that. She very much responded to what he was putting out there instead of following a script. Which was exactly what we want.&rdquo;
          </p>
          <p className="text-sm text-navy-blue font-semibold">
            Brenna Holmes, Founder and Principal, Brenna Holmes Advisory Consulting
          </p>
        </blockquote>

        <blockquote className="bg-alpine-white border-l-4 border-[#FF6A3D] rounded-r-lg p-6 shadow-sm">
          <p className="text-mountain-blue leading-relaxed italic mb-4">
            &ldquo;She, the agent, did a really good job at always kind of bringing it back to the core of the questionnaire instead of just a venting session, which is hard for a human to do.&rdquo;
          </p>
          <p className="text-sm text-navy-blue font-semibold">
            Brenna Holmes, Founder and Principal, Brenna Holmes Advisory Consulting
          </p>
        </blockquote>
      </div>

      <div className="bg-alpine-white rounded-lg p-8 shadow-sm mb-10">
        <h3 className="font-inter font-semibold text-xl text-navy-blue mb-4">Outcome</h3>
        <p className="text-mountain-blue leading-relaxed">
          Deadline met. Interview phase compressed from weeks to days. All six priority signals surfaced, plus bright spots. The data came back quantitatively richer (22 structured fields per call) and qualitatively deeper (participants said things they wouldn&rsquo;t have said face-to-face), at roughly 20% of what a traditional consulting-team engagement at this scale would have cost.
        </p>
      </div>

      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest text-mountain-blue mb-4 text-center">Six priority signals surfaced</p>
        <div className="flex flex-wrap justify-center gap-3">
          {PRIORITY_SIGNALS.map((s) => (
            <span
              key={s}
              className="bg-alpine-white border border-ice-blue rounded-full px-4 py-2 text-sm text-navy-blue font-semibold"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => { trackCta('cta_download_case_study_section'); onDownloadClick(); }}
          className="bg-mountain-blue hover:bg-[#1f3f60] text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
        >
          Download the full case study
        </button>
      </div>
    </div>
  </section>
);

// ─── When It's a Good Fit ───────────────────────────────────────────────────
const FIT_BULLETS = [
  "Consultants running operational diagnostics.",
  "Associations with low survey response rates.",
  "Nonprofits that need candid donor or member voice without a six-figure research engagement."
];

const GoodFit = () => (
  <section className="bg-alpine-white py-20 px-4">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-navy-blue font-inter mb-10 text-center">
        When it&rsquo;s a good fit.
      </h2>
      <ul className="space-y-4">
        {FIT_BULLETS.map((b) => (
          <li key={b} className="flex gap-4 items-start bg-pearl-white rounded-lg p-5">
            <span className="text-[#FF6A3D] font-bold text-xl shrink-0">&bull;</span>
            <p className="text-mountain-blue leading-relaxed">{b}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ─── Pricing ────────────────────────────────────────────────────────────────
const PRICING = [
  { title: "Setup", price: "$1,500" },
  { title: "Platform", price: "$250 per month" },
  { title: "Usage", price: "$0.50 per minute of completed interview" }
];

const Pricing = () => (
  <section className="bg-pearl-white py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-navy-blue font-inter mb-12 text-center">
        Pricing.
      </h2>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {PRICING.map((p) => (
          <div key={p.title} className="bg-alpine-white rounded-lg p-8 shadow-sm border-t-4 border-[#FF6A3D] text-center">
            <h3 className="font-inter font-semibold text-lg text-mountain-blue uppercase tracking-wide mb-3">{p.title}</h3>
            <p className="font-inter font-bold text-2xl text-navy-blue">{p.price}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-mountain-blue text-center max-w-2xl mx-auto mb-10 leading-relaxed">
        Pricing covers the voice agent and structured data delivery. Questionnaire design and analysis scoped per engagement.
      </p>

      <div className="text-center">
        {STRIPE_VOICE_AI_ENABLED ? (
          <a
            href="/voice-ai/checkout"
            onClick={() => trackCta('cta_stripe_checkout')}
            className="inline-block bg-[#FF6A3D] hover:bg-[#e55a35] text-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            Start now. $1,500 setup.
          </a>
        ) : (
          <p className="text-sm text-mountain-blue italic">
            Self-serve checkout coming soon. Book a discovery call to get started.
          </p>
        )}
      </div>
    </div>
  </section>
);

// ─── HubSpot form modal (case study gate) ───────────────────────────────────
const CaseStudyFormModal = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const scriptId = "hs-form-script-voice-ai";

    const createForm = () => {
      if (window.hbspt && VOICE_AI_FORM_ID && !VOICE_AI_FORM_ID.startsWith("TODO_")) {
        window.hbspt.forms.create({
          region: HUBSPOT_REGION,
          portalId: HUBSPOT_PORTAL_ID,
          formId: VOICE_AI_FORM_ID,
          target: "#hubspot-voice-ai-form",
          onFormSubmitted: () => {
            trackCta('cta_download_case_study_submitted');
            window.location.href = CASE_STUDY_PDF;
          }
        });
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://js-na2.hsforms.net/forms/embed/v2.js";
      script.defer = true;
      script.async = true;
      script.onload = createForm;
      document.body.appendChild(script);
    } else {
      createForm();
    }
  }, [open]);

  if (!open) return null;

  const formReady = VOICE_AI_FORM_ID && !VOICE_AI_FORM_ID.startsWith("TODO_");

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-alpine-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-inter font-bold text-2xl text-navy-blue">Get the case study</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-mountain-blue hover:text-navy-blue text-2xl leading-none"
            aria-label="Close"
          >&times;</button>
        </div>
        <p className="text-mountain-blue mb-6">
          Tell us a bit about your context and we&rsquo;ll send you the full anonymized case study.
        </p>
        {formReady ? (
          <div id="hubspot-voice-ai-form" className="hs-form-frame" />
        ) : (
          <div className="bg-pearl-white border border-ice-blue rounded p-6 text-center">
            <p className="text-mountain-blue mb-4">
              The download form is being finalized. In the meantime, email{' '}
              <a href={`mailto:${MARK_EMAIL}?subject=Voice%20AI%20case%20study%20request`} className="text-[#FF6A3D] underline">{MARK_EMAIL}</a>
              {' '}and we&rsquo;ll send you the PDF directly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── CTA block (3 CTAs side by side desktop, stacked mobile) ────────────────
const CtaBlock = ({ onDownloadClick }) => (
  <section className="bg-navy-blue text-alpine-white py-20 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold font-inter mb-4">Three ways to start.</h2>
      <p className="text-lg mb-12 opacity-90 max-w-2xl mx-auto">
        Book a call, get the case study, or send Mark a note.
      </p>
      <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <a
          href={BOOKING_HREF}
          target={BOOKING_TARGET}
          rel={BOOKING_REL}
          onClick={() => trackCta('cta_book_discovery_footer')}
          className="bg-[#FF6A3D] hover:bg-[#e55a35] text-white font-bold py-4 px-6 rounded-lg transition duration-300 block"
        >
          Book a discovery call
        </a>
        <button
          type="button"
          onClick={() => { trackCta('cta_download_case_study_footer'); onDownloadClick(); }}
          className="bg-mountain-blue hover:bg-[#1f3f60] text-white font-bold py-4 px-6 rounded-lg transition duration-300 block"
        >
          Download the case study
        </button>
        <a
          href={`mailto:${MARK_EMAIL}?subject=Voice%20AI%20inquiry`}
          onClick={() => trackCta('cta_email_mark')}
          className="border-2 border-alpine-white hover:bg-alpine-white hover:text-navy-blue text-alpine-white font-bold py-4 px-6 rounded-lg transition duration-300 block"
        >
          Email Mark directly
        </a>
      </div>
    </div>
  </section>
);

// ─── Trust footer ───────────────────────────────────────────────────────────
const TrustFooter = () => (
  <section className="bg-pearl-white py-10 px-4">
    <div className="max-w-4xl mx-auto text-center text-sm text-navy-blue leading-relaxed">
      <p>
        Built and operated in the United States. SOC2-aligned process. Data handled per engagement DPA.
      </p>
    </div>
  </section>
);

// ─── Page ───────────────────────────────────────────────────────────────────
const VoiceAI = () => {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    document.title = "Voice AI | SherpaTech.AI";
    trackCta('page_view_voice_ai');
  }, []);

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  return (
    <div className="font-open-sans">
      <Hero onDownloadClick={openForm} />
      <PainPoints />
      <HowItWorks />
      <CaseStudy onDownloadClick={openForm} />
      <GoodFit />
      <Pricing />
      <CtaBlock onDownloadClick={openForm} />
      <TrustFooter />
      <CaseStudyFormModal open={formOpen} onClose={closeForm} />
    </div>
  );
};

export default VoiceAI;
