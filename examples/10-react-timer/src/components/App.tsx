import { timerStore, TimerStoreContext } from "../store/TimerStore";
import { Timer } from "./Timer";

export function App() {
  return (
    <TimerStoreContext.Provider value={timerStore}>
      <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif", textAlign: "center" }}>
        <Timer />
      </div>
    </TimerStoreContext.Provider>
  );
}
