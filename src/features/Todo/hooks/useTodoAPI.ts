import { useCallback } from "react";

import { todoApi } from "../../../data";
import {
    addFailedStoredTodosAction,
	addTodoEntitiesAction,
	ITodoAction,
	updateTodoErrorStateAction,
	updateTodoPaginationAction,
} from "../state";
import { getTodoAPI, isDevelopment } from "../../../config";
import { ITodoEntity, todoOperation, TodoOperationType } from "../../../service";

export type TodoAPI = ReturnType<typeof useTodoAPI>

/**
 * A custom hook used as a wrapper for
 * Todo API.
 */
export function useTodoAPI (
    dispatchTodoAction: React.Dispatch<ITodoAction>
) {
    const api = getTodoAPI();

    const handleError = useCallback((
        err: unknown,
        errorMsg: string,
        todo?: ITodoEntity,
        operation?: TodoOperationType
    ) => {
        isDevelopment() && console.log(err);
        dispatchTodoAction(updateTodoErrorStateAction(true, errorMsg));
        if (todo != null && operation != null) {
            dispatchTodoAction(addFailedStoredTodosAction(todo, operation));
        }
    }, [dispatchTodoAction])

    const getTodos = useCallback((
        page: number
    ) => {
        (async () => {
            try {
                const [todoList, paginationData] = await todoApi.getTodos(page);
                dispatchTodoAction(updateTodoPaginationAction(paginationData));
                dispatchTodoAction(addTodoEntitiesAction(todoList));
            } catch (err) {
                dispatchTodoAction(updateTodoPaginationAction(null));
                handleError(err, `Failed fetching todos from from ${api}`);
            }
        })()
    }, [todoApi, dispatchTodoAction, handleError])

    const createTodo = useCallback((
        todo: ITodoEntity,
        page: number
    ) => {
        (async () => {
            try {
                await todoApi.createTodo(todo);
                getTodos(page);
            }
            catch (err) { handleError(
                err, `Failed create todo on ${api}` , todo, todoOperation.CREATE); }
        })()
    }, [todoApi, handleError])

    const deleteTodo = useCallback((
        todo: ITodoEntity,
        page: number
    ) => {
        (async () => {
            try {
                await todoApi.deleteTodo(Number(todo.id));
                getTodos(page);
            }
            catch (err) { handleError(
                err, `Failed delete todo on ${api}`, todo, todoOperation.DELETE); }
        })()
    }, [todoApi, handleError])

    const putTodo = useCallback((todo: ITodoEntity) => {
        (async () => {
            try { await todoApi.putTodo(todo); }
            catch (err) { handleError(
                err, `Failed update todo on ${api}`, todo, todoOperation.PUT); }
        })()
    }, [todoApi, handleError])

    const patchTodoDone = useCallback((todo: ITodoEntity) => {
        (async () => {
            try { await todoApi.patchTodoDone(todo); }
            catch (err) { handleError(
                err, `Failed updated todo done on ${api}`, todo, todoOperation.PATCH); }
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
