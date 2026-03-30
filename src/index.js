import "./style.css";
import "./modal-style.css";
import { initAddProjectButton, setupProjectForm, addToProjectList, displayProject, setActiveProject, createProjectItem } from "./forms.js";
import Project from "./project.js"; 
import { projectManager, storageAvailable } from "./storage.js";
import { renderProjectList } from "./render.js";

if (storageAvailable("localStorage") && localStorage.getItem("projects") !== null) {
    projectManager.load();
    renderProjectList();
    if (projectManager.getActiveProject()) { displayProject(projectManager.getActiveProject()); }
} else {
    const project = new Project("Start");
    projectManager.addProject(project);
    projectManager.setActiveProject(project.id);
    const item = createProjectItem(project);
    addToProjectList(item);
    setActiveProject(item);
    displayProject(project);
}

initAddProjectButton();
setupProjectForm();