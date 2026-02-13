import { makeAutoObservable, configure, autorun, runInAction } from "mobx";

function log(message: string): void {
  const el = document.createElement("div");
  el.textContent = message;
  document.getElementById("output")!.appendChild(el);
}

// Enforce that state can only be modified inside actions
configure({ enforceActions: "always" });

class UserStore {
  user: string | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(): Promise<void> {
    // Use runInAction to modify state before the await
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // After await, we're outside the action context — use runInAction again
    runInAction(() => {
      this.user = "Alice";
      this.loading = false;
    });
  }

  async fetchUserWithError(): Promise<void> {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate an error
    runInAction(() => {
      this.error = "Network error: failed to fetch user";
      this.loading = false;
    });
  }
}

const store = new UserStore();

log("--- Setting up autorun ---");
autorun(() => {
  if (store.loading) {
    log(`State: loading...`);
  } else if (store.error) {
    log(`State: error — ${store.error}`);
  } else if (store.user) {
    log(`State: user loaded — ${store.user}`);
  } else {
    log(`State: idle (no user)`);
  }
});

// Trigger the async fetch
log("--- Calling fetchUser() ---");
store.fetchUser().then(() => {
  log("");
  log("--- Calling fetchUserWithError() ---");
  store.fetchUserWithError();
});
