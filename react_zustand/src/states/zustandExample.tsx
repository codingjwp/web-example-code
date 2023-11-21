import { useEffect } from 'react';
import { create } from 'zustand';

type TodoState = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

interface ITodoStore {
  todos: TodoState[],
  actions: {
    createTodos: () => Promise<void>,
    addTodos: (todo: TodoState) => void,
    updateTodos: (id: number, todo: TodoState) => void,
    delteTodos: (id: number) => void,
  }
}

const useStore = create<ITodoStore>()((set)=> ({
  todos: [],
  actions: {
    createTodos: async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
        const data = await response.json();
        set({todos: data})
      }catch(error: unknown) {
        set({todos: []})
      }
    },
    addTodos: (todo) => set((state) => ({ todos: [...state.todos, todo]})),
    updateTodos: (id, todo) => set((state) => ({ todos: state.todos.map((prev) => {
      if (prev.id === id) return todo
      else return prev
    })})),
    delteTodos: (id) => set((state) => ({ todos: state.todos.filter((prev) => prev.id !== id)}))
  }
}))

export const useTodoState = () => {
  const todos = useStore((state) => state.todos);
  const create = useStore((state) => state.actions.createTodos);

  useEffect(() => {
    if (todos.length === 0) create();
  }, [])

  return todos;
}
export const useTodoAction = () => {
  const { addTodos, updateTodos, delteTodos } = useStore(state => state.actions);
  return { 
    addTodos,
    updateTodos,
    delteTodos
  };
}