import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { TodoStoreContext } from "../store/TodoStore";

export const TodoList = observer(function TodoList() {
  const store = useContext(TodoStoreContext);

  if (store.todos.length === 0) {
    return <p style={{ color: "#888" }}>No todos yet. Add one above!</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {store.todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => store.toggleTodo(todo.id)}
          />
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#888" : "inherit",
            }}
          >
            {todo.text}
          </span>
          <button
            onClick={() => store.removeTodo(todo.id)}
            style={{ padding: "4px 8px", fontSize: 12, cursor: "pointer" }}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
});
