// Sales rep pages. One entry per rep; RepPage.jsx renders whichever entry the route passes.
// Adding a rep: create the "Rep Lead: <name>" form with scripts/hubspot/setup-rep-program.mjs,
// add an entry here, add a route in App.jsx. No component changes.
//
// salesRep must match an option value on the HubSpot sales_rep property exactly.
// formId is the "Rep Lead: <name>" form. hostedFormUrl is that form's share link from the
// form editor; the page offers it when the direct post fails.

export const REPS = {
  omer: {
    slug: 'omer',
    name: 'Omer Polanco',
    firstName: 'Omer',
    initials: 'OP',
    salesRep: 'Omer Polanco',
    location: 'Arlington',
    blurb: 'Omer Polanco sent you here',
    bio: 'Omer Polanco lives in Arlington and spends his time traveling the world, helping people, and chasing whatever technology is doing next. He connects local businesses with tools that actually make their day easier.',
    photo: null, // placeholder until Omer sends one; the page shows initials
    // Printed on the one-pager. Phone is blank until Omer gives one.
    contactEmail: 'djomerdmv@gmail.com',
    contactPhone: null,
    formId: '6e3ffc95-6c87-49d7-977e-1b4dba01c6af', // Rep Lead: Omer, created 2026-10-23
    hostedFormUrl: 'https://share-na2.hsforms.com/1bj_8lWyHSdeXfhtNugHGrw40odiz',
    // Short link to the Rep Lead Registration form (redirect in vercel.json). Reps bookmark this.
    lead_registration_url: '/rep',
    // Printable one-pagers, exported by Playwright from /omer/one-pager. Served from public/.
    onePagers: [
      { label: 'Both products', file: '/one-pagers/2026-10-23-omer-one-pager.pdf' },
      { label: 'AI Receptionist', file: '/one-pagers/2026-10-23-omer-one-pager-receptionist.pdf' },
      { label: 'Personal AI Assistant', file: '/one-pagers/2026-10-23-omer-one-pager-assistant.pdf' },
    ],
  },
};
