import { getNewTodo } from "../../../service";
import { ITodoState } from "./types";

export const todoInitData: ITodoState = {
    newTodo: getNewTodo(),
    latestHandledTodo: null,
    todoPagination: null,
    remoteTodos: [],
    isError: false,
    errorMessage: ""
} as const;
