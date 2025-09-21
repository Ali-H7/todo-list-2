import { format } from "date-fns";
import Events from './events.js'
import Tracker from './tracker.js';

export default class DOMController {

    static renderProjectList(projectList) {
        const sideBarListElement = document.querySelector('.side-bar-project-list');
        for (let key in projectList) {
            const getProjectName = key;
            const projectElementContainer = document.createElement('div');
            projectElementContainer.classList.add('project-element-container')
            const projectElement = document.createElement('li')
            projectElement.addEventListener('click', () => Events.handleProjectClick(getProjectName));
            projectElement.textContent = getProjectName;
            const projectDeleteButton = document.createElement('button')
            // work from here
            projectDeleteButton.addEventListener('click', () => Events.handleProjectDelete(getProjectName));
            projectDeleteButton.textContent = 'Delete';
            sideBarListElement.appendChild(projectElementContainer);
            projectElementContainer.appendChild(projectElement);
            projectElementContainer.appendChild(projectDeleteButton);
        }
    };
    static renderTasks(project, filter) {
        this.updateProjectName();
        if (filter === 'all') {
            this.renderAllTasks(project);
        } else if (filter === 'today') {
            this.renderTodayTasks(project);
        } else if (filter === 'weekly') {
            this.renderThisWeekTasks(project);
        } else if (filter === 'important') {
            this.renderImportantTasks(project);
        } else if (filter === 'completed') {
            this.renderCompletedTasks(project);
        };
    };

    static renderAllTasks(project) {
        project.forEach((e, i) => {
            this.createTaskCard(e.taskName, e.taskDescription, e.date, e.priority, e.completed, i);
        });
    };

    static renderTodayTasks(project) {
        const filteredTasks = project.map((task, index) => ({ task, index })).filter((e) => Tracker.checkIfTaskIsToday(e.task.date));
        filteredTasks.forEach((e) => {
            this.createTaskCard(e.task.taskName, e.task.taskDescription, e.task.date, e.task.priority, e.task.completed, e.index);
        });
    };

    static renderThisWeekTasks(project) {
        const filteredTasks = project.map((task, index) => ({ task, index })).filter((e) => Tracker.checkIfTaskIsThisWeek(e.task.date));
        filteredTasks.forEach((e) => {
            this.createTaskCard(e.task.taskName, e.task.taskDescription, e.task.date, e.task.priority, e.task.completed, e.index);
        });
    };

    static renderImportantTasks(project) {
        const filteredTasks = project.map((task, index) => ({ task, index })).filter((e) => Tracker.checkIfTaskIsImportant(e.task.priority));
        filteredTasks.forEach((e) => {
            this.createTaskCard(e.task.taskName, e.task.taskDescription, e.task.date, e.task.priority, e.task.completed, e.index);
        });
    };

    static renderCompletedTasks(project) {
        const filteredTasks = project.map((task, index) => ({ task, index })).filter((e) => Tracker.checkIfTaskIsCompleted(e.task.completed));
        filteredTasks.forEach((e) => {
            this.createTaskCard(e.task.taskName, e.task.taskDescription, e.task.date, e.task.priority, e.task.completed, e.index);
        });
    };

    static createTaskCard(taskName, taskDescription, date, priority, completed, index) {
        date = format(new Date(date), "iiii do MMMM u");
        const cardContainer = document.querySelector('.main-content-bottom-section')
        const taskCardElement = document.createElement('div');
        const taskNameContainerElement = document.createElement('div');
        const taskDescriptionElement = document.createElement('div');
        const taskDateElement = document.createElement('div');
        const taskButtonsContainerElement = document.createElement('div');
        const checkBoxElement = document.createElement('input');
        const taskNameElement = document.createElement('div');
        const editTaskButton = document.createElement('button');
        const deleteTaskButton = document.createElement('button');

        taskCardElement.classList.add('task-card');
        taskNameContainerElement.classList.add('task-name-container');
        taskDescriptionElement.classList.add('task-description');
        taskDateElement.classList.add('task-date');
        taskButtonsContainerElement.classList.add('buttons');
        taskNameElement.classList.add('task-name');
        editTaskButton.classList.add('edit-task-button');
        deleteTaskButton.classList.add('delete-task-button');


        taskNameElement.textContent = taskName;
        taskDescriptionElement.textContent = taskDescription;
        taskDateElement.textContent = date;
        editTaskButton.textContent = 'Edit';
        deleteTaskButton.textContent = 'Delete';
        deleteTaskButton.addEventListener('click', () => Events.handleDeleteTask(index));


        checkBoxElement.type = 'checkbox';
        if (completed) {
            checkBoxElement.checked = true
        } else {
            checkBoxElement.checked = false
        };

        cardContainer.appendChild(taskCardElement);
        taskCardElement.appendChild(taskNameContainerElement);
        taskCardElement.appendChild(taskDescriptionElement);
        taskCardElement.appendChild(taskDateElement);
        taskCardElement.appendChild(taskButtonsContainerElement);
        taskNameContainerElement.appendChild(checkBoxElement);
        taskNameContainerElement.appendChild(taskNameElement);
        taskButtonsContainerElement.appendChild(editTaskButton);
        taskButtonsContainerElement.appendChild(deleteTaskButton);
    };

    static updateProjectName() {
        const projectNameElement = document.querySelector('.project-name');
        const projectName = Tracker.getCurrentProject();
        projectNameElement.textContent = `${projectName} Project`;
    }

    static unrenderTasks() {
        const tasksContainer = document.querySelector('.main-content-bottom-section');
        tasksContainer.replaceChildren();
    };

    static clearUserTaskInput() {
        document.querySelector('#dialog-add-task-name').value = "";
        document.querySelector('#dialog-add-task-description').value = "";
        document.querySelector('#dialog-task-date').value = "";
        const checkedPriority = document.querySelector('input[name="priority"]:checked');
        if (checkedPriority) checkedPriority.checked = false;
        document.querySelector('#dialog-task-checkbox').checked = false;
    }

    static unrenderProjects() {
        const projectContainer = document.querySelector(".side-bar-project-list");
        projectContainer.replaceChildren();
    };

    static clearProjectInput() {
        document.querySelector('#dialog-add-project-name').value = "";
    };

    // static handleEmptyProjectList() {
    //     const mainContentElemet = document.querySelector('.main-content');
    //     mainContentElemet.replaceChildren();
    //     const emptyProjectListMsg = document.createElement('div');
    //     emptyProjectListMsg.classList.add('empty-project')
    //     emptyProjectListMsg.textContent = ('The Project List is Empty, please add your own Project!');
    //     mainContentElemet.appendChild(emptyProjectListMsg);
    // };
};