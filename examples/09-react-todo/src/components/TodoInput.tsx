import { useState, useContext, FormEvent } from "react";
import { observer } from "mobx-react-lite";
import { TodoStoreContext } from "../store/TodoStore";

export const TodoInput = observer(function TodoInput() {
  const store = useContext(TodoStoreContext);
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      store.addTodo(trimmed);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        style={{ flex: 1, padding: 8, fontSize: 14 }}
      />
      <button type="submit" style={{ padding: "8px 16px", fontSize: 14 }}>
        Add
      </button>
    </form>
  );
});
