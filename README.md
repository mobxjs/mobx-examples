# MobX Examples

Modern MobX 6 examples using TypeScript and Vite. Each example is a self-contained project that can be opened directly in CodeSandbox.

## Examples

| # | Example | Concepts | Open |
|---|---------|----------|------|
| 01 | [Observable & Autorun](./examples/01-observable-autorun) | `makeAutoObservable`, `autorun`, dependency tracking | [CodeSandbox](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/01-observable-autorun) |
| 02 | [Computed](./examples/02-computed) | `computed` getters, caching, lazy evaluation | [CodeSandbox](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/02-computed) |
| 03 | [Actions](./examples/03-actions) | `configure({ enforceActions })`, `action`, batching | [CodeSandbox](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/03-actions) |
| 04 | [runInAction](./examples/04-run-in-action) | `runInAction`, async patterns | [CodeSandbox](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/04-run-in-action) |
| 05 | [Reaction](./examples/05-reaction) | `reaction`, data vs effect functions, disposal | [CodeSandbox](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/05-reaction) |
| 06 | [When](./examples/06-when) | `when` callback + promise form | [CodeSandbox](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/06-when) |
| 07 | [Observable Map](./examples/07-observable-map) | `observable.map`, dynamic keys | [CodeSandbox](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/07-observable-map) |
| 08 | [Observable Array](./examples/08-observable-array) | Observable arrays, proxy behavior | [CodeSandbox](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/08-observable-array) |
| 09 | [React Todo](./examples/09-react-todo) | `observer`, `mobx-react-lite`, store + React Context | [CodeSandbox](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/09-react-todo) |
| 10 | [React Timer](./examples/10-react-timer) | `observer`, computed, interval side effects | [CodeSandbox](https://codesandbox.io/p/devbox/github/mobxjs/mobx-examples/tree/master/examples/10-react-timer) |

## Running locally

Each example is a standalone Vite project:

```bash
cd examples/01-observable-autorun
npm install
npm run dev
```

## MobX 3 to 6 migration reference

| MobX 3 (old) | MobX 6 (new) |
|---|---|
| `mobx.observable({...})` + factory functions | `class` + `makeAutoObservable(this)` |
| `mobx.extendObservable(this, {...})` | `makeAutoObservable(this)` |
| `mobx.useStrict(true)` | `configure({ enforceActions: "always" })` |
| `mobx.whyRun()` | Removed |
| `React.createClass` + `mobxReact.observer()` | `observer(FunctionComponent)` from `mobx-react-lite` |
| `mobxReact.Provider` + `inject()` | React Context + `useContext()` |

## License

MIT
