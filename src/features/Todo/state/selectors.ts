import { getLocalDateFromUNIXTimestampInSeconds, ITodoEntity, sortByLatestDateFirst } from "../../../service";
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

export function selectNrOfTodoPage (todoState: ITodoState): number {
    return todoState.todoPagination?.TotalPageCount ?? 1;
}

export function selecUniqueFailedTodosFilterstByLatestDate (
    todoState: ITodoState
): ITodoEntity[] {
    return sortByLatestDateFirst([...todoState.remoteFailedTodos]).filter((item, index, array) => 
        index === array.findIndex(arrayItem => arrayItem.id === item.id)
    );
}

export function selecAllRemoteFailedTodos (
    todoState: ITodoState
): ITodoEntity[] {
    return todoState.remoteFailedTodos;
}

export function selecUniqueTodosFilteredByLatestDate (
    todoState: ITodoState
): ITodoEntity[] {
    return sortByLatestDateFirst([
        ...todoState.remoteFailedTodos,
        ...todoState.remoteTodos
    ]).filter((item, index, array) => 
        index === array.findIndex(arrayItem =>
            arrayItem.id === item.id)
    );
}

export function selecTotalNumberOfTodos (
    todoState: ITodoState
): number {
    const tottalItems = todoState.todoPagination?.TotalItemCount;
    return tottalItems
        ? tottalItems
        : [
            ...todoState.remoteFailedTodos,
            ...todoState.remoteTodos
        ].length
}
