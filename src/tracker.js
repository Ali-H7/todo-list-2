import { isToday, isThisWeek } from "date-fns";

export default class Tracker {
    static #currentFilter = 'all';
    static #currentProject = 'Default';
    static #currentlyEditingTask;

    static updateCurrentFilter(filter) {
        this.#currentFilter = filter;
    }

    static updateCurrentProject(project) {
        this.#currentProject = project;
    }

    static getCurrentFilter() {
        return this.#currentFilter;
    }

    static getCurrentProject() {
        return this.#currentProject;
    }

    static selectEditingTask(task) {
        this.#currentlyEditingTask = task;
    };

    static getCurrentlyEditingTask() {
        return this.#currentlyEditingTask;
    }

    static checkIfTaskIsToday(date) {
        return isToday(date);
    };
    static checkIfTaskIsThisWeek(date) {
        return isThisWeek(date);
    };
    static checkIfTaskIsImportant(priority) {
        return priority === 'high';
    };
    static checkIfTaskIsCompleted(status) {
        return status;
    };
};