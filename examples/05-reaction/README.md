# 05 — Reaction

Demonstrates `reaction` — a more fine-grained alternative to `autorun`.

## Concepts

- **`reaction(dataFn, effectFn)`** — separates "what to track" (data function) from "what to do" (effect function)
- **Selective tracking** — only fires when the data function's return value changes
- **Disposal** — `reaction` returns a disposer function to stop tracking

## Run locally

```bash
npm install
npm run dev
```

## Open in CodeSandbox

[![Open in CodeSandbox](https://img.shields.io/badge/Open-CodeSandbox-blue)](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/main/examples/05-reaction)
