
import './style.css'
import Projects from './project.js'
import Task from './task.js'
import Tracker from './tracker.js'
import DOMController from './dom-controller.js'
import Events from './events.js'


Projects.addNewProject("Default");
Projects.addNewProject("Math");
Projects.addNewProject("English");
let currentProject = Tracker.getCurrentProject();
currentProject = Projects.projectsList[currentProject];
const currentFilter = Tracker.getCurrentFilter();
console.log(currentProject);

const newTask = new Task("Drink Water", "Drink Water that contains 300ml.", "2025-09-21", "high", false);
const newTask1 = new Task("Finish Report", "Complete the monthly sales report by EOD.", "2025-09-19", "low", true);
const newTask2 = new Task("Finish Report", "Complete the monthly sales report by EOD.", "2025-09-25", "low", true);
newTask.addToProject(currentProject)
newTask1.addToProject(currentProject)
newTask2.addToProject(currentProject)

DOMController.renderProjectList(Projects.projectsList);
DOMController.renderTasks(currentProject, currentFilter)
Events.initializeEvents();




