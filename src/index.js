
import './style.css'
import Projects from './project.js'
import Task from './task.js'
import Tracker from './tracker.js'
import DOMController from './dom-controller.js'
import Events from './events.js'


Projects.addNewProject("Default");
let currentProject = Tracker.getCurrentProject();
currentProject = Projects.projectsList[currentProject];
const currentFilter = Tracker.getCurrentFilter();
const newTask00 = new Task("Water the Plants", "Need to give the plants a good soak.", "2025-09-26", "high", true);
const newTask01 = new Task("Finish Report", "Complete the monthly sales report by EOD.", "2025-09-23", "low", true);
const newTask02 = new Task("Buy Groceries", "Pick up milk, bread, and eggs.", "2025-09-25", "low", false);
newTask00.addToProject(currentProject)
newTask01.addToProject(currentProject)
newTask02.addToProject(currentProject)
DOMController.renderProjectList(Projects.projectsList);
DOMController.renderTasks(currentProject, currentFilter)
Events.initializeEvents();
DOMController.highlightCurrentFilter();
DOMController.highlightCurrentProject()



