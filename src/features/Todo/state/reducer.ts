import { v4 as uuid } from "uuid";

import { getInitialTodos, getEmptyDodo, ITodoEntity } from "../../../service";
import { TodoActionType as Type} from "./constants";
import {
    ITodoState,
    ITodoAction,
    UpdateNewTodoAction,
    AddTodoAction,
    ToggleTodoDoneAction,
    RemoveTodoAction,
    EditTodoAction,
    SwapTodoListItems
} from "./types";

export const todoInitData: ITodoState = {
    newTodo: getEmptyDodo(),
    todoList: getInitialTodos()
} as const;

export function todoReducer (
    state: ITodoState,
    action: ITodoAction
): ITodoState {
    switch(action.type) {
        case Type.updateNewTodo: return handleNewTodoAction(action, state);
        case Type.addTodo: return handleAddTodo(action, state);
        case Type.removeTodo: return handleRemoveTodo(action, state);
        case Type.editTodo: return handleEditTodo(action, state);
        case Type.swapTodoListItems: return handleSwapTodoListItems(action, state);
        case Type.toggleTodoDone: return handleToggleTodoDone(action, state);
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
        todoList: [
            ...state.todoList,
            newTodoEntity
        ]
    };
}

function handleRemoveTodo (
    action: RemoveTodoAction,
    state: ITodoState
): ITodoState {
    const newList: ITodoEntity[] = state.todoList.filter(entity => (
        entity.id !== action.payload
    ));

    return { ...state, todoList: newList };
}

function handleEditTodo (
    action: EditTodoAction,
    state: ITodoState
): ITodoState {
    const newList: ITodoEntity[] = state.todoList.map(entity => (
        entity.id === action.payload.id
        ? {
            ...entity,
            todo: { ...action.payload.editedTodo }
        }
        : entity
    ));

    return { ...state, todoList: newList };
}

function handleSwapTodoListItems (
    action: SwapTodoListItems,
    state: ITodoState
): ITodoState {
    const todoA = state.todoList.find(entity => entity.id === action.payload.idTodoA);
    const todoB = state.todoList.find(entity => entity.id === action.payload.idTodoB);
    if (todoA == null || todoB == null) { return state; }

    const newList: ITodoEntity[] = state.todoList.map(entity => {
        if (entity.id === todoA.id) { return todoB; }
        else if (entity.id === todoB.id) { return todoA; }
        else { return entity; }
    })

    return { ...state, todoList: newList }
}

function handleToggleTodoDone (
    action: ToggleTodoDoneAction,
    state: ITodoState
): ITodoState {
    const newList: ITodoEntity[] = state.todoList.map(entity => (
        entity.id === action.payload
        ? {
            ...entity,
            todo: { ...entity.todo, done: !entity.todo.done }
        }
        : entity
    ));

    return { ...state, todoList: newList };
}