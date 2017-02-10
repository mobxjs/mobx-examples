# mobx-examples
A collection of simple mobx examples.  All the examples below have been written in ES5 without JSX.  No transpiling required.
Please feel free to make any suggestions for improvement.

[Baseline JSFiddle](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/baseline)
Includes: React, lodash, mobx, mobxReact, and mobxDevtools.

[Baseline JSFiddle with decorators](https://jsfiddle.net/c569stm5/)
Includes: React, mobx, mobxReact. Thanks @spion!

## MobX stand-alone examples
Please note that I have created a `console.log` override that prints the
`console.log`s out to the results window on JSFiddle.

### Creating Observables

* [`observable`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/35-observable)

* [`extendObservable`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/30-extendObservable)

* [`asMap`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/40-map)

* [`array`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/110-array)

### Reactions

* [`autorun`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/00-autorun)  
Note how the autorun only fires when a referenced field changes.

* [`reaction`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/70-reaction)

* [`when`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/60-when)

### Computed Values

* [`computed`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/10-computed)  
Note how the computed fullName is cached.

### Actions

* [`action`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/50-action)  
Non-strict action usage.  You may still set values outside of the actions.

* [`action strict mode`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/51-action-strict)  
Strict action usage.  OPEN YOUR CONSOLE.  You should see an error where I try to set firstName directly.
Note how easy it is to see the cause in the stack.

### Utils

* [`runInAction`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/20-runInAction)

* [`spy`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/80-spy)

* [`whyRun`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/90-whyRun)

* [`untracked`](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/120-untracked) Compare with the normal [computed example](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/mobx-standalone/10-computed)

## React + MobX examples

* [todo with factories, actions and the dev tools](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/react-examples/00-todo)

* [array proptype example](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/react-examples/10-array-propType)

* [mobxReact Provider example](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/react-examples/20-provider)

* [Timer example](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/react-examples/30-timer-tutorial)
Timer example heavily based on [Patrick Klitzke's](https://github.com/philolo1) tutorial [It's all about time: Building a performant Stopwatch with MobX and React - fast](https://onsen.io/blog/mobx-tutorial-react-stopwatch/)

* [Super cool MobX Redux tools example!](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/react-examples/40-todo-Redux-devtools)
Huge Thanks to [@mdiordiev](https://twitter.com/mdiordiev)!  See his project here for details: https://github.com/zalmoxisus/mobx-remotedev

* [Count down timer example](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/react-examples/60-countdown-timer)

* [The RED COBRA'S poker timer](https://jsfiddle.net/gh/get/library/pure/mattruby/mobx-examples/tree/master/react-examples/50-poker-timer)
Beware of the Red Cobra! For his poker timer not only times blinds, it speaks!
