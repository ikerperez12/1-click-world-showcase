<div align="center">
  <h1>1 Click World</h1>
  <p><strong>See a place. Drop one pin. Trust your intuition.</strong></p>
  <p><a href="https://one-click-world.vercel.app"><strong>PLAY NOW ↗</strong></a></p>
  <p><a href="README.md" lang="en">English</a> · <a href="README.es.md" lang="es">Español</a></p>
  <img src="public/gallery/social-preview.png" alt="1 Click World gallery artwork: an imagined coast, a map pin and the words See a place. Trust your instinct." width="100%" />
</div>

> **Public Showcase / Limited Reference Implementation**
>
> 1 Click World is a daily geography intuition game. This repository is a public product gallery and a limited clean-room reference implementation created specifically for demonstration. It is not the production source release. The real scoring engine, location catalogue, backend, database model, anti-abuse systems, operational jobs, infrastructure and a substantial portion of the live application are intentionally absent and remain private.

## How It Feels

See a landscape. Trust your first hunch. Drop one pin and enjoy the reveal. 1 Click World turns geography into a quick daily ritual you can share with friends or play at your own pace.

## Gallery

Every image in this gallery is an original illustration made for this repository. There are no production screenshots, real player profiles, live round images or real geographic coordinates.

| A place to imagine | One pin and a reveal | A passport for curiosity |
| --- | --- | --- |
| ![Imagined coast illustration](public/places/coast.svg) | ![Original conceptual map with fictional pins](public/gallery/map-panel.svg) | ![Fictional profile and progress card](public/gallery/passport.svg) |

![Offline demo sequence: place a pin, reveal an imagined place](public/gallery/gameplay.gif)

## Daily & Game Modes

| Daily | Sprint | Survival | Flag quiz |
| --- | --- | --- | --- |
| A shared moment of geographic intuition. | Quick guesses with a faster pace. | Keep going while your instincts hold. | Recognize a country from its colors. |

These modes describe the live product. They are gallery previews and are not implemented in this reference demo.

## Why It Is Fun

Every round is a small wager on your own intuition: notice a clue, commit to one place, then compare the reveal with your first instinct and a fictional crowd preview.

## Community & Weekly League

The live game turns individual guesses into a friendly weekly rhythm. The showcase presents that idea with invented names, ranks and values; it contains no player records or ranking implementation.

## Passport & Progress

Streaks, achievements and passport-style milestones give each session a sense of journey. The gallery uses a fictional profile and synthetic progress only.

## Safe Offline Demo

Use the map below to place a pin, reveal one of three invented scenes, and move to the next. The demo works from local HTML, TypeScript and SVG files. It does not load map tiles, images, analytics, accounts, APIs or production data.

The displayed distance, score and crowd percentile are precomputed UI fixtures. They do not depend on the guess and are not a contract for the live scoring engine.

## Engineering Showcase

The reference uses semantic HTML, a responsive design system, bilingual copy, strict TypeScript models, an explicit demo state machine, a fixture service adapter and browser tests that block off-site requests. Its architecture is intentionally small:

<pre><code>Player
  ↓
Geography Web Experience
  ↓
Server-authoritative Game Layer
  ↓
Protected Content &amp; Data</code></pre>

The live game validates competitive actions on the server. The public demo in this repository is isolated, uses synthetic fixtures and does not connect to the production API, database or daily content pipeline.

## What Is Included

- Product gallery with a direct link to the live game.
- A small offline pin-and-reveal demo with three synthetic scenes.
- Original SVG scenes, map art and a social preview graphic.
- English and Spanish interface copy.
- Typed models, a local fixture adapter and explicit state transitions.
- Responsive layouts, keyboard controls, visible focus, reduced-motion support and accessible status messages.
- Unit tests, browser interaction and network-isolation tests, lint, typecheck, build, dependency audit, secret scan and forbidden-content scan.
- Minimal GitHub Actions workflows with read-only permissions for checks.

## What Is Intentionally Private

- The production scoring engine and daily selection pipeline.
- The production location catalogue, round content and identifiers.
- Production APIs, database schema, policies and storage configuration.
- Private rooms and their implementation.
- Anti-cheat, abuse controls and competitive fairness rules.
- Authentication, user data, analytics and administration tools.
- Content operations, jobs, deployment and infrastructure.
- Production credentials and integrations.
- A substantial portion of the live application and its features.

## Run Locally

Requirements: Node.js 24 or newer and npm.

<pre><code>npm ci
npm run dev</code></pre>

Open the local address printed by Vite. No <code>.env</code> file, API token or service connection is needed.

Run the same checks used by CI:

<pre><code>npm run check
npx playwright install chromium
npm run test:e2e
npm audit --omit=dev</code></pre>

The demo uses no application dependencies at runtime. Development tools are listed in <code>package.json</code> and pinned by <code>package-lock.json</code>.

## Security

This repository does not connect to the live service. Please do not report production vulnerabilities in public issues. Use the repository's private vulnerability reporting feature when available; see [SECURITY.md](SECURITY.md).

## Contributing

Contributions are limited to the gallery, this isolated demo, accessibility, tests, translations and documentation. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This is a **public-source showcase, not an open-source release**. Copyright © 2026 Iker Pérez. All rights reserved.

Viewing and forking through GitHub are subject to GitHub's Terms of Service. No additional permission is granted to reuse, redistribute, deploy, commercialize, rebrand or create derivative products from this repository. See [LICENSE.md](LICENSE.md).

## Credits

All gallery illustrations and demo fixtures were created for this showcase. There are no third-party map tiles or location photographs. See [ATTRIBUTION.md](ATTRIBUTION.md) and [NOTICE.md](NOTICE.md).

<div align="center">
  <a href="https://one-click-world.vercel.app"><strong>PLAY NOW ↗</strong></a>
</div>
