import { useEffect, useReducer } from "react";

import * as TodoState from "../state";
import {
	ITodoAction,
} from "../state";
import { isDevelopment } from "../../../config";

export type TodoStateManager = ReturnType<typeof useTodoStateProvider>

export function useTodoStateProvider () {
    const [
		todoState,
		dispatchTodoAction
	] = useReducer(TodoState.todoReducer, TodoState.todoInitData);
    
	const dispatchTodoActionWrapper = (action: ITodoAction) => {
		dispatchTodoAction(action);
		if (isDevelopment()) {
			console.log("action", action);
		}
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

    return {
        todoState,
        dispatchTodoActionWrapper
	};
}
