import { useEffect, useReducer, useRef } from "react";

import { todoInitData, todoReducer } from "../state";
import {
	ITodoAction,
	TodoActionType as Type,
	selectTodoPage
} from "../state";
import { storeNewTodo, storeTodos } from "../../../service";
import { isDevelopment } from "../../../config";
import { useTodoAPI } from "./useTodoAPI";

export type TodoStateManager = ReturnType<typeof useTodoStateManager>

/**
 * Used to synchronize state between local and remote
 * Current strategy is local first
 * @TODO 
 * 1) Implementation design need to be refined
 * 2) Optional! Refactor strategy to update and use server state first.
 */
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
	
	const todoAPIHook = useTodoAPI(dispatchTodoActionStorageWrapper);

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
		todoAPIHook.getTodos(page, todoList => {
			storeTodos(todoList);
		});
	}, []);

	useEffect(() => {
		const todo = todoState.latestHandledTodo;
		const isTodo = todo != null
		switch(actionTypeRef.current) {
			case Type.addTodo:
				storeTodos(todoState.todoList);
				isTodo && todoAPIHook.createTodo(todo); break;
			case Type.removeTodo:
				storeTodos(todoState.todoList);
				isTodo && todoAPIHook.deleteTodo(Number(todo.id)); break;
			case Type.editTodo:
				storeTodos(todoState.todoList);
				isTodo && todoAPIHook.putTodo(todo); break;
			case Type.toggleTodoDone:
				storeTodos(todoState.todoList);
				isTodo && todoAPIHook.patchTodoDone(todo); break;
			case Type.swapTodoListItems:
				storeTodos(todoState.todoList); break;
			case Type.updateNewTodo:
				storeNewTodo(todoState.newTodo); break; 
			default: break;
		}
	}, [todoState]);

    return {
        todoState,
        dispatchTodoActionStorageWrapper
	};
}
