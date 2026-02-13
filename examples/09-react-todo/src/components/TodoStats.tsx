import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { TodoStoreContext } from "../store/TodoStore";

export const TodoStats = observer(function TodoStats() {
  const store = useContext(TodoStoreContext);

  return (
    <p style={{ marginTop: 16, color: "#555" }}>
      Completed: {store.completedCount} | Pending: {store.pendingCount}
    </p>
  );
});
