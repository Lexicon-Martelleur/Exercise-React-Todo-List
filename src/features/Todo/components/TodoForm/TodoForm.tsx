import { ReactElement, useState } from "react";

import { RequiredInput, SubmitButton } from "../../../../components";
import { getEmptyDodo, ITodo, todoConstants } from "../../../../service";

import styles from "./TodoForm.module.css";

const inputFieldName = {
    title: "title", 
    description: "description",
    author: "author"
} as const;

interface Props {
    todo: ITodo;
    submitLabel: string;
    onSubmit: (newTodo: ITodo) => void;
    onValueChange?: (newTodo: ITodo) => void;
}

export const TodoForm: React.FC<Props> = ({
    todo,
    submitLabel,
    onSubmit,
    onValueChange
}): ReactElement => {
    const [author, setAuthor] = useState(todo.author); 
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const emptyTodo = getEmptyDodo();
        setAuthor(emptyTodo.author);
        setTitle(emptyTodo.title);
        setDescription(emptyTodo.description);
        onSubmit({
            author, title, description, done: todo.done
        })
    }

    const handleValueChange = (stateAction: (value: string) => void, value: string) => {
        stateAction(value);
        onValueChange != null && onValueChange({
            author, title, description, done: todo.done
        });
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
                onChange={e => handleValueChange(setTitle, e.target.value)} />
            <RequiredInput fieldName={inputFieldName.author}
                minLength={todoConstants.MIN_LENGTH_AUTHOR}
                maxLength={todoConstants.MAX_LENGTH_AUTHOR}
                labelTitle="Author"
                value={author}
                placeholder="Enter author name..."
                className={styles.inputCtr}
                onChange={e => handleValueChange(setAuthor, e.target.value)} />
            <RequiredInput fieldName={inputFieldName.description}
                minLength={todoConstants.MIN_LENGTH_DESCRIPTION}
                maxLength={todoConstants.MAX_LENGTH_DESCRIPTION}
                labelTitle="Description"
                value={description}
                placeholder="Enter a task description..."
                className={styles.inputCtr}
                type="textarea"
                onChange={e => handleValueChange(setDescription, e.target.value)} />
            <SubmitButton>{submitLabel}</SubmitButton>
        </form>
    );
}