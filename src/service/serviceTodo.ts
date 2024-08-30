import { ITodo, ITodoEntity } from "./types";
import { todoStorage } from "../data/todoStorage";

export function getEmptyDodo (): ITodo {
    return todoStorage.getNewTodo();
}

export function sortByAuthor (todoList: ITodoEntity[]): ITodoEntity[] {
    return todoList.slice().sort((a, b) => {
        const authorA = a.todo.author;
        const authorB = b.todo.author;
        return authorA.localeCompare(authorB);
    });
}

export function sortByDate (todoList: ITodoEntity[]): ITodoEntity[] {
    return todoList.slice().sort((a, b) => {
        const dateA = a.timestamp;
        const dateB = b.timestamp;
        if (dateA < dateB) { return -1; }
        else if (dateA > dateB) { return 1; }
        else { return 0; }
    });
}

export function getFailedRemoteStoredTodos (): ITodoEntity[] {
    return todoStorage.getFailedRemoteStoredTodos();
}

export function storeFailedRemoteStoredTodo (todo: ITodoEntity): void {
    todoStorage.saveFailedRemoteStoredTodo(todo);
}

export function storeNewTodo (newTodo: ITodo): void {
    todoStorage.saveNewTodo(newTodo);
}

export function getUNIXTimestampInSeconds (): number {
    return Math.floor(Date.now() / 1000);
}
