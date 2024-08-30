import { IPaginationData, ITodo, ITodoEntity, TodoOperationType } from "../../../service";
import { TodoActionType as Type} from "./constants";
import {
    AddTodoAction,
    AddTodosEntitiesAction,
    EditTodoAction,
    RemoveTodoAction,
    SwapTodoListItems,
    ToggleTodoDoneAction,
    AddFailedStoredTodosAction,
    UpdateNewTodoAction,
    UpdateTodoErroStateAction,
    UpdateTodoPaginationAction,
    RemoveAllFailedStoredTodosAction
} from "./types";

export function updateNewTodoAction (todo: ITodo): UpdateNewTodoAction {
    return {
        type: Type.updateNewTodo,
        payload: todo
    };
}

export function addTodoAction (todo: ITodo): AddTodoAction {
    return {
        type: Type.addTodo,
        payload: todo
    };
}

export function addTodoEntitiesAction (
    todos: ITodoEntity[]
): AddTodosEntitiesAction {
    return {
        type: Type.addTodoEntities,
        payload: todos
    };
}

export function toggleTodoDoneAction (id: string): ToggleTodoDoneAction {
    return {
        type: Type.toggleTodoDone,
        payload: id
    };
}

export function removeTodoAction (id: string): RemoveTodoAction {
    return {
        type: Type.removeTodo,
        payload: id
    };
}

export function editTodoAction (
    id: string, editedTodo: ITodo
): EditTodoAction {
    return {
        type: Type.editTodo,
        payload: { id, editedTodo }
    };
}

export function swapTodoListItemsAction (
    idTodoA: string,
    idTodoB: string
): SwapTodoListItems {
    return {
        type: Type.swapTodoListItems,
        payload: { idTodoA, idTodoB }
    };
}

export function updateTodoPaginationAction (
    paginationTodoData: IPaginationData | null
): UpdateTodoPaginationAction {
    return {
        type: Type.updateTodoPagination,
        payload: paginationTodoData
    };
}

export function updateTodoErrorStateAction (
    isError: boolean,
    errorMsg = ""
): UpdateTodoErroStateAction {
    return {
        type: Type.updateErrorState,
        payload: { isError, errorMsg }
    };
}

export function addFailedStoredTodosAction (
    entity: ITodoEntity,
    operation: TodoOperationType
): AddFailedStoredTodosAction {
    return {
        type: Type.addFailedStoredTodos,
        payload: { entity, operation }
    };
}

export function removeAllFailedStoredTodosAction ():
RemoveAllFailedStoredTodosAction {
    return {
        type: Type.removeAllFailedStoredTodos,
        payload: { emptyDodoList: [] }
    };
}
