import { IPaginationData, ITodo, ITodoEntity } from "../../../types";
import { TodoActionType as Type} from "./constants";
import * as TodoState from "./types";

export function updateNewTodoAction (
    todo: ITodo
): TodoState.UpdateNewTodoAction {
    return {
        type: Type.updateNewTodo,
        payload: todo
    };
}

export function addTodoAction (
    id: string,
    timestamp: number,
    todo: ITodo,
): TodoState.AddTodoAction {
    return {
        type: Type.addTodo,
        payload: { id, timestamp, todo }
    };
}

export function addTodoEntitiesAction (
    todos: ITodoEntity[]
): TodoState.AddTodosEntitiesAction {
    return {
        type: Type.addTodoEntities,
        payload: todos
    };
}

export function toggleTodoDoneAction (
    id: string
): TodoState.ToggleTodoDoneAction {
    return {
        type: Type.toggleTodoDone,
        payload: id
    };
}

export function updateTodoDoneAction (
    todo: ITodoEntity
): TodoState.UpdateTodoDoneAction {
    return {
        type: Type.updateTodoDone,
        payload: todo
    };
}

export function removeTodoAction (
    id: string
): TodoState.RemoveTodoAction {
    return {
        type: Type.removeTodo,
        payload: id
    };
}

export function editTodoAction (
    id: string, editedTodo: ITodo
): TodoState.EditTodoAction {
    return {
        type: Type.editTodo,
        payload: { id, editedTodo }
    };
}

export function swapTodoListItemsAction (
    idTodoA: string,
    idTodoB: string
): TodoState.SwapTodoListItems {
    return {
        type: Type.swapTodoListItems,
        payload: { idTodoA, idTodoB }
    };
}

export function updateTodoPaginationAction (
    paginationTodoData: IPaginationData | null
): TodoState.UpdateTodoPaginationAction {
    return {
        type: Type.updateTodoPagination,
        payload: paginationTodoData
    };
}

export function updateTodoErrorStateAction (
    isError: boolean,
    errorMsg = ""
): TodoState.UpdateTodoErroStateAction {
    return {
        type: Type.updateErrorState,
        payload: { isError, errorMsg }
    };
}
