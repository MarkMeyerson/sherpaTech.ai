# TODO

## Tailwind v4 migration (not done — deliberately deferred)

The site currently styles itself through `@tailwindcss/postcss7-compat`, a
compatibility shim for Tailwind v2 (see `postcss.config.cjs`). An unused
`tailwindcss` v4 devDependency was removed from `package.json` during a
cleanup pass (see git history) because it wasn't wired into the build at
all — the v2 shim is what's actually running in production.

Migrating to Tailwind v4 properly, when there's time to do it with visual
QA, means:

- `postcss.config.cjs`: replace `@tailwindcss/postcss7-compat` +
  `autoprefixer` with the single `@tailwindcss/postcss` plugin.
- `tailwind.config.cjs`: drop the legacy `purge` block (superseded by
  `content`, which is already present); confirm the v4 config shape still
  needs a JS config file at all (v4 can be configured via CSS).
- `src/index.css`: replace the `@tailwind base; @tailwind components;
  @tailwind utilities;` directives with `@import "tailwindcss";`.
- Re-add `tailwindcss` (v4) and `@tailwindcss/postcss` as devDependencies,
  remove `@tailwindcss/postcss7-compat`, `postcss`, and `autoprefixer` (v4
  bundles its own PostCSS handling).
- Do this on a preview deploy and eyeball every page before promoting to
  production — CSS engine swaps risk silent visual regressions that won't
  show up in a build log.

Not urgent (the site works fine on the v2 shim today), but the shim is
unmaintained, so this shouldn't sit forever.
