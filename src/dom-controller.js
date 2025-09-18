export default class DOMController {

    static renderProjectList(projectList) {
        const sideBarListElement = document.querySelector('.side-bar-project-list');
        for (let key in projectList) {
            const getProjectName = key;
            const projectElement = document.createElement('li')
            projectElement.textContent = getProjectName;
            sideBarListElement.appendChild(projectElement);
        }
    };
    static renderTasks(project, filter) {
        if (filter === 'all') {
            this.renderAllTasks(project);
        }
    };

    static renderAllTasks(project) {
        project.forEach(e => {
            this.createTaskCard(e.taskName, e.taskDescription, e.date, e.priority, e.completed);
        });
    };

    static createTaskCard(taskName, taskDescription, date, priority, completed) {
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

    static unrenderTasks() {
        const tasksContainer = document.querySelector('.main-content-bottom-section');
        tasksContainer.replaceChildren();
    };
};