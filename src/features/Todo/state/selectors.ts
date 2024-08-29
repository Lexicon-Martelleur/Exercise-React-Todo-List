import { ITodoEntity } from "../../../service";
import { ITodoState } from "./types";

export function selectID (todoEntity: ITodoEntity): string {
    return todoEntity.id;
}

export function selectDescription (todoEntity: ITodoEntity): string {
    return todoEntity.todo.description;
}

export function selectTitle (todoEntity: ITodoEntity): string {
    return todoEntity.todo.title;
}

export function selectAuthor (todoEntity: ITodoEntity): string {
    return todoEntity.todo.author;
}

export function selectDone (todoEntity: ITodoEntity): boolean {
    return todoEntity.todo.done;
}

export function selectDate (todoEntity: ITodoEntity): string {
    const date = new Date(todoEntity.timestamp)
    return date.toLocaleString();
}

export function selectTodoPage (todoState: ITodoState): number {
    return todoState.todoPagination?.CurrentPage ?? 1;
}

export function selectNrOfTodoPage (todoState: ITodoState): number {
    return todoState.todoPagination?.TotalPageCount ?? 1;
}
