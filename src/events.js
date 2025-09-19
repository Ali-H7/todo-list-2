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

        const DialogClosePorject = document.querySelector('.dialog-project-close-button');
        DialogClosePorject.addEventListener('click', () => this.closeProjectDialog());

        const addProjectButton = document.querySelector('.add-project-button');
        addProjectButton.addEventListener('click', () => this.openProjectDialog());

        const DialogAddProject = document.querySelector('.dialog-add-project-button');
        DialogAddProject.addEventListener('click', () => this.addUserProject())
    };

    // task methods
    static closeTaskDialog() {
        const dialog = document.querySelector('.dialog-container');
        dialog.style.display = 'none';
        DOMController.clearUserTaskInput();
    };

    static openTaskDialog() {
        const dialog = document.querySelector('.dialog-container');
        dialog.style.display = 'flex';
    };

    static getUserTaskInput() {
        let userTaskName = document.querySelector('#dialog-add-task-name').value;
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
        DOMController.clearUserTaskInput()
        this.closeTaskDialog();
    };

    static handleDeleteTask(index) {
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        const currentFilter = Tracker.getCurrentFilter();
        currentProject.splice(index, 1)
        DOMController.unrenderTasks();
        DOMController.renderTasks(currentProject, currentFilter);
    };

    // project methods 
    static closeProjectDialog() {
        const dialog = document.querySelector('.add-project-dialog-container');
        dialog.style.display = 'none';
        DOMController.clearProjectInput();
    };

    static openProjectDialog() {
        const dialog = document.querySelector('.add-project-dialog-container');
        dialog.style.display = 'flex';
    };

    static addUserProject() {
        const userProjectNameInput = document.querySelector('#dialog-add-project-name').value;
        Projects.addNewProject(userProjectNameInput);
        Tracker.updateCurrentProject(userProjectNameInput);
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        const currentFilter = Tracker.getCurrentFilter();
        DOMController.clearProjectInput();
        DOMController.unrenderProjects();
        DOMController.renderProjectList(Projects.projectsList);
        DOMController.unrenderTasks();
        DOMController.renderTasks(currentProject, currentFilter);
        this.closeProjectDialog();
    };

    static handleProjectClick(clickedProject) {
        Tracker.updateCurrentProject(clickedProject)
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        const currentFilter = Tracker.getCurrentFilter();
        DOMController.unrenderTasks();
        DOMController.renderTasks(currentProject, currentFilter);
    };
};