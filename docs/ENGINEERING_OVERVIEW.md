# Engineering Overview

## Scope

This project is a static product gallery and a small offline interface
reference. It deliberately has no server, database, sign-in, analytics,
production content or production API client.

## Demo flow

<pre><code>Static HTML
  ↓
Demo controller and typed state transitions
  ↓
DemoGameService
  ↓
FixtureGameService
  ↓
Three synthetic scenes and fixed display outcomes</code></pre>

The service boundary demonstrates how a view can depend on a small typed
contract. The only implementation returns local fixtures. It does not
contain a score formula; each displayed result is precomputed and does not
depend on the selected pin.

## Interaction

The demo has two states: choosing a pin and viewing the reveal. A pointer
can place the pin directly. Native range inputs provide a keyboard
alternative. The next-scene action resets the state and loads the next
fixture from the local adapter.

The drawing is original inline SVG and local SVG artwork. There are no
map tiles, geocoding calls, remote images or external assets.

## Live game boundary

The live game validates competitive actions on the server. The public demo
does not connect to the live service or expose its routes, schemas, rules,
content pipeline or infrastructure.

## Quality checks

- strict TypeScript type checking;
- ESLint;
- unit tests for input clamping, state transitions and fixture boundaries;
- Playwright checks for keyboard interaction, bilingual copy and no
  off-site requests;
- forbidden-content scan;
- production dependency audit and CodeQL workflow.
