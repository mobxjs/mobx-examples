import { observable, autorun, toJS } from "mobx";

function log(message: string): void {
  const el = document.createElement("div");
  el.textContent = message;
  document.getElementById("output")!.appendChild(el);
}

const todos = observable<string>([]);

log("--- Setting up autorun to track todos ---");

autorun(() => {
  log(`todos (length=${todos.length}): [${todos.join(", ")}]`);
});

log("Pushing: Buy groceries");
todos.push("Buy groceries");

log("Pushing: Clean house");
todos.push("Clean house");

log("Pushing: Write code");
todos.push("Write code");

log("Splicing: remove index 1 (Clean house)");
todos.splice(1, 1);

log("Replacing index 0 with: Buy organic groceries");
todos[0] = "Buy organic groceries";

// Standard array methods
log("--- Standard array methods ---");
const mapped = todos.map((t) => t.toUpperCase());
log(`map(toUpperCase): [${mapped.join(", ")}]`);

const filtered = todos.filter((t) => t.includes("code") || t.includes("Code"));
log(`filter(includes "code"/"Code"): [${filtered.join(", ")}]`);

const found = todos.find((t) => t.startsWith("Write"));
log(`find(startsWith "Write"): ${found ?? "not found"}`);

// toJS to get a plain array
log("--- toJS ---");
const plain = toJS(todos);
log(`toJS result: [${plain.join(", ")}]`);
log(`Is plain array: ${Array.isArray(plain)}`);
