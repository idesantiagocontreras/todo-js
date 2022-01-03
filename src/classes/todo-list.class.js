import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        //this.todos = [];
        this.cargarLocaStorage();
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        this.todos = this.todos.filter( ( todo ) => todo.id !== id );
        this.guardarLocalStorage();
    }

    contarPendientes(){
        return this.todos.filter( ( todo ) => !todo.completado ).length;
    }

    marcarCompletado( id ){

        console.log(this.todos);
        for( const todo of this.todos){
            if( todo.id == id ){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( ( todo ) => !todo.completado);
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocaStorage(){
        this.todos = localStorage.getItem('todo') ? JSON.parse( localStorage.getItem('todo') ) : [];

        console.log(this.todos);

        this.todos = this.todos.map( Todo.fromJson );

        console.log(this.todos);
    }
}