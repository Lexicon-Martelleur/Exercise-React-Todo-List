import { ReactElement, useState } from "react";

import { ErrorModal, InfoModal } from "../../../../components";
import {
    selectTodoPage,
    updateTodoErrorStateAction
} from "../../state";
import { emptyFailedRemoteStoredTodo, getFailedRemoteStoredTodos, todoOperation } from "../../../../service";
import { useTodoContext } from "../../context";

import styles from "./TodoSynchronizer.module.css";
import { useTodoAPI } from "../../hooks";

export const TodoSynchronizer = (): ReactElement => {
    const [
        displayFailedStorageInfo,
        setDisplayFailedStorageInfo
    ] = useState(true);
    
    const [dispatchTodoAction, todoState] = useTodoContext();
    const todoAPIHook = useTodoAPI(dispatchTodoAction);
    
    const handleTryFailedTodoActions = () => {
        const todos = getFailedRemoteStoredTodos();
        const page = selectTodoPage(todoState);
        emptyFailedRemoteStoredTodo();

        todos.forEach(todo => {
            switch (todo.failedOperation) {
                case todoOperation.CREATE:
                    todoAPIHook.createTodo(todo, page); break;
                case todoOperation.DELETE:
                    todoAPIHook.deleteTodo(todo, page); break;
                case todoOperation.PUT:
                    todoAPIHook.putTodo(todo); break;
                case todoOperation.PATCH:
                    todoAPIHook.patchTodoDone(todo); break;
                default: break; 
            }
        })
    }

    const isFailedStoredTodos = () => {
        return !todoState.isError &&
        getFailedRemoteStoredTodos().length > 0 &&
            displayFailedStorageInfo;
    }

    const isStillFailedStoredTodos = () => {
        return getFailedRemoteStoredTodos().length > 0 &&
            !displayFailedStorageInfo;
    }

    const getFailedStoredMessage = () => {
        const nrOfFailedTodos = getFailedRemoteStoredTodos().length;
        return `You have ${nrOfFailedTodos} todo items that is not synchronized with remote
        storage, would you like to try synchronization?`;
    }

    const handleCloseError = () => {
        dispatchTodoAction(updateTodoErrorStateAction(false));
        setDisplayFailedStorageInfo(false);
    }

    const handleCloseFailedStorageInfo = () => {
        setDisplayFailedStorageInfo(false);        
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
