import { Inject } from '../decorators/inject';
interface TaskFlags {
    [arg: string]: string;
}
export abstract class Task {
    readonly name?: string;
    displayName?: string;
    description?: string;
    flags?: TaskFlags;
    abstract run(done: (error?: any) => void): void;
}
export class TaskNotFoundError extends Error { }
export class TaskManager {
    constructor(@Inject(Task) public tasks: Task[]) { }
    getTaskByName(name: string): Task | undefined {
        return this.tasks.find(task => task.name === name)
    }
    runTaskByName(name: string) {
        return new Promise((resolve, reject) => {
            const task = this.getTaskByName(name);
            if (task) {
                task.run((error) => {
                    if (error) return reject(error);
                    return resolve();
                })
            } else {
                return reject(new TaskNotFoundError(`${name}`))
            }
        })
    }
}