import Projects from './project.js'
import Task from './task.js'
import Tracker from './tracker.js'
import DOMController from './dom-controller.js'

export default class Events {

    static initializeEvents() {
        const closeDialog = document.querySelector('.dialog-close-button');
        closeDialog.addEventListener('click', () => this.closeTaskDialog());

        const addTaskButton = document.querySelector('.add-task-button');
        addTaskButton.addEventListener('click', () => this.openTaskDialog())

        const DialogAddTaskButton = document.querySelector('.dialog-add-task-button');
        DialogAddTaskButton.addEventListener('click', () => this.addUserTask())
    };

    static closeTaskDialog() {
        const dialog = document.querySelector('.dialog-container');
        dialog.style.display = 'none';
    };

    static openTaskDialog() {
        const dialog = document.querySelector('.dialog-container');
        dialog.style.display = 'flex';
    };

    static getUserTaskInput() {
        const userTaskName = document.querySelector('#dialog-add-task-name').value;
        const userTaskDescription = document.querySelector('#dialog-add-task-description').value;
        const userTaskDate = document.querySelector('#dialog-task-date').value;
        const userTaskPriority = document.querySelector('input[name="priority"]:checked').value;
        const userTaskStatus = document.querySelector('#dialog-task-checkbox').checked
        return { userTaskName, userTaskDescription, userTaskDate, userTaskPriority, userTaskStatus };
    };

    static addUserTask() {
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        const currentFilter = Tracker.getCurrentFilter();
        const userInput = this.getUserTaskInput();
        const newTask = new Task(userInput.userTaskName, userInput.userTaskDescription, userInput.userTaskDate, userInput.userTaskPriority, userInput.userTaskStatus);
        newTask.addToProject(currentProject);
        DOMController.unrenderTasks();
        DOMController.renderTasks(currentProject, currentFilter);
    };
};