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

    const addProject = (project) => {
        projects.push(project);
    }

    const deleteProject = (id) => {
        projects = projects.filter((project) => project.id !== id);
    }
    const getProjects = () => {
        return projects;
    }

    return { getProjects, addProject, deleteProject }
})();