import "./style.css";
import "./modal-style.css";
import { setUpProjectForm, initProjectFormButtons, initTaskFormButtons, addProjectToList, displayProject} from "./modals.js";
import Project, { projectManager } from "./project.js"; 

setUpProjectForm();
initProjectFormButtons();
initTaskFormButtons();

// set up default page
const defaultProject = new Project("Empty Project");
projectManager.addProject(defaultProject);
// console.log(defaultProject);
addProjectToList(defaultProject);
displayProject(defaultProject);