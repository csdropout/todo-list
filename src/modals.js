import Project from "./project.js";
import { projectManager } from "./project.js";
import Todo from "./todo.js";

export { setUpProjectForm, initProjectFormButtons, initTaskFormButtons, addProjectToList, displayProject }

function setUpProjectForm() {
    const button = document.querySelector("#add-project-button");
    const dialog = document.querySelector("#project-dialog");

    button.addEventListener("click", (e) => {
        dialog.showModal();
    })
}

function initProjectFormButtons() {
    const dialog = document.querySelector("#project-dialog");
    const form = document.querySelector("#project-form");
    const buttons = document.querySelectorAll("#project-form-buttons button");
    const cancelButton = buttons[0];
    const submitButton = buttons[1];

    cancelButton.addEventListener("click", () => {
        form.reset();
        dialog.close();
    })

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const name = form.querySelector("#name").value;
        const project = new Project(name);
        projectManager.addProject(project);
        addProjectToList(project);
        form.reset();
        dialog.close();
    })
}

function addProjectToList(project) {
    const list = document.querySelector("#project-list");
    const item = document.createElement("li");
    item.textContent = project.name;
    item.dataset.id = project.id;

    item.addEventListener("click", (e) => {
        const p = projectManager.getProject(project.id);
        displayProject(p);
        projectManager.setActiveProject(project.id)
    })

    list.appendChild(item);
}

function displayProject(project) {
    const content = document.querySelector(".content");
    
    // Reset
    content.textContent = "";

    // Header (project name + add task button)
    const header = document.createElement("header");
    const name = document.createElement("h1");
    const addButton = document.createElement("button");

    header.classList.add("content-header");
    name.textContent = project.name;
    addButton.textContent = "Add Task";

    addButton.addEventListener("click", () => {
        const dialog = document.querySelector("#todo-dialog");
        dialog.showModal();
    })

    header.append(name, addButton);

    const taskHeading = document.createElement("h2");
    taskHeading.textContent = "Tasks";

    // Task list
    const list = document.createElement("ul");
    list.classList.add("todo-list");
    
    for (const todo of project.todoList) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const taskName = document.createElement("p");
        const deleteButton = document.createElement("button");

        checkbox.type = "checkbox";
        taskName.textContent = todo.name;
        deleteButton.textContent = "x";

        li.append(checkbox, taskName, deleteButton);
        list.append(li);
    }

    content.append(header, taskHeading, list);
}

function initTaskFormButtons() {
    const dialog = document.querySelector("#todo-dialog");
    const form = document.querySelector("#todo-form");
    const buttons = form.querySelectorAll("button");
    const cancelButton = buttons[0];
    const submitButton = buttons[1];

    cancelButton.addEventListener("click", () => {
        dialog.close();
    })

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        const name = document.querySelector("input[name='todo-name']").value;
        const notes = document.querySelector("textarea[name='notes']").value;
        const date = document.querySelector("input[name='date']").value;
        const time = document.querySelector("input[name='time']").value;
        const priority = document.querySelector("select[name='priority']").value;

        const todo = new Todo(name, notes, date, time, priority);

        const currentProject = projectManager.getActiveProject();
        currentProject.addTodo(todo);

        // add to list
        const todoList = document.querySelector(".todo-list");
        const item = createTodoItem(todo);
        todoList.appendChild(item);

        form.reset();
        dialog.close();
    })
}

function createTodoItem(todo) {
    const todoItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const name = document.createElement("p");
    const deleteButton = document.createElement("button");

    checkbox.setAttribute("type", "checkbox");
    name.textContent = todo.name;
    deleteButton.textContent = "x";

    todoItem.append(checkbox, name, deleteButton);

    return todoItem;
}