import { todoOperation } from "./constants";

export type ITodo = Readonly<{
    title: string;
    author: string;
    description: string;
    done: boolean
}>

export type TodoOperationType = typeof todoOperation[
    keyof typeof todoOperation
]

export interface ITodoEntity {
    id: string;
    timestamp: number;
    todo: ITodo;
    failedOperation?: TodoOperationType | null
}

export function isTodoEntity (obj: unknown): obj is ITodoEntity {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const entityObj = obj as ITodoEntity;
    return (
        typeof entityObj.id === "string" &&
        typeof entityObj.timestamp === "number" &&
        (
            Object.values(todoOperation).includes(entityObj.failedOperation as TodoOperationType) ||
            entityObj.failedOperation == null
        ) &&
        isTodo(entityObj.todo) 
    );
}

export function isTodo (obj: unknown): obj is ITodo {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const todoObj = obj as ITodo;
    return (
        typeof todoObj.author === "string" &&
        typeof todoObj.title === "string" &&
        typeof todoObj.description ===  "string" &&
        typeof todoObj.done === "boolean"
    );
}
