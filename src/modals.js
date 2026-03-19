import Project from "./project.js";
import { projectManager } from "./project.js";
import Todo from "./todo.js";

export { setUpProjectForm, initProjectFormButtons, openTodoForm, addProjectToList, displayProject }

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

    cancelButton.onclick = () => {
        form.reset();
        dialog.close();
    }

    form.addEventListener("submit", (e) => {
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

    addButton.onclick = () => { openTodoForm(); }

    header.append(name, addButton);

    const taskHeading = document.createElement("h2");
    taskHeading.textContent = "Tasks";

    // Task list
    const list = document.createElement("ul");
    list.classList.add("todo-list");
    
    for (const todo of project.todoList) {
        const item = createTodoItem(todo);
        list.append(item);
    }

    content.append(header, taskHeading, list);
}

function openTodoForm(todo, li) {
    const isEdit = arguments.length === 2? true : false;

    const dialog = document.querySelector("#todo-dialog");
    const form = document.querySelector("#todo-form");
    const formHeader = document.querySelector("#todo-form h1");
    const name = document.querySelector("input[name='todo-name']");
    const notes = document.querySelector("textarea[name='notes']");
    const date = document.querySelector("input[name='date']");
    const time = document.querySelector("input[name='time']");
    const priority = document.querySelector("select[name='priority']");
    const buttons = form.querySelectorAll("button");
    const cancelButton = buttons[0];
    const submitButton = buttons[1];

    if (isEdit) {
        formHeader.textContent = 'Edit Todo';
        name.value = todo.name;
        notes.value = todo.notes;
        date.value = todo.date;
        time.value = todo.time;
        priority.value = todo.priority;
    } else {
        formHeader.textContent = 'New Todo';
    }

    cancelButton.onclick = () => { dialog.close() }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (isEdit) {
            const updates = {
                name: name.value,
                notes: notes.value,
                date: date.value,
                time: time.value,
                priority: priority.value,
            }
            projectManager.editTodo(todo.id, updates);
            li.querySelector("p").textContent = name.value;
        } else {
            const todo = new Todo(name.value, notes.value, date.value, time.value, priority.value);

            const currentProject = projectManager.getActiveProject();
            currentProject.addTodo(todo);

            // add to list 
            const todoList = document.querySelector(".todo-list");
            const item = createTodoItem(todo);
            todoList.appendChild(item);
        }

        form.reset();
        dialog.close();
    })

    dialog.showModal();
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
    todoItem.dataset.id = todo.id;

    todoItem.onclick = () => { openTodoForm(todo, todoItem); }

    return todoItem;
}