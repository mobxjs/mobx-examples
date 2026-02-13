# 04 — runInAction

Demonstrates the `runInAction` pattern for updating state after async operations.

## Concepts

- **`runInAction`** — wraps state mutations that happen after an `await` (where the action context is lost)
- **Async pattern** — fetch data, then update state inside `runInAction`
- **Loading/error state** — common pattern for async stores

## Run locally

```bash
npm install
npm run dev
```

## Open in CodeSandbox

[![Open in CodeSandbox](https://img.shields.io/badge/Open-CodeSandbox-blue)](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/main/examples/04-run-in-action)
