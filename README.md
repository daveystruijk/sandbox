## Getting Started

- `pnpm -r configure-env` (TODO)

- Some packages require additional setup:
  - `packages/` [Nativescript Environment Setup](https://docs.nativescript.org/environment-setup.html)

## Design Goals

- Use as little boilerplate as possible
- Use well-supported technologies that will last for a while
- Dev feedback loop should stay fast
- Find a good solution for frontend cross-platform dev (android, ios, web)
  - Nativescript + Tailwind seems to work, might be possible to integrate solidjs here

## Architecture Decisions

- Use typescript as a main language for the workspace
- Use rust for some backends (but use package.json for actions)
- Main verbs: start, dev, build, test, deploy

## Sandbox Apps

- Game: A multiplayer browser game.

  - Backend: Rust (Axum)
  - Frontend (web): Solid.js
  - Frontend (mobile): Nativescript, maybe Solid.js?

- Admin Panel: A generic app to make managing SQL databases easier.
  - Backend: tRPC
  - Frontend: Solid.js

## TODO

- [ ] Find out way to make managing database migrations less cumbersome
- [ ] Decide what software design problems to simulate
- [ ] Decide documentation structure
- [ ] Decide deployment setup
- [ ] Make basic backend setup
- [ ] Make basic web frontend setup
- [ ] Make basic mobile frontend setup
