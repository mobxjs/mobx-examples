import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export class TodoStore {
  todos: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get completedCount(): number {
    return this.todos.filter((todo) => todo.completed).length;
  }

  get pendingCount(): number {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  addTodo(text: string) {
    this.todos.push({
      id: crypto.randomUUID(),
      text,
      completed: false,
    });
  }

  toggleTodo(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

export const todoStore = new TodoStore();

export const TodoStoreContext = createContext<TodoStore>(todoStore);
