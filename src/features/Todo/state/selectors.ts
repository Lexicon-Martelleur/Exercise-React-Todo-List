import { getLocalDateFromUNIXTimestampInSeconds, ITodoEntity } from "../../../service";
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
    const date = getLocalDateFromUNIXTimestampInSeconds(todoEntity.timestamp)
    return date.toLocaleString();
}

export function selectTodoPage (todoState: ITodoState): number {
    return todoState.todoPagination?.PageNr ?? 1;
}

export function selectNrOfTodoPages (todoState: ITodoState): number {
    return todoState.todoPagination?.TotalPageCount ?? 1;
}

export function selectAllRemoteTodos (
    todoState: ITodoState
): ITodoEntity[] {
    return todoState.remoteTodos;
}

export function selectNrOfTodoItems (
    todoState: ITodoState
): number {
    return todoState.todoPagination?.TotalItemCount ?? 0;
}
