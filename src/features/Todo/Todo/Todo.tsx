import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { useTodoStateManager } from "../hooks";
import { ErrorModal } from "../../../components";
import { updateTodoErrorStateAction } from "../state";

export const Todo = (): ReactElement => {
    const {
		todoState,
		dispatchTodoActionStorageWrapper
     } = useTodoStateManager();

    const handleCloseError = () => {
        dispatchTodoActionStorageWrapper(updateTodoErrorStateAction(false))        
    }

    return (
        <>
           {todoState.isError && <ErrorModal
                title={"Error"}
                message={todoState.errorMessage}
                onClose={handleCloseError} />}
            <Outlet context={[dispatchTodoActionStorageWrapper, todoState]}/>  
        </>
    );
}
