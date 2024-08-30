import { v4 as uuid } from "uuid";

import { getEmptyDodo, getTodos, ITodoEntity } from "../../../service";
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
    UpdateTodoErroStateAction
} from "./types";

export const todoInitData: ITodoState = {
    newTodo: getEmptyDodo(),
    latestHandledTodo: null,
    todoPagination: null,
    todoList: getTodos(),
    isError: false,
    errorMessage: ""
} as const;

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
    const newTodoEntity: ITodoEntity = {
        id: uuid(),
        todo: action.payload,
        timestamp: Date.now()
    };

    return {
        ...state,
        latestHandledTodo: { ...newTodoEntity },
        todoList: [
            ...state.todoList,
            newTodoEntity
        ]
    };
}

function handleAddTodoEntities (
    action: AddTodosEntitiesAction,
    state: ITodoState
): ITodoState {
    return {
        ...state,
        todoList: [...action.payload]
    };
}

function handleRemoveTodo (
    action: RemoveTodoAction,
    state: ITodoState
): ITodoState {
    const latestHandledTodo = state.todoList.find(entity => (
        entity.id === action.payload
    )) ?? null; 
    
    const todoList: ITodoEntity[] = state.todoList.filter(entity => (
        entity.id !== action.payload
    ));

    return { ...state, latestHandledTodo, todoList };
}

function handleEditTodo (
    action: EditTodoAction,
    state: ITodoState
): ITodoState {
    const todoList: ITodoEntity[] = state.todoList.map(entity => (
        entity.id === action.payload.id
        ? {
            ...entity,
            todo: { ...action.payload.editedTodo }
        }
        : entity
    ));

    const latestHandledTodo = todoList.find(entity => (
        entity.id === action.payload.id
    )) ?? null; 

    console.log('latest', latestHandledTodo)

    return { ...state, latestHandledTodo, todoList };
}

function handleSwapTodoListItems (
    action: SwapTodoListItems,
    state: ITodoState
): ITodoState {
    const todoAIndex = state.todoList.findIndex(entity => entity.id === action.payload.idTodoA);
    const todoBIndex = state.todoList.findIndex(entity => entity.id === action.payload.idTodoB);
    if (todoAIndex === -1 || todoBIndex === -1) { return state; }
    
    const newState = {
        ...state,
        todoList: [...state.todoList]
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
    const todoList: ITodoEntity[] = state.todoList.map(entity => (
        entity.id === action.payload
        ? {
            ...entity,
            todo: { ...entity.todo, done: !entity.todo.done }
        }
        : entity
    ));

    const latestHandledTodo = todoList.find(entity => (
        entity.id === action.payload
    )) ?? null; 

    return { ...state, latestHandledTodo, todoList };
}

function handleUpdateTodoPagination (
    action: UpdateTodoPaginationAction,
    state: ITodoState
) {
    return { ...state, todoPagination: action.payload }
}

function handleUpdateErrorState(
    action: UpdateTodoErroStateAction,
    state: ITodoState
) {
    console.log('action', action)
    return {
        ...state,
        isError: action.payload.isError,
        errorMessage: action.payload.errorMsg
    }
}
