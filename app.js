import { TodoModel } from "./models/TodoModel.js";
import { TodoView } from "./views/TodoView.js";
import { TodoController } from "./controllers/TodoController.js";
import { DOM } from "./helper.js";

const ikke = DOM.getElement("#ikke");

// const model = new TodoModel();
// const view = new TodoView({ rootElemet: ikke, title: "Ikke" });
// const controller = new TodoController(model, view);

new TodoController(
    new TodoModel(),
    new TodoView({ rootElemet: ikke, title: "Ikke" })
);

const du = DOM.getElement("#du");
new TodoController(
    new TodoModel(),
    new TodoView({ rootElemet: du, title: "Du" })
);
