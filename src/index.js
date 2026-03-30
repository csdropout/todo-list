import "./style.css";
import "./modal-style.css";
import { initAddProjectButton, setupProjectForm, addToProjectList, displayProject, setActiveProject, createProjectItem } from "./forms.js";
import Project, { projectManager } from "./project.js"; 

const project = new Project("Start");
projectManager.addProject(project);
projectManager.setActiveProject(project.id);
const item = createProjectItem(project);
addToProjectList(item);
setActiveProject(item);
displayProject(project);

initAddProjectButton();
setupProjectForm();