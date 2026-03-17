import Project from "./project.js";
import { projectManager } from "./project.js";
export { setUpProjectForm, initProjectFormButtons }

function setUpProjectForm() {
    const button = document.querySelector("#add-project-button");
    const projectForm = document.querySelector("#project-form");

    button.addEventListener("click", (e) => {
        projectForm.showModal();
    })
}

function initProjectFormButtons() {
    const projectForm = document.querySelector("#project-form");
    const buttons = document.querySelectorAll("#project-form-buttons button");
    const cancelButton = buttons[0];
    const submitButton = buttons[1];

    cancelButton.addEventListener("click", () => {
        projectForm.close();
    })

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const name = projectForm.querySelector("#name").value;
        const project = new Project(name);
        projectManager.addProject(project);
        addProjectToList(project)
        projectForm.close();
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

    header.append(name, addButton);

    const taskHeading = document.createElement("h2");
    taskHeading.textContent = "Tasks";

    // Task list
    const list = document.createElement("ul");
    
    for (const todo of project.todoList) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const taskName = document.createElement("p");
        const deleteButton = document.createElement("button");

        checkbox.type = "checkbox";
        taskName.textContent = todo.name;
        deleteButton.textContent = "x";

        li.append(checkbox, taskName, deleteButton);
    }

    content.append(header, taskHeading, list);
}