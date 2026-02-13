import { makeAutoObservable, reaction } from "mobx";

function log(message: string): void {
  const el = document.createElement("div");
  el.textContent = message;
  document.getElementById("output")!.appendChild(el);
}

class Temperature {
  unit: "C" | "F" = "C";
  temperatureCelsius: number = 25;

  constructor() {
    makeAutoObservable(this);
  }

  get temperatureFahrenheit(): number {
    return this.temperatureCelsius * (9 / 5) + 32;
  }

  get temperature(): string {
    if (this.unit === "C") {
      return `${this.temperatureCelsius} °C`;
    }
    return `${this.temperatureFahrenheit} °F`;
  }
}

const temp = new Temperature();

log("--- Setting up reaction to track temp.temperature ---");

const dispose = reaction(
  () => temp.temperature,
  (value, previousValue) => {
    log(`Temperature changed: ${previousValue} -> ${value}`);
  }
);

log("Setting temperatureCelsius = 30");
temp.temperatureCelsius = 30;

log("Setting unit = F");
temp.unit = "F";

log("Setting temperatureCelsius = 0 (while unit is F)");
temp.temperatureCelsius = 0;

log("--- Disposing reaction ---");
dispose();

log("Setting temperatureCelsius = 100 (after dispose)");
temp.temperatureCelsius = 100;

log("Reaction did not fire — it was disposed.");
