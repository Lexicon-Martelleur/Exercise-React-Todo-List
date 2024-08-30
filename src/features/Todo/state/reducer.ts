import { v4 as uuid } from "uuid";

import { getUNIXTimestampInSeconds, ITodoEntity } from "../../../service";
import { TodoActionType as Type } from "./constants";
import {
    ITodoState,
    ITodoAction,
    UpdateNewTodoAction,
    AddTodoAction,
    ToggleTodoDoneAction,
    RemoveTodoAction,
    EditTodoAction,
    SwapTodoListItems,
    AddTodosEntitiesAction,
    UpdateTodoPaginationAction,
    UpdateTodoErroStateAction,
    AddFailedStoredTodosAction
} from "./types";

export function todoReducer (
    state: ITodoState,
    action: ITodoAction
): ITodoState {
    switch(action.type) {
        case Type.updateNewTodo: return handleNewTodoAction(action, state);
        case Type.addTodo: return handleAddTodo(action, state);
        case Type.addTodoEntities: return handleAddTodoEntities(action, state);
        case Type.removeTodo: return handleRemoveTodo(action, state);
        case Type.editTodo: return handleEditTodo(action, state);
        case Type.swapTodoListItems: return handleSwapTodoListItems(action, state);
        case Type.toggleTodoDone: return handleToggleTodoDone(action, state);
        case Type.updateTodoPagination: return handleUpdateTodoPagination(action, state);
        case Type.updateErrorState: return handleUpdateErrorState(action, state);
        case Type.addFailedStoredTodos: return handleAddFailedStoredTodos(action, state);
        default: return state;
    }
}

function handleNewTodoAction (
    action: UpdateNewTodoAction,
    state: ITodoState
): ITodoState {
    return {
        ...state,
        newTodo: action.payload
    };
}

function handleAddTodo (
    action: AddTodoAction,
    state: ITodoState
): ITodoState {
    const latestHandledTodo: ITodoEntity = {
        id: uuid(),
        todo: action.payload,
        timestamp: getUNIXTimestampInSeconds()
    };

    return {
        ...state,
        latestHandledTodo: latestHandledTodo,
    };
}

function handleAddTodoEntities (
    action: AddTodosEntitiesAction,
    state: ITodoState
): ITodoState {
    return {
        ...state,
        remoteTodos: [...action.payload]
    };
}

function handleRemoveTodo (
    action: RemoveTodoAction,
    state: ITodoState
): ITodoState {
    let latestHandledTodo = state.remoteTodos.find(entity => (
        entity.id === action.payload
    )) ?? null;

    if (latestHandledTodo != null) {
        latestHandledTodo = {
            ...latestHandledTodo,
            timestamp: getUNIXTimestampInSeconds()
        };
    }
    
    const remoteTodos: ITodoEntity[] = state.remoteTodos.filter(todo => (
        todo.id !== action.payload
    ));

    return { ...state, latestHandledTodo, remoteTodos };
}

function handleEditTodo (
    action: EditTodoAction,
    state: ITodoState
): ITodoState {
    const remoteTodos: ITodoEntity[] = state.remoteTodos.map(todo => (
        todo.id === action.payload.id
        ? {
            ...todo,
            timestamp: getUNIXTimestampInSeconds(),
            todo: { ...action.payload.editedTodo }
        }
        : todo
    ));

    const latestHandledTodo = remoteTodos.find(todo => (
        todo.id === action.payload.id
    )) ?? null; 

    return { ...state, latestHandledTodo, remoteTodos };
}

function handleSwapTodoListItems (
    action: SwapTodoListItems,
    state: ITodoState
): ITodoState {
    const todoAIndex = state.remoteTodos.findIndex(todo => (
        todo.id === action.payload.idTodoA));

    const todoBIndex = state.remoteTodos.findIndex(todo => (
        todo.id === action.payload.idTodoB));
    
    if (todoAIndex === -1 || todoBIndex === -1) { return state; }
    
    const newState = {
        ...state,
        todoList: [...state.remoteTodos]
    };

    [
        newState.todoList[todoAIndex],
        newState.todoList[todoBIndex]
    ] = [newState.todoList[todoBIndex], newState.todoList[todoAIndex]];

    return newState;
}

function handleToggleTodoDone (
    action: ToggleTodoDoneAction,
    state: ITodoState
): ITodoState {
    const remoteTodos: ITodoEntity[] = state.remoteTodos.map(todoEntity => (
        todoEntity.id === action.payload
        ? {
            ...todoEntity,
            timestamp: getUNIXTimestampInSeconds(),
            todo: { ...todoEntity.todo, done: !todoEntity.todo.done }
        }
        : todoEntity
    ));

    const latestHandledTodo = remoteTodos.find(todo => (
        todo.id === action.payload
    )) ?? null; 

    return { ...state, latestHandledTodo, remoteTodos };
}

function handleUpdateTodoPagination (
    action: UpdateTodoPaginationAction,
    state: ITodoState
) {
    return { ...state, todoPagination: action.payload }
}

function handleUpdateErrorState (
    action: UpdateTodoErroStateAction,
    state: ITodoState
) {
    return {
        ...state,
        isError: action.payload.isError,
        errorMessage: action.payload.errorMsg
    }
}

function handleAddFailedStoredTodos (
    action: AddFailedStoredTodosAction,
    state: ITodoState
) {
    action.payload.entity
    const failedTodo = {
        ...action.payload.entity,
        failedOperation: action.payload.operation
    }

    return {
        ...state,
        latestHandledTodo: failedTodo,
        timestamp: getUNIXTimestampInSeconds(),
        remoteFailedTodos: [
            ...state.remoteFailedTodos,
            failedTodo
        ]
    }
}