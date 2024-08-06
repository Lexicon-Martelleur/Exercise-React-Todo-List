import { getInitialTodos, getEmptyDodo } from "../../../service";
import { TodoActionType as Type} from "./constants";
import { ITodoState, ITodoAction } from "./types";
import { v4 as uuid } from "uuid";

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
        default: return state;
    }
}

function handleNewTodoAction (
    action: ITodoAction,
    state: ITodoState
): ITodoState {
    return {
        ...state,
        newTodo: action.payload
    };
}

function handleAddTodo (
    action: ITodoAction,
    state: ITodoState
): ITodoState {
    const newTodoEntity = {
        id: uuid(),
        todo: action.payload
    };
    return {
        ...state,
        todoList: [
            ...state.todoList,
            newTodoEntity
        ]
    };
}