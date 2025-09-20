export default class Projects {
    static projectsList = {};

    static addNewProject(projectName) {
        this.projectsList[projectName] = [];
    }

    static removeProject(projectName) {
        delete this.projectsList[projectName];
    }

    static checkIfProjectListEmpty() {
        return Object.keys(this.projectsList).length === 1;
    };
};