import { ITodo } from "../../../service";
import { TodoActionType as Type} from "./constants";
import {
    AddTodoAction,
    RemoveTodoAction,
    ToggleTodoDoneAction,
    UpdateNewTodoAction
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
