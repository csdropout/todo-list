export default class Todo {
    constructor(name, notes, date, time, priority) {
        this.name = name;
        this.notes = notes;
        this.date = date;
        this.time = time;
        this.priority = priority;
        this.id = crypto.randomUUID();
    }
}