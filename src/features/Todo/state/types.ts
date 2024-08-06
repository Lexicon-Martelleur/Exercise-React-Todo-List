import { ITodo, ITodoEntity } from "../../../service";
import { TodoActionType } from "./constants";

export type ITodoState = Readonly<{
    newTodo: ITodo
    todoList: Readonly<Readonly<ITodoEntity>>[]
}>;

export interface UpdateNewTodoAction {
    type: typeof TodoActionType.updateNewTodo;
    payload: ITodo;
}

export interface AddTodoAction {
    type: typeof TodoActionType.addTodo;
    payload: ITodo;
}

export type ITodoAction = (
    UpdateNewTodoAction |
    AddTodoAction
);
