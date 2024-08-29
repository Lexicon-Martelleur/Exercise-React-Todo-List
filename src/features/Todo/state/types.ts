import { IPaginationMetaData, ITodo, ITodoEntity } from "../../../service";
import { TodoActionType } from "./constants";

export type ITodoState = Readonly<{
    newTodo: ITodo
    latestHandledTodo: ITodoEntity | null
    todoPagination: IPaginationMetaData | null
    todoList: Readonly<Readonly<ITodoEntity>>[]
    isError: boolean
    errorMessage: string 
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

export interface UpdateTodoPaginationAction {
    type: typeof TodoActionType.updateTodoPagination;
    payload: IPaginationMetaData | null;
}

export interface UpdateTodoErroStateAction {
    type: typeof TodoActionType.updateErrorState;
    payload: { isError: boolean, errorMsg: string };
}

export type ITodoAction = (
    UpdateNewTodoAction |
    AddTodoAction |
    AddTodosEntitiesAction |
    ToggleTodoDoneAction |
    RemoveTodoAction |
    EditTodoAction |
    SwapTodoListItems |
    UpdateTodoPaginationAction |
    UpdateTodoErroStateAction
);
