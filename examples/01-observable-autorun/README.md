# 01 — Observable & Autorun

Demonstrates MobX's core reactivity: `makeAutoObservable` and `autorun`.

## Concepts

- **`makeAutoObservable(this)`** — automatically makes all properties observable, getters computed, and methods actions
- **`autorun`** — runs a function immediately and re-runs it whenever any observable it reads changes
- **Dependency tracking** — MobX tracks which observables are accessed during execution and only re-runs when those specific observables change

## Run locally

```bash
npm install
npm run dev
```

## Open in CodeSandbox

[![Open in CodeSandbox](https://img.shields.io/badge/Open-CodeSandbox-blue)](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/main/examples/01-observable-autorun)
