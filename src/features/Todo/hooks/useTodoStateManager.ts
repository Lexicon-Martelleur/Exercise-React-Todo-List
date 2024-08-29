import { useEffect, useReducer, useRef } from "react";

import { todoInitData, todoReducer } from "../..";
import { todoApi } from "../../../data";
import {
	addTodoEntitiesAction,
	ITodoAction,
	TodoActionType as Type
} from "../state";
import { StoreNewTodo, StoreTodos } from "../../../service";
import { isDevelopment } from "../../../config";

export type TodoStateManager = ReturnType<typeof useTodoStateManager>

export function useTodoStateManager () {
    const [
		todoState,
		dispatchTodoAction
	] = useReducer(todoReducer, todoInitData);
	const actionTypeRef = useRef("");
    
    const dispatchTodoActionStorageWrapper = (action: ITodoAction) => {
		dispatchTodoAction(action);
		if (isDevelopment()) {
			console.log("action", action);
		}
		actionTypeRef.current = action.type;
	}

	/**
	 * @TODO Validate when storage have been changed 
	 * If invalid
	 * 	1. update state to default
	 * 	2. and notify user
	 * If valid do noting
	*/
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			console.log(event.newValue);
			console.log(event.key);
		}
		window.addEventListener("storage", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		}
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const [todoList, paginationMetaData] = await todoApi.getTodos();
				/**
				 * @TODO Use pagination metadata to implement
				 * pagination on frontend. 
				 **/ 
				console.log("paginationMetaData", paginationMetaData)
				dispatchTodoAction(addTodoEntitiesAction(todoList));
			} catch (e) {
				console.log(e)
			}
		})()
	}, []);

	/**
	 * @TODO
	 * 1. Display status to user, e.g, action failed on server.
	 * 2. Could! Refactor to be used before local state update.
	 */
	useEffect(() => {(async () => {
		const todo = todoState.latestHandledTodo;
		const isTodo = todo != null
		try {
			switch(actionTypeRef.current) {
				case Type.addTodo:
					isTodo && await todoApi.createTodo(todo); break;
				case Type.removeTodo:
					isTodo && await todoApi.deleteTodo(Number(todo.id)); break;
				case Type.editTodo:
					isTodo && await todoApi.putTodo(todo); break;
				case Type.toggleTodoDone:
					isTodo && await todoApi.patchTodoDone(todo); break;
				case Type.swapTodoListItems:
					StoreTodos(todoState.todoList); break;
				case Type.updateNewTodo:
					StoreNewTodo(todoState.newTodo); break; 
				default: break;
			}
		} catch (e) {
			console.log(e)
		}})()
	}, [todoState]);

    return [
        todoState,
        dispatchTodoActionStorageWrapper
    ]
}
