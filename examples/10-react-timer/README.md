# 10 — React Timer

A timer app demonstrating MobX computed values and side effect management with React.

## Concepts

- **`observer`** — re-renders when `secondsElapsed` or `isRunning` changes
- **Computed formatting** — `formatted` getter converts seconds to MM:SS
- **Side effects** — `setInterval` managed by the store, cleaned up via `useEffect` on unmount
- **Non-observable fields** — `intervalId` is excluded from MobX tracking

## Run locally

```bash
npm install
npm run dev
```

## Open in CodeSandbox

[![Open in CodeSandbox](https://img.shields.io/badge/Open-CodeSandbox-blue)](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/10-react-timer)
