# 03 — Actions

Demonstrates MobX strict mode and actions for state modification.

## Concepts

- **`configure({ enforceActions: "always" })`** — requires all state changes to happen inside actions
- **Actions** — methods decorated by `makeAutoObservable` that can modify state
- **Batching** — multiple state changes in a single action trigger only one reaction

## Run locally

```bash
npm install
npm run dev
```

## Open in CodeSandbox

[![Open in CodeSandbox](https://img.shields.io/badge/Open-CodeSandbox-blue)](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/03-actions)
