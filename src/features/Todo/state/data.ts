import { getEmptyDodo } from "../../../service";
import { ITodoState } from "./types";

export const todoInitData: ITodoState = {
    newTodo: getEmptyDodo(),
    latestHandledTodo: null,
    todoPagination: null,
    remoteTodos: [],
    isError: false,
    errorMessage: ""
} as const;
