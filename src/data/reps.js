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
    // TODO: replace both after running scripts/hubspot/setup-rep-program.mjs live.
    formId: 'REPLACE_WITH_REP_LEAD_OMER_FORM_ID',
    hostedFormUrl: null,
  },
};
