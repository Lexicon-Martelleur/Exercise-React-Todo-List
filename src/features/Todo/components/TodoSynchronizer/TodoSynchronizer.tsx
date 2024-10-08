import { ReactElement, useState } from "react";

import { ErrorModal, InfoModal } from "../../../../components";
import * as TodoState from "../../state";
import * as TodoService from "../../../../service";
import { useTodoContext } from "../../context";

import styles from "./TodoSynchronizer.module.css";
import { useTodoQuery } from "../../hooks";
import { todoOperation } from "../../../../constants";

export const TodoSynchronizer = (): ReactElement => {
    const [
        displayFailedStorageInfo,
        setDisplayFailedStorageInfo
    ] = useState(true);
    const [dispatchTodoAction, todoState] = useTodoContext();
    const todoQueryHook = useTodoQuery(dispatchTodoAction);
    
    const handleTryFailedTodoActions = () => {
        const todos = TodoService.getUniqueFailedTodos();
        const page = TodoState.selectTodoPage(todoState);
        TodoService.emptyFailedRemoteStoredTodo();

        todos.forEach(todo => {
            switch (todo.failedOperation) {
                case todoOperation.CREATE:
                    todoQueryHook.createTodo(todo, page); break;
                case todoOperation.DELETE:
                    todoQueryHook.deleteTodo(todo, page); break;
                case todoOperation.PUT:
                    todoQueryHook.putTodo(todo); break;
                case todoOperation.PATCH:
                    todoQueryHook.patchTodoDone(todo); break;
                default: break; 
            }
        })
    }

    const isFailedStoredTodos = () => {
        const failedTodos = TodoService.getFailedTodos();

        return !todoState.isError &&
            failedTodos.length > 0 &&
            displayFailedStorageInfo;
    }

    const isStillFailedStoredTodos = () => {
        const failedTodos = TodoService.getFailedTodos();

        return failedTodos.length > 0 &&
            !displayFailedStorageInfo;
    }

    const getFailedStoredMessage = () => {
        const nrOfFailedTodos = TodoService.getUniqueFailedTodos().length;
        return `${nrOfFailedTodos} todo items is not synchronized with remote
        storage, would you like to try synchronization?`;
    }

    const handleCloseError = () => {
        todoQueryHook.clearErrorState();
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
