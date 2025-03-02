import { DOM } from "./helper.js";

export class TodoView {
    constructor(rootElemet) {
        this.app = rootElemet;

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

        this.tempTodoText = null;

        // event callbacks
        this.onAdd = () => {};
        this.onDelete = () => {};
        this.onToggle = () => {};
        this.onEdit = () => {};

        this.submit.addEventListener("click", (e) => {
            e.preventDefault();
            if (this._todoText !== "") {
                this.onAdd(this._todoText);
                this._resetInput();
            }
        });
    }

    get _todoText() {
        return this.input.value;
    }

    _resetInput() {
        this.input.value = "";
    }

    displayTodos(todos) {
        this.tempTodoText = null;
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

                span.addEventListener("input", (e) => {
                    const id = e.target.parentElement.id;
                    this.tempTodoText = e.target.textContent;
                    console.log(this.tempTodoText);
                });

                span.addEventListener("focusout", (e) => {
                    const id = e.target.parentElement.id;
                    if (this.tempTodoText) {
                        this.onEdit(id, this.tempTodoText);
                    }
                    this.tempTodoText = null;
                });
            });
        }

        console.log(todos);
    }
}
