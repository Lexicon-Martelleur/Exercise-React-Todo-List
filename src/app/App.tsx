import { ReactElement, useEffect, useReducer, useRef } from "react";
import { Outlet } from "react-router-dom";

import { BaseLayout } from "../layout";
import { todoInitData, todoReducer } from "../features";
import { todoApi } from "../data";
import {
	addTodoEntitiesAction,
	ITodoAction,
	TodoActionType as Type
} from "../features/Todo/state";
import { ITodoEntity, StoreNewTodo, StoreTodos } from "../service";

/**
 * @TODO Clean up
 */
export const App = (): ReactElement => {

	const [
		todoState,
		dispatchTodoAction
	] = useReducer(todoReducer, todoInitData);
	const actionTypeRef = useRef("");

	const dispatchTodoActionStorageWrapper = (action: ITodoAction) => {
		dispatchTodoAction(action);
		/** @TODO Log only in dev mode */
		// console.log("action", action);
		actionTypeRef.current = action.type;
	}

	useEffect(() => {
		(async () => {
			try {
				const todoList = await todoApi.getTodos();
				dispatchTodoAction(addTodoEntitiesAction(todoList));
			} catch (e) {
				console.log(e)
			}
		})()
	}, []);

	useEffect(() => {
		switch(actionTypeRef.current) {
			case Type.addTodo: AddSideEffect(todoState.latestHandledTodo); break;
			case Type.removeTodo ||
				Type.editTodo ||
				Type.swapTodoListItems ||
				Type.toggleTodoDone: StoreTodos(todoState.todoList); break;
			case Type.updateNewTodo: StoreNewTodo(todoState.newTodo); break; 
			default:;
		} 
	}, [todoState]);

	const AddSideEffect = (todo: ITodoEntity | null) => {
		if (todo == null) { return; }
		(async () => {
			try {
				const createdTodo = await todoApi.createTodo(todo);
				console.log('createdTodo', createdTodo)
			} catch (e) {
				console.log(e)
			}
		})()
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

	return (
		<BaseLayout>
      		<Outlet context={[dispatchTodoActionStorageWrapper, todoState]}/>  
    	</BaseLayout>
	);
}
