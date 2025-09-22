import Projects from './project.js'
import Task from './task.js'
import Tracker from './tracker.js'
import DOMController from './dom-controller.js'
import storage from './storage.js'

export default class Events {

    static initializeEvents() {
        const closeDialog = document.querySelector('.dialog-close-button');
        closeDialog.addEventListener('click', () => this.closeTaskDialog());

        const addTaskButton = document.querySelector('.add-task-button');
        addTaskButton.addEventListener('click', () => this.openTaskDialog())

        const dialogAddTaskButton = document.querySelector('.dialog-add-task-button');
        dialogAddTaskButton.addEventListener('click', () => this.addUserTask())

        const dialogEditTaskButton = document.querySelector('.dialog-edit-task-button');
        dialogEditTaskButton.addEventListener('click', () => this.handleEditTask())

        const DialogClosePorject = document.querySelector('.dialog-project-close-button');
        DialogClosePorject.addEventListener('click', () => this.closeProjectDialog());

        const addProjectButton = document.querySelector('.add-project-button');
        addProjectButton.addEventListener('click', () => this.openProjectDialog());

        const DialogAddProject = document.querySelector('.dialog-add-project-button');
        DialogAddProject.addEventListener('click', () => this.addUserProject())

        // filters

        const allFilter = document.querySelector('.all-filter');
        allFilter.addEventListener('click', () => this.handleFiltering('all'));

        const todayFilter = document.querySelector('.today-filter');
        todayFilter.addEventListener('click', () => this.handleFiltering('today'));

        const weeklyFilter = document.querySelector('.weekly-filter');
        weeklyFilter.addEventListener('click', () => this.handleFiltering('weekly'));

        const importantFilter = document.querySelector('.important-filter')
        importantFilter.addEventListener('click', () => this.handleFiltering('important'));

        const completedFilter = document.querySelector('.completed-filter')
        completedFilter.addEventListener('click', () => this.handleFiltering('completed'));
    };

    static handleFiltering(filter) {
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        Tracker.updateCurrentFilter(filter);
        DOMController.unrenderTasks();
        DOMController.renderTasks(currentProject, filter);
        DOMController.highlightCurrentFilter();
    };

    // task methods
    static closeTaskDialog() {
        const dialog = document.querySelector('.dialog-container');
        dialog.style.display = 'none';
        DOMController.clearUserTaskInput();
    };

    static openTaskDialog() {
        const dialog = document.querySelector('.dialog-container');
        const dialogEditButton = document.querySelector('.dialog-edit-task-button')
        const dialogAddButton = document.querySelector('.dialog-add-task-button')
        dialogEditButton.style.display = 'none';
        dialogAddButton.style.display = 'inline-block';
        dialog.style.display = 'flex';
    };

    static editTaskDialog() {
        const dialog = document.querySelector('.dialog-container');
        const dialogEditButton = document.querySelector('.dialog-edit-task-button')
        const dialogAddButton = document.querySelector('.dialog-add-task-button')
        dialogEditButton.style.display = 'inline-block';
        dialogAddButton.style.display = 'none';
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
        storage.store();
    };

    static openEditTask(index) {
        this.editTaskDialog();
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        const editedTask = currentProject[index];
        DOMController.populateEditTaskInput(editedTask);
        Tracker.selectEditingTask(editedTask);
    }

    static handleEditTask() {
        const task = Tracker.getCurrentlyEditingTask()
        const userInput = this.getUserTaskInput();
        task.updateTask(userInput.userTaskName, userInput.userTaskDescription, userInput.userTaskDate, userInput.userTaskPriority, userInput.userTaskStatus);
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        const currentFilter = Tracker.getCurrentFilter();
        DOMController.unrenderTasks();
        DOMController.renderTasks(currentProject, currentFilter);
        this.closeTaskDialog();
        storage.store();
    };

    static handleDeleteTask(index) {
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        const currentFilter = Tracker.getCurrentFilter();
        currentProject.splice(index, 1)
        DOMController.unrenderTasks();
        DOMController.renderTasks(currentProject, currentFilter);
        storage.store();
    };

    static handleTaskCheckbox(index) {
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        currentProject[index].completed = !currentProject[index].completed;
        storage.store();
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
        DOMController.highlightCurrentProject();
        DOMController.unrenderTasks();
        DOMController.renderTasks(currentProject, currentFilter);
        this.closeProjectDialog();
        storage.store();
    };

    static handleProjectClick(clickedProject) {
        Tracker.updateCurrentProject(clickedProject)
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        const currentFilter = Tracker.getCurrentFilter();
        DOMController.unrenderTasks();
        DOMController.renderTasks(currentProject, currentFilter);
        DOMController.highlightCurrentProject();
    };

    static handleProjectDelete(projectName) {
        if (Projects.checkIfProjectListEmpty()) {
            alert('Please add New Project Before Attempting to Delete');
            return;
        } else {
            Projects.removeProject(projectName);
            const currentFilter = Tracker.getCurrentFilter();
            const previousProject = Object.keys(Projects.projectsList)[Object.keys(Projects.projectsList).length - 1];
            Tracker.updateCurrentProject(previousProject);
            let currentProject = Tracker.getCurrentProject();
            currentProject = Projects.projectsList[currentProject];
            DOMController.unrenderProjects();
            DOMController.renderProjectList(Projects.projectsList);
            DOMController.highlightCurrentProject();
            DOMController.unrenderTasks();
            DOMController.renderTasks(currentProject, currentFilter);
            storage.store();
        };
    };
};