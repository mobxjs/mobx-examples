import { observable, autorun } from "mobx";

function log(message: string): void {
  const el = document.createElement("div");
  el.textContent = message;
  document.getElementById("output")!.appendChild(el);
}

const userRoles = observable.map<string, string>();

log("--- Setting up autorun to track userRoles ---");

autorun(() => {
  const entries: string[] = [];
  userRoles.forEach((role, user) => {
    entries.push(`${user}=${role}`);
  });
  log(`userRoles (size=${userRoles.size}): {${entries.join(", ")}}`);
});

log('Setting alice=admin');
userRoles.set("alice", "admin");

log('Setting bob=editor');
userRoles.set("bob", "editor");

log('Updating alice=superadmin');
userRoles.set("alice", "superadmin");

log(`has("alice"): ${userRoles.has("alice")}`);
log(`get("alice"): ${userRoles.get("alice")}`);
log(`has("charlie"): ${userRoles.has("charlie")}`);

log('Deleting bob');
userRoles.delete("bob");

log(`Final size: ${userRoles.size}`);
