import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { useTodoStateProvider } from "./useTodoStateProvider";

export const TodotStateProvider = (): ReactElement => {   
	const {
	todoState,
	dispatchTodoActionWrapper
	} = useTodoStateProvider();

	return (
		<>
			<Outlet context={[dispatchTodoActionWrapper, todoState]}/>  
		</>
	);
}
