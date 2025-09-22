import Projects from "./project";
import Tracker from "./tracker";
import Task from './task.js'
import DOMController from './dom-controller.js'
import Events from './events.js'

export default class storage {
    static store() {
        const projectList = Projects.getProjectList();
        const currentFilter = Tracker.getCurrentFilter();
        const currentProject = Tracker.getCurrentProject();
        const visitStatus = Tracker.checkIfUserVisitedBefore();
        localStorage.setItem('projectList', JSON.stringify(projectList));
        localStorage.setItem('currentFilter', currentFilter);
        localStorage.setItem('currentProject', currentProject);
        localStorage.setItem('visitStatus', visitStatus);
    };

    static retreive() {
        const visitStatus = localStorage.getItem('visitStatus');
        if (visitStatus) {
            const projectList = JSON.parse(localStorage.getItem('projectList'));
            const currentFilter = localStorage.getItem('currentFilter');
            const currentProject = localStorage.getItem('currentProject');
            Projects.assignProjectList(projectList);
            Tracker.updateCurrentFilter(currentFilter);
            Tracker.updateCurrentProject(currentProject);
            console.log('working!');
        } else {
            Projects.addNewProject("Default");
            let currentProject = Tracker.getCurrentProject();
            currentProject = Projects.projectsList[currentProject];
            const newTask00 = new Task("Water the Plants", "Need to give the plants a good soak.", "2025-09-26", "high", true);
            const newTask01 = new Task("Finish Report", "Complete the monthly sales report by EOD.", "2025-09-23", "low", true);
            const newTask02 = new Task("Buy Groceries", "Pick up milk, bread, and eggs.", "2025-09-25", "low", false);
            newTask00.addToProject(currentProject);
            newTask01.addToProject(currentProject);
            newTask02.addToProject(currentProject);
            Tracker.markUserVisited();
            this.store();
        };
        DOMController.renderProjectList(Projects.projectsList);
        const currentFilter = Tracker.getCurrentFilter();
        let currentProject = Tracker.getCurrentProject();
        currentProject = Projects.projectsList[currentProject];
        DOMController.renderTasks(currentProject, currentFilter)
        Events.initializeEvents();
        DOMController.highlightCurrentFilter();
        DOMController.highlightCurrentProject();
    };
}