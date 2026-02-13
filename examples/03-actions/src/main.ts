import { makeAutoObservable, configure, autorun } from "mobx";

function log(message: string): void {
  const el = document.createElement("div");
  el.textContent = message;
  document.getElementById("output")!.appendChild(el);
}

// Enforce that state can only be modified inside actions
configure({ enforceActions: "always" });

class Counter {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  reset(): void {
    this.count = 0;
  }

  // A single action that makes multiple changes — only triggers ONE reaction
  addThree(): void {
    this.count++;
    this.count++;
    this.count++;
  }
}

const counter = new Counter();

log("--- Setting up autorun ---");
autorun(() => {
  log(`Count: ${counter.count}`);
});

log("--- Calling increment() ---");
counter.increment();

log("--- Calling increment() again ---");
counter.increment();

log("--- Calling decrement() ---");
counter.decrement();

log("--- Calling reset() ---");
counter.reset();

// Demonstrate batching: addThree makes 3 changes but autorun fires only once
log("--- Calling addThree() (3 increments in one action) ---");
counter.addThree();
log("(Notice: autorun only fired once for all 3 increments)");

// Demonstrate that modifying state outside an action throws an error
log("");
log("--- Attempting to modify state outside an action ---");
try {
  counter.count = 99;
} catch (e) {
  log(`Error: ${(e as Error).message}`);
}
