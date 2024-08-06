import { ReactElement } from "react";

import { RequiredInput, SubmitButton } from "../../../../components";
import styles from "./TodoForm.module.css"

const inputFieldName = {
    title: "title", 
    description: "description" 
} as const;

export const TodoForm = (): ReactElement => {
    return (
        <form className={styles.todoForm}>
            <RequiredInput fieldName={inputFieldName.title}
                minLength={1}
                maxLength={200}
                labelTitle="Enter a task title"
                className={styles.inputCtr} />
            <RequiredInput fieldName={inputFieldName.description}
                minLength={1}
                maxLength={2000}
                labelTitle="Enter a task title"
                className={styles.inputCtr}
                type="textarea" />
            <SubmitButton />
        </form>
    );
}