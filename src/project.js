export default class Projects {
    static projectsList = {};

    static addNewProject(projectName) {
        this.projectsList[projectName] = [];
    }

    static removeProject(projectName) {
        delete this.projectsList[projectName];
    }
};