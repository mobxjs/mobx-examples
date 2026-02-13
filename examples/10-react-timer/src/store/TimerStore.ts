import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export class TimerStore {
  secondsElapsed = 0;
  intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    makeAutoObservable(this, {
      intervalId: false,
    });
  }

  get formatted(): string {
    const minutes = Math.floor(this.secondsElapsed / 60);
    const seconds = this.secondsElapsed % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  get isRunning(): boolean {
    return this.intervalId !== null;
  }

  start() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.secondsElapsed = 0;
  }

  tick() {
    this.secondsElapsed++;
  }
}

export const timerStore = new TimerStore();

export const TimerStoreContext = createContext<TimerStore>(timerStore);
