import { useEffect, useReducer, useRef } from "react";

import { todoInitData, todoReducer } from "../state";
import {
	ITodoAction,
	TodoActionType as Type,
	selectTodoPage
} from "../state";
import { StoreNewTodo, StoreTodos } from "../../../service";
import { isDevelopment } from "../../../config";
import { useTodoAPI } from "./useTodoAPI";

export type TodoStateManager = ReturnType<typeof useTodoStateManager>

export function useTodoStateManager () {
    const [
		todoState,
		dispatchTodoAction
	] = useReducer(todoReducer, todoInitData);
	const todoAPIHook = useTodoAPI();
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
	 *  1. Delete invalid data 
	 * 	2. Try to fetch data
	 * 	3. And notify user
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
		const page = selectTodoPage(todoState);
		todoAPIHook.getTodos(page, dispatchTodoActionStorageWrapper);
	}, []);

	/**
	 * @TODO
	 * 1. Display status to user, e.g, action failed on server.
	 * 2. Could! Refactor to be used before local state update.
	 */
	useEffect(() => {
		const todo = todoState.latestHandledTodo;
		const isTodo = todo != null
		switch(actionTypeRef.current) {
			case Type.addTodo:
				isTodo && todoAPIHook.createTodo(todo); break;
			case Type.removeTodo:
				isTodo && todoAPIHook.deleteTodo(Number(todo.id)); break;
			case Type.editTodo:
				isTodo && todoAPIHook.putTodo(todo); break;
			case Type.toggleTodoDone:
				isTodo && todoAPIHook.patchTodoDone(todo); break;
			case Type.swapTodoListItems:
				StoreTodos(todoState.todoList); break;
			case Type.updateNewTodo:
				StoreNewTodo(todoState.newTodo); break; 
			default: break;
		}
	}, [todoState]);

    return [
        todoState,
        dispatchTodoActionStorageWrapper
    ]
}