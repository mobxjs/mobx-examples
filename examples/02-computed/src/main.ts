import { makeAutoObservable, autorun } from "mobx";

function log(message: string): void {
  const el = document.createElement("div");
  el.textContent = message;
  document.getElementById("output")!.appendChild(el);
}

class OrderLine {
  price: number;
  quantity: number;

  constructor(price: number, quantity: number) {
    this.price = price;
    this.quantity = quantity;
    makeAutoObservable(this);
  }

  get total(): number {
    log("  (computing total...)");
    return this.price * this.quantity;
  }
}

const order = new OrderLine(10, 3);

// autorun accesses the computed `total`, which depends on price and quantity
log("--- Setting up autorun ---");
autorun(() => {
  log(`Total: $${order.total}`);
});

// Changing price causes the computed to recalculate
log("--- Changing price from 10 to 15 ---");
order.price = 15;

// Changing quantity causes the computed to recalculate
log("--- Changing quantity from 3 to 5 ---");
order.quantity = 5;

// Demonstrate caching: accessing total multiple times without changes
// does NOT recompute
log("--- Accessing total 3 times without changes ---");
log(`  First access: $${order.total}`);
log(`  Second access: $${order.total}`);
log(`  Third access: $${order.total}`);
log("(Notice: 'computing total...' only appeared once above — the value was cached)");
