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
    list.appendChild(item);
}