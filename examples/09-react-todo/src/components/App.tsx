import { todoStore, TodoStoreContext } from "../store/TodoStore";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { TodoStats } from "./TodoStats";

export function App() {
  return (
    <TodoStoreContext.Provider value={todoStore}>
      <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
        <h2>MobX Todo</h2>
        <TodoInput />
        <TodoList />
        <TodoStats />
      </div>
    </TodoStoreContext.Provider>
  );
}
