export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export const projectManager = (() => {
    let projects = [];
    let activeProject = null;

    const save = () => { localStorage.setItem("projects", JSON.stringify(projects)); }
    const load = () => {
        projects = JSON.parse(localStorage.getItem("projects"));
        activeProject = JSON.parse(localStorage.getItem("active"));
    }

    const getAllProjects = () => { return projects }

    const addProject = (project) => {
        projects.push(project);
        save();
    }

    const deleteProject = (id) => {
        projects = projects.filter((project) => project.id !== id);
        save();
    }

    const getProject = (id) => { return projects.find((project) => project.id === id); }
    
    const setActiveProject = (id) => {
        if (id) {
            activeProject = projects.find((project) => project.id === id);
            localStorage.setItem("active", JSON.stringify(activeProject));
        } else {
            localStorage.removeItem("active");
            activeProject = null;
        }
    }

    const getActiveProject = () => { return activeProject; }

    const editTodo = (todoId, updates) => {
        activeProject.editTodo(todoId, updates);
        save();
    }

    const editProject = (id, edits) => {
        getProject(id).edit(edits);
        save();
    }

    return { getAllProjects, getProject, addProject, deleteProject, setActiveProject, getActiveProject, editTodo, editProject, load }
})();