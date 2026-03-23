import Project from "./project.js";
import { projectManager } from "./project.js";
import Todo, { Priority, Status } from "./todo.js";

export { initAddProjectButton, setupProjectForm, openTodoForm, addToProjectList, displayProject, setActiveProject, createProjectItem }

function initAddProjectButton() {
    const button = document.querySelector("#add-project-button");
    const dialog = document.querySelector("#project-dialog");

    button.onclick = () => { dialog.showModal(); }
}

function setupProjectForm() {
    const dialog = document.querySelector("#project-dialog");
    const form = dialog.querySelector("#project-form");
    const buttons = form.querySelectorAll(".button-group    ");
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
        projectManager.setActiveProject(project.id);

        const item = createProjectItem(project);
        addToProjectList(item);
        setActiveProject(item);
        displayProject(project);

        form.reset();
        dialog.close();
    })
}

function addToProjectList(item) {
    const list = document.querySelector("#project-list");
    list.appendChild(item);
}

function createProjectItem(project) {
    const item = document.createElement("li");
    item.textContent = project.name;

    item.addEventListener("click", (e) => {
        const p = projectManager.getProject(project.id);
        displayProject(p);
        projectManager.setActiveProject(project.id)

        // set current project to be of class active
        setActiveProject(item);
    })

    return item;
}

function setActiveProject(item) {
    const activeProject = document.querySelector("#project-list li.active");
    if (activeProject) { activeProject.classList.remove("active")}
    item.classList.add("active");
}

function displayProject(project) {
    const content = document.querySelector(".content");
    
    // Reset
    content.textContent = "";

    // Header (project name + add task button)
    const header = document.createElement("header");
    const name = document.createElement("h1");
    const buttonGroup = document.createElement("div");
    const editButton = document.createElement("button");
    const addButton = document.createElement("button");

    header.classList.add("content-header");
    name.textContent = project.name;
    editButton.textContent = "Edit Project";
    addButton.textContent = "Add Task";

    editButton.onclick = () => { showEditProjectDialog(project); }
    // next: style buttons
    editButton.id = "edit-project-button";

    addButton.onclick = () => { openTodoForm(); }
    addButton.id = "add-todo-button";

    buttonGroup.classList.add("header-button-group");
    buttonGroup.append(editButton, addButton);

    header.append(name, buttonGroup);

    // Task list
    const list = document.createElement("ul");
    list.classList.add("todo-list");
    
    for (const todo of project.todoList) {
        const item = createTodoItem(todo);
        list.append(item);
    }

    content.append(header, list);
}

function showEditProjectDialog(project) {
    const dialog = document.querySelector("#edit-project-dialog");
    const form = dialog.querySelector("#edit-project-form");
    const name = form.querySelector("[name='name']");
    const buttons = form.querySelectorAll("button");
    const cancelButton = buttons[0];
    const deleteButton = buttons[1];

    name.value = project.name;

    cancelButton.onclick = () => { dialog.close(); }
    deleteButton.onclick = () => {
        // empty right display
        document.querySelector(".content").textContent = "";

        // delete project from dom list
        const currentProject = document.querySelector("#project-list li.active");
        // NEXT: default prject not set to active on init
        document.querySelector("#project-list").removeChild(currentProject);

        // delete project from project list
        projectManager.deleteProject(project.id);

        form.reset();
        dialog.close();
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        projectManager.editProject(project.id, { name: name.value });

        // edit dom
        const projectHeading = document.querySelector(".content-header h1");
        projectHeading.textContent = project.name;

        dialog.close();
    }, { once: true })

    dialog.showModal();
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
    }, { once: true })

    dialog.showModal();
}

function createTodoItem(todo) {
    const todoItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const name = document.createElement("p");
    const deleteButton = document.createElement("button");

    checkbox.setAttribute("type", "checkbox");
    if (todo.status === Status.COMPLETE) { checkbox.checked = true; }
    switch (todo.priority) {
        case Priority.LOW:
            todoItem.classList.add("low-priority");
            break;
        case Priority.MED:
            todoItem.classList.add("med-priority");
            break;
        case Priority.HIGH:
            todoItem.classList.add("high-priority");
            break;
    }
    checkbox.onclick = (e) => {
        e.stopPropagation();
        todo.status = todo.status === Status.INCOMPLETE? Status.COMPLETE : Status.INCOMPLETE;
    }

    name.textContent = todo.name;
    deleteButton.textContent = "x";
    deleteButton.onclick = (e) => {
        e.stopPropagation();
        projectManager.getActiveProject().deleteTodo(todo.id);
        todoItem.remove();
    }

    todoItem.append(checkbox, name, deleteButton);
    todoItem.dataset.id = todo.id;

    todoItem.onclick = () => { openTodoForm(todo, todoItem); }

    return todoItem;
}