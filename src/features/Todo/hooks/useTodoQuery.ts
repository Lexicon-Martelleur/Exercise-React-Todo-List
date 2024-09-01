import { useCallback, useState } from "react";

import { todoApi } from "../../../data";
import * as TodoState from "../state";
import { getTodoAPI, isDevelopment } from "../../../config";
import * as TodoService from "../../../service";

export type TodoAPI = ReturnType<typeof useTodoQuery>

/**
 * A custom hook used as a wrapper for
 * Todo API and a data synchronizer bewteen
 * remote and local data.
 */
export function useTodoQuery (
    dispatchTodoAction: React.Dispatch<TodoState.ITodoAction>
) {
    const [pending, setPending] = useState(false);

    const api = getTodoAPI();

    const handleError = useCallback((
        err: unknown,
        errorMsg: string,
        todo?: TodoService.ITodoEntity,
        operation?: TodoService.TodoOperationType
    ) => {
        isDevelopment() && console.log(err);
        dispatchTodoAction(TodoState.updateTodoErrorStateAction(true, errorMsg));
        if (todo != null && operation != null) {
            todo.failedOperation = operation;
            TodoService.storeFailedRemoteStoredTodo(todo);
        }
    }, [dispatchTodoAction])

    const getTodos = useCallback((
        page: number
    ) => {
        setPending(true);
        (async () => {
            try {
                const [todoList, paginationData] = await todoApi.getTodos(page);
                dispatchTodoAction(TodoState.updateTodoPaginationAction(paginationData));
                dispatchTodoAction(TodoState.addTodoEntitiesAction(todoList));
            } catch (err) {
                dispatchTodoAction(TodoState.updateTodoPaginationAction(null));
                handleError(err, `Failed fetching todos from from ${api}`);
            }
        })()
        setPending(false);
    }, [todoApi, dispatchTodoAction, handleError])

    const createTodo = useCallback((
        todo: TodoService.ITodoEntity,
        page: number
    ) => {
        setPending(true);
        (async () => {
            try {
                await todoApi.createTodo(todo);
                getTodos(page);
            }
            catch (err) {
                getTodos(page);
                handleError(err, `Failed create todo on ${api}`, todo, TodoService.todoOperation.CREATE); }
        })()
        setPending(false);
    }, [todoApi, handleError])

    const deleteTodo = useCallback((
        todo: TodoService.ITodoEntity,
        page: number
    ) => {
        setPending(true);
        (async () => {
            try {
                await todoApi.deleteTodo(Number(todo.id));
                getTodos(page);
            }
            catch (err) { 
                getTodos(page);
                handleError(err, `Failed delete todo on ${api}`, todo, TodoService.todoOperation.DELETE); }
        })()
        setPending(false)        
    }, [todoApi, handleError])

    const putTodo = useCallback((todo: TodoService.ITodoEntity) => {
        setPending(true);
        (async () => {
            try {
                await todoApi.putTodo(todo);
            }
            catch (err) {
                handleError(err, `Failed update todo on ${api}`, todo, TodoService.todoOperation.PUT);
            }
        })()
        setPending(false);
    }, [todoApi, handleError])

    const patchTodoDone = useCallback((todo: TodoService.ITodoEntity) => {
        setPending(true);
        (async () => {
            try {
                await todoApi.patchTodoDone(todo);
            }
            catch (err) {
                handleError(err, `Failed updated todo done on ${api}`, todo, TodoService.todoOperation.PATCH); }
        })()
        setPending(false);
    }, [todoApi, handleError])

    const clearErrorState = () => {
        dispatchTodoAction(TodoState.updateTodoErrorStateAction(false));
    }

    return {
        pending,
        clearErrorState,
        getTodos,
        createTodo,
        deleteTodo,
        putTodo,
        patchTodoDone
    };
}
