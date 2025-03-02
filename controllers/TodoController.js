export class TodoController {
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

        this.view.onEdit = (id, text) => {
            console.log("onEdit: ", id, text);
            this.model.editTodo(id, text);
            this.view.displayTodos(this.model.todos);
        };
    }
}
