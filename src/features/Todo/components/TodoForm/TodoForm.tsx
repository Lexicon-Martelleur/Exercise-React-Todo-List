import React, { ReactElement, useEffect, useState } from "react";

import { RequiredInput, SubmitButton } from "../../../../components";
import { getEmptyDodo, todoConstants } from "../../../../service";
import { useTodoContext } from "../../context";
import {
    addTodoAction,
    updateNewTodoAction
} from "../../state";


import styles from "./TodoForm.module.css";

const inputFieldName = {
    title: "title", 
    description: "description"
} as const;

export const TodoForm = (): ReactElement => {
    const [dispatchTodoAction, todoState] = useTodoContext();
    const [author, setAuthor] = useState(todoState.newTodo.author); 
    const [title, setTitle] = useState(todoState.newTodo.title);
    const [description, setDescription] = useState(todoState.newTodo.description);

    // useEffect(() => {
    //     setAuthor(todoState.newTodo.author);
    //     setTitle(todoState.newTodo.title);
    //     setDescription(todoState.newTodo.description);
    // }, [todoState]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const emptyTodo = getEmptyDodo()
        dispatchTodoAction(updateNewTodoAction(emptyTodo));
        dispatchTodoAction(addTodoAction({ author, title, description, done: false }));
        setAuthor(todoState.newTodo.author);
        setAuthor(emptyTodo.author);
        setTitle(emptyTodo.title);
        setDescription(emptyTodo.description);
    }

    const handleChange = (stateAction: (value: string) => void, value: string) => {
        stateAction(value);
        dispatchTodoAction(updateNewTodoAction({ author, title, description, done: false }));
    }

    return (
        <form className={styles.todoForm} onSubmit={handleSubmit}> 
            <RequiredInput fieldName={inputFieldName.title}
                minLength={todoConstants.MIN_LENGTH_TITLE}
                maxLength={todoConstants.MAX_LENGTH_TITLE}
                labelTitle="Title"
                value={title}
                placeholder="Enter a task title..."
                className={styles.inputCtr}
                onChange={e => handleChange(setTitle, e.target.value)} />
            <RequiredInput fieldName={inputFieldName.title}
                minLength={todoConstants.MIN_LENGTH_AUTHOR}
                maxLength={todoConstants.MAX_LENGTH_AUTHOR}
                labelTitle="Author"
                value={author}
                placeholder="Enter author name..."
                className={styles.inputCtr}
                onChange={e => handleChange(setAuthor, e.target.value)} />
            <RequiredInput fieldName={inputFieldName.description}
                minLength={todoConstants.MIN_LENGTH_DESCRIPTION}
                maxLength={todoConstants.MAX_LENGTH_DESCRIPTION}
                labelTitle="Description"
                value={description}
                placeholder="Enter a task description..."
                className={styles.inputCtr}
                type="textarea"
                onChange={e => handleChange(setDescription, e.target.value)} />
            <SubmitButton>Add Task</SubmitButton>
        </form>
    );
}