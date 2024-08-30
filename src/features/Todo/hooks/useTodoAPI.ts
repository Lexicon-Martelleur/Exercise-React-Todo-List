import { useCallback } from "react";

import { todoApi } from "../../../data";
import {
	addTodoEntitiesAction,
	ITodoAction,
	updateTodoErrorStateAction,
	updateTodoPaginationAction,
} from "../state";
import { isDevelopment } from "../../../config";
import { ITodoEntity } from "../../../service";

export type TodoAPI = ReturnType<typeof useTodoAPI>

/**
 * A custom hook used as a wrapper for
 * Todo API.
 */
export function useTodoAPI (dispatchTodoAction: React.Dispatch<ITodoAction>) {

    const handleError = useCallback((
        err: unknown,
        errorMsg: string
    ) => {
        isDevelopment() && console.log(err);
        dispatchTodoAction(updateTodoErrorStateAction(true, errorMsg))
    }, [dispatchTodoAction])

    const getTodos = useCallback((
        page: number,
        cb?: (todoList: ITodoEntity[]) => void
    ) => {
        (async () => {
            try {
                const [todoList, paginationData] = await todoApi.getTodos(page);
                dispatchTodoAction(updateTodoPaginationAction(paginationData));
                dispatchTodoAction(addTodoEntitiesAction(todoList));
                cb && cb(todoList);
            } catch (err) {
                dispatchTodoAction(updateTodoPaginationAction(null));
                handleError(err, "Failed fetching todos from server.");
            }
        })()
    }, [todoApi, dispatchTodoAction, handleError])

    const createTodo = useCallback((
        todo: ITodoEntity
    ) => {
        (async () => {
            try { await todoApi.createTodo(todo); }
            catch (err) { handleError(err, "Failed create todo on server."); }
        })()
    }, [todoApi, handleError])

    const deleteTodo = useCallback((todoId: number) => {
        (async () => {
            try { await todoApi.deleteTodo(todoId); }
            catch (err) { handleError(err, "Failed delete todo on server."); }
        })()
    }, [todoApi, handleError])

    const putTodo = useCallback((todo: ITodoEntity) => {
        (async () => {
            try { await todoApi.putTodo(todo); }
            catch (err) { handleError(err, "Failed update todo on server."); }
        })()
    }, [todoApi, handleError])

    const patchTodoDone = useCallback((todo: ITodoEntity) => {
        (async () => {
            try { await todoApi.patchTodoDone(todo); }
            catch (err) { handleError(err, "Failed updated todo done on server."); }
        })()
    }, [todoApi, handleError])

    return {
        getTodos,
        createTodo,
        deleteTodo,
        putTodo,
        patchTodoDone
    };
}
