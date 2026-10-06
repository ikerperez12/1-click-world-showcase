# Contributing

Contributions are welcome for the public gallery and its clean-room demo:

- visual polish and responsive behavior;
- accessibility improvements;
- English or Spanish copy;
- demo bugs and local fixture behavior;
- tests and documentation.

This repository does not accept work that reconstructs or connects to the
live backend, production content, scoring rules, private APIs, data model,
anti-abuse controls or operational systems. Do not submit credentials,
production screenshots, scraped content or real player data.

Before opening a pull request, run:

<pre><code>npm ci
npm run check
npx playwright install chromium
npm run test:e2e</code></pre>

The demo must remain offline and must work without environment variables.
