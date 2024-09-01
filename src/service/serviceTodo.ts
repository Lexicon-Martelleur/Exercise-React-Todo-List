import { ITodo, ITodoEntity } from "./types";
import { todoStorage } from "../data/todoStorage";
import { isDevelopment } from "../config";

export function getEmptyTodo (): ITodo {
    return {
        title: isDevelopment() ? "Task Title" : "",
        author: isDevelopment() ? "Author" : "",
        description: isDevelopment() ? "Description" : "",
        done: false
    };
}

export function sortByAuthor (todoList: ITodoEntity[]): ITodoEntity[] {
    return todoList.slice().sort((a, b) => {
        const authorA = a.todo.author;
        const authorB = b.todo.author;
        return authorA.localeCompare(authorB);
    });
}

export function sortByOldestDateFirst (todoList: ITodoEntity[]): ITodoEntity[] {
    return todoList.slice().sort((a, b) => {
        const dateA = a.timestamp;
        const dateB = b.timestamp;
        if (dateA < dateB) { return -1; }
        else if (dateA > dateB) { return 1; }
        else { return 0; }
    });
}

export function sortByLatestDateFirst (todoList: ITodoEntity[]): ITodoEntity[] {
    return todoList.slice().sort((a, b) => {
        const dateA = a.timestamp;
        const dateB = b.timestamp;
        if (dateA > dateB) { return -1; }
        else if (dateA < dateB) { return 1; }
        else { return 0; }
    });
}

export function getNewTodo (): ITodo {
    return todoStorage.getNewTodo();
}

export function getFailedRemoteStoredTodos (): ITodoEntity[] {
    return todoStorage.getFailedRemoteStoredTodos();
}

export function storeFailedRemoteStoredTodo (todo: ITodoEntity): void {
    todoStorage.saveFailedRemoteStoredTodo(todo);
}

export function emptyFailedRemoteStoredTodo (): void {
    todoStorage.emptyFailedRemoteStoredTodo();
}

export function storeNewTodo (newTodo: ITodo): void {
    todoStorage.saveNewTodo(newTodo);
}

export function getUNIXTimestampInSeconds (): number {
    return Math.floor(Date.now() / 1000);
}

export function getLocalDateFromUNIXTimestampInSeconds (timestamp: number): Date {
    return new Date(timestamp * 1000);
}
