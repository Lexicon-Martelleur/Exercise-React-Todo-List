import React, { ReactElement, useEffect, useState } from "react";

import { RequiredInput, SubmitButton } from "../../../../components";
import { ITodo } from "../../../../service";

import styles from "./TodoForm.module.css";

const inputFieldName = {
    title: "title", 
    description: "description"
} as const;

interface Props {
    newTodo: ITodo
    addNewTodo: (todo: ITodo) => void
}

export const TodoForm: React.FC<Props> = ({
    newTodo,
    addNewTodo
}): ReactElement => {
    const [title, setTitle] = useState(newTodo.title);
    const [description, setDescription] = useState(newTodo.description);

    useEffect(() => {
        setTitle(newTodo.title);
        setDescription(newTodo.description);
    }, [newTodo])

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        addNewTodo({ title, description });
    }

    return (
        <form className={styles.todoForm} onSubmit={handleSubmit}> 
            <RequiredInput fieldName={inputFieldName.title}
                minLength={1}
                maxLength={200}
                labelTitle="Title"
                value={title}
                placeholder="Enter a task title..."
                className={styles.inputCtr}
                onChange={e => setTitle(e.target.value)} />
            <RequiredInput fieldName={inputFieldName.description}
                minLength={1}
                maxLength={2000}
                labelTitle="Description"
                value={description}
                placeholder="Enter a task description..."
                className={styles.inputCtr}
                type="textarea"
                onChange={e => setDescription(e.target.value)} />
            <SubmitButton>Add Task</SubmitButton>
        </form>
    );
}