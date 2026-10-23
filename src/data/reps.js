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
    formId: '6e3ffc95-6c87-49d7-977e-1b4dba01c6af', // Rep Lead: Omer, created 2026-10-23
    // TODO: paste the form's share link from the HubSpot form editor (Share, Share link).
    hostedFormUrl: null,
  },
};
