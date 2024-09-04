import { getLocalDateFromUNIXTimestampInSeconds } from "../../../service";
import { ITodoEntity } from "../../../types";
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

export function selectRemoteTodos (
    todoState: ITodoState
): ITodoEntity[] {
    return todoState.remoteTodos;
}

export function selectLatestTodo(todoState: ITodoState) {
    return todoState.latestHandledTodo;
}

export function selectUniqueTodosWithSynchronisationFlag (
    todoState: ITodoState
): ITodoEntity[] {
    return todoState.remoteTodos
}

export function selectTodoPage (todoState: ITodoState): number {
    return todoState.todoPagination?.PageNr ?? 1;
}

export function selectNrOfTodoItems (
    todoState: ITodoState
): number {
    return todoState.todoPagination?.TotalItemCount ?? 0;
}

export function selectNrOfTodoPages (todoState: ITodoState): number {
    return todoState.todoPagination?.TotalPageCount ?? 1;
}
