export default class Project {
    constructor(name) {
        this.name = name;
        this.todoList = []
        this.id = crypto.randomUUID();
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }

    deleteTodo(id) {
        this.todoList = this.todoList.filter((todo) => todo.id !== id);
    }

    getTodo(id) {
        return this.todoList.find((todo) => todo.id === id);
    }
}

export const projectManager = (() => {
    let projects = []
    let activeProject = null;

    const addProject = (project) => {
        projects.push(project);
    }

    const deleteProject = (id) => {
        projects = projects.filter((project) => project.id !== id);
    }

    const getProject = (id) => {
        return projects.find((project) => project.id === id);
    }
    
    const setActiveProject = (id) => {
        activeProject = projects.find((project) => project.id === id);
    }

    const getActiveProject = () => {
        return activeProject;
    }

    return { getProject, addProject, deleteProject, setActiveProject, getActiveProject }
})();