import { ReactElement } from "react";

import styles from "./SubmitButton.module.css";

export const SubmitButton = (): ReactElement => {
    return (
        <button
            className={styles.submitButton}
            type="submit">Add Task
        </button>
    )
}