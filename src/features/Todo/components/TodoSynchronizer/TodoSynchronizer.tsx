import { ReactElement, useState } from "react";

import { ErrorModal, InfoModal } from "../../../../components";
import { selectTodoPage } from "../../state";
import * as TodoService from "../../../../service";
import { useTodoContext } from "../../context";

import styles from "./TodoSynchronizer.module.css";
import { useTodoQuery } from "../../hooks";

export const TodoSynchronizer = (): ReactElement => {
    const [
        displayFailedStorageInfo,
        setDisplayFailedStorageInfo
    ] = useState(true);
    const [dispatchTodoAction, todoState] = useTodoContext();
    const todoQueryHook = useTodoQuery(dispatchTodoAction);
    
    const handleTryFailedTodoActions = () => {
        const todos = TodoService.getFailedRemoteStoredTodos();
        const page = selectTodoPage(todoState);
        TodoService.emptyFailedRemoteStoredTodo();

        todos.forEach(todo => {
            switch (todo.failedOperation) {
                case TodoService.todoOperation.CREATE:
                    todoQueryHook.createTodo(todo, page); break;
                case TodoService.todoOperation.DELETE:
                    todoQueryHook.deleteTodo(todo, page); break;
                case TodoService.todoOperation.PUT:
                    todoQueryHook.putTodo(todo); break;
                case TodoService.todoOperation.PATCH:
                    todoQueryHook.patchTodoDone(todo); break;
                default: break; 
            }
        })
    }

    const isFailedStoredTodos = () => {
        return !todoState.isError &&
        TodoService.getFailedRemoteStoredTodos().length > 0 &&
            displayFailedStorageInfo;
    }

    const isStillFailedStoredTodos = () => {
        return TodoService.getFailedRemoteStoredTodos().length > 0 &&
            !displayFailedStorageInfo;
    }

    const getFailedStoredMessage = () => {
        const nrOfFailedTodos = TodoService.getFailedRemoteStoredTodos().length;
        return `You have ${nrOfFailedTodos} todo items that is not synchronized with remote
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
