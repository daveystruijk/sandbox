# Design Goals

- Use as little boilerplate as possible
- Use well-supported technologies that will last for a while
- Dev feedback loop should stay fast

# Architecture Decisions

- Use typescript as a main language for the workspace
- Use docker-compose?
- Use rust for backends (but use package.json for actions)
- Main verbs: start, dev, build, test, deploy

# Sandbox Apps

- Game: A multiplayer browser game.

  - Backend: Rust (Axum)
  - Frontend: Solid.js

- Admin Panel: A generic app to make managing SQL databases easier.
  - Backend: tRPC
  - Frontend: Solid.js

# TODO

- [ ] Find out way to make managing database migrations less cumbersome
- [ ] Decide what software design problems to simulate
- [ ] Decide documentation structure
- [ ] Decide deployment setup
- [ ] Make basic backend setup
- [ ] Make basic web frontend setup
- [ ] Make basic mobile frontend setup
