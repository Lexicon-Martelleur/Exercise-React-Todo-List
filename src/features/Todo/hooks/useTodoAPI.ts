import { useCallback } from "react";

import { todoApi } from "../../../data";
import {
	addTodoEntitiesAction,
	ITodoAction,
	updateTodoPaginationAction,
} from "../state";
import { isDevelopment } from "../../../config";
import { ITodoEntity } from "../../../service";

export type TodoAPI = ReturnType<typeof useTodoAPI>

/**
 * A custom hook used as a wrapper for
 * Todo API.
 * @TODO 
 * 1. Dispatch Error message in all methods if something wrong.
 * 2. Create an generic error module component that can be used in App
 * to display the error message. 
 */
export function useTodoAPI () {

    const getTodos = useCallback((
        page: number,
        dispatchTodoAction: React.Dispatch<ITodoAction>
    ) => {
        (async () => {
            try {
                const [todoList, paginationMetaData] = await todoApi.getTodos(page);
                dispatchTodoAction(updateTodoPaginationAction(paginationMetaData))
                dispatchTodoAction(addTodoEntitiesAction(todoList));
            } catch (e) {
                dispatchTodoAction(updateTodoPaginationAction(null))
                dispatchTodoAction(addTodoEntitiesAction([]));
            }
        })()
    }, [todoApi])

    const createTodo = useCallback((todo: ITodoEntity) => {
        (async () => {
            try { todoApi.createTodo(todo); }
            catch (err) { isDevelopment() && console.log(err) }
        })()
    }, [todoApi])

    const deleteTodo = useCallback((todoId: number) => {
        (async () => {
            try { todoApi.deleteTodo(todoId); }
            catch (err) { isDevelopment() && console.log(err) }
        })()
    }, [todoApi])

    const putTodo = useCallback((todo: ITodoEntity) => {
        (async () => {
            try { todoApi.putTodo(todo); }
            catch (err) { isDevelopment() && console.log(err) }
        })()
    }, [todoApi])

    const patchTodoDone = useCallback((todo: ITodoEntity) => {
        (async () => {
            try { todoApi.patchTodoDone(todo); }
            catch (err) { isDevelopment() && console.log(err) }
        })()
    }, [todoApi])

    return {
        getTodos,
        createTodo,
        deleteTodo,
        putTodo,
        patchTodoDone
    }
}
