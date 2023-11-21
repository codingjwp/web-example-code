import styles from './baseZustand.module.css'
import { useTodoState, useTodoAction } from '../states/zustandExample'
import { MouseEvent } from 'react';


export default function BaseZustand() {
  const todos = useTodoState();
  const {addTodos, updateTodos, delteTodos} = useTodoAction();
  const todoComponent = todos.length > 0 ? todos.map((todo) => {
    return (
    <div className={styles.todos} key={todo.id} onClick={handleTodoChange}>
      <input type='checkbox' name={`${todo.id}`} defaultChecked={todo.completed}/>
      <span>{todo.title}</span>
      <button type='button'>삭제</button>
    </div>)
  }) : null;

  function handleTodoChange(e: MouseEvent) {
    const tagName = (e.target as HTMLElement).tagName;
    const nodes = e.currentTarget.childNodes;
    const id = Number((nodes[0] as HTMLInputElement).name);
    if (tagName === 'INPUT') {
      updateTodos(id ,{
        userId: 1,
        id: id,
        title: (nodes[1] as HTMLSpanElement).innerText,
        completed: (nodes[0] as HTMLInputElement).checked
      })
    }
    else if (tagName === 'BUTTON') {
      delteTodos(id)
    }
    return ;
  }

  return (
    <div className={styles.base}>
      {todoComponent}
    </div>
  )
}