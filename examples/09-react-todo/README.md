# 09 — React Todo

A full todo app demonstrating MobX with React using `mobx-react-lite`.

## Concepts

- **`observer`** — wraps React components to re-render when observed state changes
- **`mobx-react-lite`** — lightweight React bindings for MobX
- **Store + React Context** — inject stores via `createContext` + `useContext` (replaces the old `Provider`/`inject` pattern)
- **Computed values** — `completedCount` and `pendingCount` derive from the todos array

## Run locally

```bash
npm install
npm run dev
```

## Open in CodeSandbox

[![Open in CodeSandbox](https://img.shields.io/badge/Open-CodeSandbox-blue)](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/09-react-todo)
