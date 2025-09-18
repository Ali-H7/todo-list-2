export default class Task {
    constructor(taskName, taskDescription, date, priority, completed) {
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.date = date;
        this.priority = priority;
        this.completed = completed;
    }

    addToProject(project) {
        project.push(this);
    };
}; 