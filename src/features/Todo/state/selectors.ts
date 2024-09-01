import * as TodoService from "../../../service";
import { ITodoState } from "./types";

export function selectID (todoEntity: TodoService.ITodoEntity): string {
    return todoEntity.id;
}

export function selectDescription (todoEntity: TodoService.ITodoEntity): string {
    return todoEntity.todo.description;
}

export function selectTitle (todoEntity: TodoService.ITodoEntity): string {
    return todoEntity.todo.title;
}

export function selectAuthor (todoEntity: TodoService.ITodoEntity): string {
    return todoEntity.todo.author;
}

export function selectDone (todoEntity: TodoService.ITodoEntity): boolean {
    return todoEntity.todo.done;
}

export function selectDate (todoEntity: TodoService.ITodoEntity): string {
    const date = TodoService.getLocalDateFromUNIXTimestampInSeconds(todoEntity.timestamp)
    return date.toLocaleString();
}

export function selectRemoteTodos (
    todoState: ITodoState
): TodoService.ITodoEntity[] {
    return todoState.remoteTodos;
}

export function selectLatestTodo(todoState: ITodoState) {
    return todoState.latestHandledTodo;
}

export function selectUniqueTodosWithSynchronisationFlag (
    todoState: ITodoState
): TodoService.ITodoEntity[] {
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
