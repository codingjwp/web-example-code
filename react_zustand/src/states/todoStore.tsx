import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TodoState = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

interface ITodoStore {
  todos: TodoState[],
  setTodos: (todos: TodoState[]) => void,
  actions: {
    updateTodos: (id: number, todo: TodoState) => void,
    deleteTodos: (id: number) => void,
  }
}

const useStore = create<ITodoStore>()(
  persist(
  (set)=> ({
    todos: [],
    setTodos: (todos: TodoState[]) => set({todos}),
    actions: {
      updateTodos: (id, todo) => set((state) => ({todos: state.todos.map((prev) => prev.id === id ? todo : prev)})),
      deleteTodos: (id) => set((state) => ({ todos: state.todos.filter((prev) => prev.id !== id)}))
    }
  }),
  { 
    name: 'todos',
    partialize: (state) => ({todos: state.todos})
  }
))


export const useTodoState = () => {
  const {todos, setTodos} = useStore((state) => ({todos: state.todos, setTodos: state.setTodos}));

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then((res) => res.json())
      .then((data: TodoState[]) => setTodos(data));
  }, [])

  return todos;
}
export const useTodoAction = () => {
  const { updateTodos, deleteTodos } = useStore(state => state.actions);
  return { 
    updateTodos,
    deleteTodos
  };
}