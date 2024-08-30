import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { useTodoStateManager } from "../hooks";

export const TodoProvider = (): ReactElement => {   
    const {
		todoState,
		dispatchTodoActionStorageWrapper
    } = useTodoStateManager();

    return (
        <>
           <Outlet context={[dispatchTodoActionStorageWrapper, todoState]}/>  
        </>
    );
}
