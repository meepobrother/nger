interface TaskFlags {
    [arg: string]: string;
}
export declare abstract class Task {
    readonly name?: string;
    displayName?: string;
    description?: string;
    flags?: TaskFlags;
    abstract run(done: (error?: any) => void): void;
}
export declare class TaskNotFoundError extends Error {
}
export declare class TaskManager {
    tasks: Task[];
    constructor(tasks: Task[]);
    getTaskByName(name: string): Task | undefined;
    runTaskByName(name: string): Promise<{}>;
}
export {};
