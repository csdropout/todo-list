import "./style.css";
import "./modal-style.css";
import { setUpProjectForm, initProjectFormButtons, addProjectToList, displayProject} from "./modals.js";
import Project, { projectManager } from "./project.js"; 

// set up default page
const defaultProject = new Project("Empty Project");
projectManager.addProject(defaultProject);
projectManager.setActiveProject(defaultProject.id);
addProjectToList(defaultProject);
displayProject(defaultProject);

setUpProjectForm();
initProjectFormButtons();