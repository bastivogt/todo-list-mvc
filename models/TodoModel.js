import { Helper } from "../helper.js";

export class TodoModel {
    constructor() {
        this.todos = [
            { id: "1", text: "First todo", complete: false },
            { id: "2", text: "Second todo", complete: false },
        ];

        this.onUpdated = () => {};
    }

    addTodo(text) {
        this.todos.push({
            id: Helper.uniqueId(),
            text: text,
            complete: false,
        });
        this.onUpdated(this.todos);
    }

    removeTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.onUpdated(this.todos);
    }

    editTodo(id, text) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) {
                return { id: todo.id, text: text, complete: todo.complete };
            } else {
                return todo;
            }
        });
        this.onUpdated(this.todos);
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
        this.onUpdated(this.todos);
    }
}
