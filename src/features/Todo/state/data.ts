import { getEmptyDodo, getFailedRemoteStoredTodos } from "../../../service";
import { ITodoState } from "./types";

export const todoInitData: ITodoState = {
    newTodo: getEmptyDodo(),
    latestHandledTodo: null,
    todoPagination: null,
    remoteTodos: [],
    remoteFailedTodos: getFailedRemoteStoredTodos(),
    isError: false,
    errorMessage: ""
} as const;
