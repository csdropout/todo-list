export default class Todo {
    constructor(name, notes, date, time, priority) {
        this.name = name;
        this.notes = notes;
        this.date = date;
        this.time = time;
        this.priority = priority.toLowerCase();
        this.status = Status.INCOMPLETE;
        this.id = crypto.randomUUID();
    }

    update(fields) {
        Object.assign(this, fields);
    }
}

export const Status = {
    INCOMPLETE: "incomplete",
    COMPLETE: "complete",
}

export const Priority = {
    LOW: "low",
    MED: "medium",
    HIGH: "high",
}