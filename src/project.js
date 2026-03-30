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

    editTodo(id, updates) {
        const todo = this.getTodo(id);
        todo.update(updates);
    }

    edit(edits) {
        Object.assign(this, edits);
    }
}