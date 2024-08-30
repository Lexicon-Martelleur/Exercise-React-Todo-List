import { ReactElement, useState } from "react";

import { useTodoAPI, useTodoStateManager } from "../../hooks";
import { ErrorModal, InfoModal } from "../../../../components";
import {
    removeAllFailedStoredTodosAction,
    selecUniqueFailedTodosFilterstByLatestDate,
    updateTodoErrorStateAction
} from "../../state";
import { todoOperation } from "../../../../service";

import * as styles from "./TodoSynhronizer.module.css";

/**
 * @TODO 
 * 1. Check if any failed stored, updated, patched, or deleted todo.
 *  1.1 Use date and ID to get the latest actions for each todo.
 *  1.2 User can select what action a user can take, if so user should
 *  select from all actions not only the latest for each todo.
 *  1.3 Or user can select the latest actions on each todo.
 * 2. If so ask/recommend user if user want to try synchronize data.
 * 3. If user check ok try to synch with server.
 * 4. Display result to user.
 * 5. If synch ok delete data.  
 */
export const TodoSynchronizer = (): ReactElement => {
    const [
        displayFailedStorageInfo,
        setDisplayFailedStorageInfo
    ] = useState(true);
    
    const {
		todoState,
		dispatchTodoActionStorageWrapper
    } = useTodoStateManager();

    const todoAPIHook = useTodoAPI(dispatchTodoActionStorageWrapper)

    const handleCloseError = () => {
        dispatchTodoActionStorageWrapper(updateTodoErrorStateAction(false))        
    }

    const handleCloseFailedStorageInfo = () => {
        setDisplayFailedStorageInfo(false);        
    }

    const handleTryFailedTodoActions = () => {
        const latestFailedTodos = selecUniqueFailedTodosFilterstByLatestDate(todoState);
        dispatchTodoActionStorageWrapper(removeAllFailedStoredTodosAction())
        latestFailedTodos.forEach(todoEntity => {
            switch (todoEntity.failedOperation) {
                case todoOperation.CREATE: todoAPIHook.createTodo(todoEntity); break;
                case todoOperation.DELETE: todoAPIHook.deleteTodo(todoEntity); break;
                case todoOperation.PUT: todoAPIHook.putTodo(todoEntity); break;
                case todoOperation.PATCH: todoAPIHook.patchTodoDone(todoEntity); break;
                default: break; 
            }
        })
        setDisplayFailedStorageInfo(false);
    }

    const isFailedStoredTodos = () => {
        return selecUniqueFailedTodosFilterstByLatestDate(todoState).length > 0 &&
        displayFailedStorageInfo;
    }

    const isStillFailedStoredTodos = () => {
        return selecUniqueFailedTodosFilterstByLatestDate(todoState).length > 0 &&
        !displayFailedStorageInfo;
    }

    const getFailedStoredMessage = () => {
        const nrOfFailedTodos = selecUniqueFailedTodosFilterstByLatestDate(todoState).length;
        return `You have ${nrOfFailedTodos} todo items that is not synchronized with remote
        storage, would you like to try synchronization?`;
    }

    return (
        <>
           {todoState.isError && <ErrorModal
                title={"Error"}
                message={todoState.errorMessage}
                onClose={handleCloseError} />}
            {isFailedStoredTodos() && <InfoModal
                title={"Info"}
                okText="Try"
                message={getFailedStoredMessage()}
                onClose={handleCloseFailedStorageInfo}
                onOk={handleTryFailedTodoActions} />}
            {isStillFailedStoredTodos() && <article
                className={styles.stillFailedTodoArticle}
                onClick={_ => { setDisplayFailedStorageInfo(true)}}> 
                <button>Your data is not synchronized with server</button>    
            </article>}
        </>
    );
}
