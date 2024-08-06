import { getInitialTodos, getEmptyDodo, ITodoEntity } from "../../../service";
import { TodoActionType as Type} from "./constants";
import { ITodoState, ITodoAction, UpdateNewTodoAction, AddTodoAction, ToggleTodoDoneAction } from "./types";
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

    return {
        ...state,
        todoList: newList
    };
}