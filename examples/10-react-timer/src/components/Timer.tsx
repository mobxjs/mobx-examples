import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TimerStoreContext } from "../store/TimerStore";

export const Timer = observer(function Timer() {
  const store = useContext(TimerStoreContext);

  useEffect(() => {
    return () => store.stop();
  }, [store]);

  return (
    <div>
      <h2>MobX Timer</h2>
      <p style={{ fontSize: 64, fontFamily: "monospace", margin: "24px 0" }}>
        {store.formatted}
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        {store.isRunning ? (
          <button onClick={() => store.stop()} style={{ padding: "10px 24px", fontSize: 16 }}>
            Stop
          </button>
        ) : (
          <button onClick={() => store.start()} style={{ padding: "10px 24px", fontSize: 16 }}>
            Start
          </button>
        )}
        <button onClick={() => store.reset()} style={{ padding: "10px 24px", fontSize: 16 }}>
          Reset
        </button>
      </div>
    </div>
  );
});
