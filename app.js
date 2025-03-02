import { TodoModel } from "./TodoModel.js";
import { TodoView } from "./TodoView.js";
import { TodoController } from "./TodoController.js";
import { DOM } from "./helper.js";

const root = DOM.getElement("#root");

const model = new TodoModel();
const view = new TodoView(root);
const controller = new TodoController(model, view);
