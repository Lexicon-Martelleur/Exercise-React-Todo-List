import { ITodo, ITodoEntity } from "../../../service";
import { TodoActionType } from "./constants";

export type ITodoState = Readonly<{
    newTodo: ITodo
    latestHandledTodo: ITodoEntity | null
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

export interface AddTodosEntitiesAction {
    type: typeof TodoActionType.addTodoEntities;
    payload: ITodoEntity[];
}

export interface ToggleTodoDoneAction {
    type: typeof TodoActionType.toggleTodoDone;
    payload: string;
}

export interface RemoveTodoAction {
    type: typeof TodoActionType.removeTodo;
    payload: string;
}

export interface EditTodoAction {
    type: typeof TodoActionType.editTodo;
    payload: { id: string, editedTodo: ITodo };
}

export interface SwapTodoListItems {
    type: typeof TodoActionType.swapTodoListItems;
    payload: { idTodoA: string, idTodoB: string };
}

export type ITodoAction = (
    UpdateNewTodoAction |
    AddTodoAction |
    AddTodosEntitiesAction |
    ToggleTodoDoneAction |
    RemoveTodoAction |
    EditTodoAction |
    SwapTodoListItems
);
