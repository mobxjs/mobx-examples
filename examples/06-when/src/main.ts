import { makeAutoObservable, when } from "mobx";

function log(message: string): void {
  const el = document.createElement("div");
  el.textContent = message;
  document.getElementById("output")!.appendChild(el);
}

class Resource {
  isLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  load(): void {
    this.isLoaded = true;
  }
}

// --- Callback form ---
log("--- when: callback form ---");
const resource1 = new Resource();

when(
  () => resource1.isLoaded,
  () => {
    log("Resource 1 loaded (callback form)");
  }
);

log("Resource 1 isLoaded: " + resource1.isLoaded);
log("Calling resource1.load()...");
setTimeout(() => {
  resource1.load();
}, 100);

// --- Promise form ---
log("--- when: promise form ---");
const resource2 = new Resource();

async function waitForLoad(): Promise<void> {
  log("Awaiting resource2 to load...");
  await when(() => resource2.isLoaded);
  log("Resource 2 loaded (promise form)");
}

waitForLoad();

log("Resource 2 isLoaded: " + resource2.isLoaded);
log("Calling resource2.load() after 200ms delay...");
setTimeout(() => {
  resource2.load();
}, 200);
