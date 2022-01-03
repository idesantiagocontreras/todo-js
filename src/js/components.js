import { todoList } from "..";
import { Todo } from "../classes";

const divTodoList       = document.querySelector('.todo-list');
const btnBorrar         = document.querySelector('.clear-completed');
const txtInput          = document.querySelector('.new-todo');
const ulFiltros         = document.querySelector('.filters');
const anchorFiltros     = document.querySelectorAll('.filtro');
const countPendientes    = document.querySelector('.todo-count');

export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
        <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    console.log(divTodoList);

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );
    countPendientes.children[0].innerHTML = todoList.contarPendientes();

    return div;
};

txtInput.addEventListener('keyup', ( event ) =>{
    if( event.keyCode === 13 && txtInput.value.length > 0 ){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );

        console.log( todoList );
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => {

    const nombreElemento    = event.target.localName;
    const todoElemento      = event.target.parentElement.parentElement;
    const todoId            = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input')){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    }

    if( nombreElemento.includes('button')){
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
    countPendientes.children[0].innerHTML = todoList.contarPendientes();
});

btnBorrar.addEventListener('click', (event) => {
    todoList.eliminarCompletados();
    
    for( let i = divTodoList.children.length - 1; i >= 0; i-- ){
        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ){ return; }

    anchorFiltros.forEach( elemt => elemt.classList.remove('selected'));
    event.target.classList.add('selected');

    for( let elemento of divTodoList.children ){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if( completado ) elemento.classList.add('hidden');
            break;
            case 'Completados':
                if( !completado ) elemento.classList.add('hidden');
            break;
        }

    }
});