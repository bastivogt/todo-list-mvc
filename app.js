import { DOM, Helper } from "./helper.js";

class Model {
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

class View {
    constructor() {
        this.app = DOM.getElement("#root");

        this.title = DOM.createElement({ tag: "h1" });
        this.title.textContent = "Todo MVC";

        this.form = DOM.createElement({ tag: "form", id: "todo-form" });

        this.input = DOM.createElement({ tag: "input" });
        this.input.type = "text";
        this.input.placeholder = "Add Todo";
        this.input.name = "todo";

        this.submit = DOM.createElement({ tag: "button" });
        this.submit.textContent = "Submit";

        this.todoList = DOM.createElement({
            tag: "ul",
            className: "todo-list",
        });

        this.form.append(this.input, this.submit);
        this.app.append(this.title, this.form, this.todoList);

        // event callbacks
        this.onAdd = () => {};
        this.onDelete = () => {};
        this.onToggle = () => {};

        this.submit.addEventListener("click", (e) => {
            e.preventDefault();
            this.onAdd(this._todoText);
            this._resetInput();
        });
    }

    get _todoText() {
        return this.input.value;
    }

    _resetInput() {
        this.input.value = "";
    }

    displayTodos(todos) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }

        if (todos.length === 0) {
            const p = DOM.createElement({ tag: "p" });
            p.textContent = "No Todo available";
            this.todoList.append(p);
        } else {
            todos.forEach((todo) => {
                const li = DOM.createElement({ tag: "li", id: todo.id });

                const cb = DOM.createElement({ tag: "input" });
                cb.type = "checkbox";
                cb.checked = todo.complete;

                const span = DOM.createElement({
                    tag: "span",
                    className: "editable",
                });
                span.contentEditable = true;

                if (todo.complete) {
                    const strike = DOM.createElement({ tag: "s" });
                    strike.textContent = todo.text;
                    span.append(strike);
                } else {
                    span.textContent = todo.text;
                }

                const delButton = DOM.createElement({ tag: "button" });
                delButton.textContent = "Delete";

                li.append(cb, span, delButton);

                this.todoList.append(li);

                delButton.addEventListener("click", (e) => {
                    const id = e.target.parentElement.id;
                    this.onDelete(id);
                });

                cb.addEventListener("change", (e) => {
                    const id = e.target.parentElement.id;
                    this.onToggle(id);
                });
            });
        }

        console.log(todos);
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.displayTodos(this.model.todos);

        this.view.onAdd = (text) => {
            console.log("onAdd: ", text);
            this.model.addTodo(text);
            this.view.displayTodos(this.model.todos);
        };

        this.view.onDelete = (id) => {
            console.log("onDelete: ", id);
            this.model.removeTodo(id);
            this.view.displayTodos(this.model.todos);
        };

        this.view.onToggle = (id) => {
            console.log("onToggle: ", id);
            this.model.toggleTodo(id);
            this.view.displayTodos(this.model.todos);
        };
    }
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
