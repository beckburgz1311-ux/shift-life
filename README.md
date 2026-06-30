# SHIFT//LIFE

A personal narrative roguelite where every week is a run and every decision shapes Andy's work, family, creativity and future.

The first playable build is deliberately dependency-free: clone the repository and open `index.html`, or serve it with any static web server.

## Play locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Milestone 1 features

- Seven-day runs with morning, day and evening decisions
- Six resources: energy, stress, family, team morale, creativity and money
- Six weekly intentions that alter the starting build
- Eight repeatable activities
- Ten random life events
- Saturday Night Service boss encounter
- Multiple run endings
- Automatic browser saves plus manual save/reset controls
- Responsive mobile and desktop interface

## Current architecture

```text
index.html
src/
  main.js
  style.css
  game/
    content.js
    save.js
    state.js
docs/
  GAME_DESIGN.md
  ROADMAP.md
```

## Development approach

The game starts as a small data-driven browser prototype. Later milestones can migrate the presentation layer to Phaser without throwing away the event, state or progression models.

## Privacy note

This repository contains a fictionalised game inspired by real life. Avoid adding private phone numbers, personal addresses, confidential company information or identifiable staff performance data.
