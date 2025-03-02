export class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.onUpdated = (todos) => {
            console.log("model updated: ");
            this.view.drawTodos(todos);
        };

        this.view.drawTodos(this.model.todos);

        this.view.onAdd = (text) => {
            console.log("onAdd: ", text);
            this.model.addTodo(text);
        };

        this.view.onDelete = (id) => {
            console.log("onDelete: ", id);
            this.model.removeTodo(id);
        };

        this.view.onToggle = (id) => {
            console.log("onToggle: ", id);
            this.model.toggleTodo(id);
        };

        this.view.onEdit = (id, text) => {
            console.log("onEdit: ", id, text);
            this.model.editTodo(id, text);
        };
    }
}
