import { addToProjectList, createProjectItem, setActiveProject } from "./forms.js";
import { projectManager } from "./storage.js";
export { renderProjectList }

function renderProjectList() {
    console.log("Render projects list");
    const projects = projectManager.getAllProjects();

    console.log(projectManager.getActiveProject());
    for (const p of projects) {
        console.log(p);
        const projectItem = createProjectItem(p);
        addToProjectList(projectItem);
        if (p.id === projectManager.getActiveProject().id) {
            setActiveProject(projectItem);
        }
    }
}