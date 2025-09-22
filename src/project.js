export default class Projects {
    static projectsList = {};

    static addNewProject(projectName) {
        this.projectsList[projectName] = [];
    }

    static removeProject(projectName) {
        delete this.projectsList[projectName];
    }

    static getProjectList() {
        return this.projectsList;
    }

    static assignProjectList(projectList) {
        this.projectsList = projectList;
    }
};