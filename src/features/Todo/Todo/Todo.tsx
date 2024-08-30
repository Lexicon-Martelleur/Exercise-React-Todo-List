import { ReactElement, useState } from "react";
import { Outlet } from "react-router-dom";

import { useTodoStateManager } from "../hooks";
import { ErrorModal, InfoModal } from "../../../components";
import { updateTodoErrorStateAction } from "../state";

/**
 * @TODO 
 * 1. Check if any failed stored, updated, patched, or deleted todo. 
 * 2. If so ask/recommend user if user want to try synchronize data.
 * 3. If user check ok try to synch with server.
 * 4. Display result to user.
 * 5. If synch ok delete data.  
 */
export const Todo = (): ReactElement => {
    const [
        displayFailedStorageInfo,
        setDisplayFailedStorageInfo
    ] = useState(true);
    const {
		todoState,
		dispatchTodoActionStorageWrapper
     } = useTodoStateManager();

    const handleCloseError = () => {
        dispatchTodoActionStorageWrapper(updateTodoErrorStateAction(false))        
    }

    const handleCloseFailedStorageInfo = () => {
        setDisplayFailedStorageInfo(false);        
    }

    const handleTryTodoActionsAgain = () => {
        setDisplayFailedStorageInfo(false);        
    }

    const isFailedStoredTodos = () => {
        return todoState.failedStoredTodoList.length > 0 &&
        displayFailedStorageInfo;
    }

    const getFailedStoredMessage = () => {
        const nrOfFailedTodos = todoState.failedStoredTodoList.length;
        return `You have ${nrOfFailedTodos} failed stored todo actions,
        would you like to try them again?`;
    }

    return (
        <>
           {todoState.isError && <ErrorModal
                title={"Error"}
                message={todoState.errorMessage}
                onClose={handleCloseError} />}
            {isFailedStoredTodos() && <InfoModal
                title={"Info"}
                message={getFailedStoredMessage()}
                onClose={handleCloseFailedStorageInfo}
                onOk={handleTryTodoActionsAgain} />}
            <Outlet context={[dispatchTodoActionStorageWrapper, todoState]}/>  
        </>
    );
}
