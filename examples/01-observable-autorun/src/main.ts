import { makeAutoObservable, autorun } from "mobx";

function log(message: string): void {
  const el = document.createElement("div");
  el.textContent = message;
  document.getElementById("output")!.appendChild(el);
}

class Animal {
  name: string;
  energyLevel: number;

  constructor(name: string, energyLevel: number) {
    this.name = name;
    this.energyLevel = energyLevel;
    makeAutoObservable(this);
  }
}

const dog = new Animal("Dog", 100);

// autorun tracks all observables accessed during its execution
log("--- Setting up autorun ---");
autorun(() => {
  log(`Energy level of ${dog.name}: ${dog.energyLevel}`);
});

// Changing energyLevel triggers the autorun
log("--- Changing energyLevel to 80 ---");
dog.energyLevel = 80;

// Changing name also triggers the autorun (it accesses both name and energyLevel)
log("--- Changing name to Cat ---");
dog.name = "Cat";

// Both changes trigger because autorun tracks all observables it reads
log("--- Changing energyLevel to 50 ---");
dog.energyLevel = 50;

// Demonstrate that autorun only tracks accessed observables
log("");
log("--- New autorun that only reads energyLevel ---");
const animal2 = new Animal("Bird", 200);
autorun(() => {
  log(`Energy: ${animal2.energyLevel}`);
});

log("--- Changing animal2 name (autorun should NOT fire) ---");
animal2.name = "Eagle";
log("(Notice: no autorun output above because name was not accessed)");

log("--- Changing animal2 energyLevel (autorun WILL fire) ---");
animal2.energyLevel = 150;
