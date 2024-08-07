import { ReactElement, useReducer } from "react";
import { Outlet } from "react-router-dom";

import { BaseLayout } from "../layout";
import { todoInitData, todoReducer } from "../features";

export const App = (): ReactElement => {
	const [
		todoState,
		dispatchTodoAction
	] = useReducer(todoReducer, todoInitData);
	return (
	<BaseLayout>
      	<Outlet context={[dispatchTodoAction, todoState]}/>  
    </BaseLayout>
	);
}
