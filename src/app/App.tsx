import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { BaseLayout } from "../layout";

import { useTodoStateManager } from "./useTodoStateManager";

export const App = (): ReactElement => {
	const [
		todoState,
		dispatchTodoAction
	] = useTodoStateManager();

	return (
		<BaseLayout>
      		<Outlet context={[dispatchTodoAction, todoState]}/>  
    	</BaseLayout>
	);
}
