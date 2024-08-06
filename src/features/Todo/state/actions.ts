import { ITodo } from "../../../service";
import { TodoActionType as Type} from "./constants";
import { AddTodoAction, UpdateNewTodoAction } from "./types";

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
