import { Helper } from "../helper.js";

export class TodoModel {
    constructor() {
        this.todos = [
            { id: "1", text: "First todo", complete: false },
            { id: "2", text: "Second todo", complete: false },
        ];
    }

    addTodo(text) {
        this.todos.push({
            id: Helper.uniqueId(),
            text: text,
            complete: false,
        });
    }

    removeTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    editTodo(id, text) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) {
                return { id: todo.id, text: text, complete: todo.complete };
            } else {
                return todo;
            }
        });
    }

    toggleTodo(id) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) {
                return {
                    id: todo.id,
                    text: todo.text,
                    complete: !todo.complete,
                };
            } else {
                return todo;
            }
        });
    }
}
