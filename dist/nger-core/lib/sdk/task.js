"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inject_1 = require("../decorators/inject");
class Task {
}
exports.Task = Task;
class TaskNotFoundError extends Error {
}
exports.TaskNotFoundError = TaskNotFoundError;
let TaskManager = class TaskManager {
    constructor(tasks) {
        this.tasks = tasks;
    }
    getTaskByName(name) {
        return this.tasks.find(task => task.name === name);
    }
    runTaskByName(name) {
        return new Promise((resolve, reject) => {
            const task = this.getTaskByName(name);
            if (task) {
                task.run((error) => {
                    if (error)
                        return reject(error);
                    return resolve();
                });
            }
            else {
                return reject(new TaskNotFoundError(`${name}`));
            }
        });
    }
};
TaskManager = tslib_1.__decorate([
    tslib_1.__param(0, inject_1.Inject(Task)),
    tslib_1.__metadata("design:paramtypes", [Array])
], TaskManager);
exports.TaskManager = TaskManager;
