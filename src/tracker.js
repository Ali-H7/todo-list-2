export default class Tracker {
    static #currentFilter = 'all';
    static #currentProject = 'Default';
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
};