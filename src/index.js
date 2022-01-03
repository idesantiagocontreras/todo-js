//import { Todo } from './classes/todo.class';
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/components';
import './styles.css';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);