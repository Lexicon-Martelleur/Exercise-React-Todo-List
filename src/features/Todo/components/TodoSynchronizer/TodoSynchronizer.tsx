import { ReactElement, useState } from "react";

import { ErrorModal, InfoModal } from "../../../../components";
import {
    addTodoAction,
    editTodoAction,
    removeAllFailedStoredTodosAction,
    removeTodoAction,
    selecUniqueFailedTodosFilterstByLatestDate,
    updateTodoDoneAction,
    updateTodoErrorStateAction
} from "../../state";
import { todoOperation } from "../../../../service";

import styles from "./TodoSynhronizer.module.css";
import { useTodoContext } from "../../context";

export const TodoSynchronizer = (): ReactElement => {
    const [
        displayFailedStorageInfo,
        setDisplayFailedStorageInfo
    ] = useState(true);
    
    const [dispatchTodoAction, todoState] = useTodoContext();

    const handleCloseError = () => {
        dispatchTodoAction(updateTodoErrorStateAction(false))        
    }

    const handleCloseFailedStorageInfo = () => {
        setDisplayFailedStorageInfo(false);        
    }

    const handleTryFailedTodoActions = () => {
        const latestFailedTodos = selecUniqueFailedTodosFilterstByLatestDate(todoState);
        dispatchTodoAction(removeAllFailedStoredTodosAction())
        latestFailedTodos.forEach(todo => {
            switch (todo.failedOperation) {
                case todoOperation.CREATE: dispatchTodoAction(addTodoAction(todo.todo)); break;
                case todoOperation.DELETE: dispatchTodoAction(removeTodoAction(todo.id)); break;
                case todoOperation.PUT: dispatchTodoAction(editTodoAction(todo.id, todo.todo)); break;
                case todoOperation.PATCH: dispatchTodoAction(updateTodoDoneAction(todo)); break;
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
