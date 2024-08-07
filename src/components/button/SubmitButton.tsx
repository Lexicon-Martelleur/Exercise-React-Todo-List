import React, { ReactElement, ReactNode } from "react";

import styles from "./SubmitButton.module.css";

interface Props {
    children?: ReactNode
}

export const SubmitButton: React.FC<Props> = ({
    children
}): ReactElement => {
    return (
        <button
            className={styles.submitButton}
            type="submit">
            {children ? children : "Submit"}
        </button>
    )
}
