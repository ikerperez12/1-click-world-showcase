# Public Content Policy

This repository is a product gallery and a limited clean-room reference
implementation. It is not a production source release or an export of a
private repository.

## Allowed

- product name, public tagline and live-game link;
- original gallery interface and hand-authored illustrations;
- invented, non-geographic fixtures and precomputed display outcomes;
- generic engineering explanations and isolated demo tests;
- accessibility, responsive design and translation improvements.

## Keep private

- production source, business rules and competitive calculations;
- real or future locations, rounds, identifiers and datasets;
- APIs, payload contracts, database objects, policies and provider details;
- authentication, anti-abuse, administrative and operational systems;
- user data, logs, credentials, hostnames and deployment identifiers;
- assets without a documented right to redistribute.

## Review before merging

Review every changed file and asset for private names, values, comments,
metadata, environment details, real people and live-network dependencies.
Do not copy files from the production repository. If an idea needs a demo
version, implement it from the high-level behavior described in this
repository and use synthetic fixtures.

The forbidden-content check and browser network test are required CI
checks. They complement, but do not replace, review of the full Git diff
and generated build output.
