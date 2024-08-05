import React, { ReactElement, ReactNode } from "react";

import styles from "./BaseLayout.module.css";

interface Props {
    children?: ReactNode 
}

export const BaseLayout: React.FC<Props> = ({
    children
}): ReactElement => {
    return (
        <>
            <header className={styles.header}>
                <h1>Todo List</h1>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>joel.martelleur@gmail.com</p>
            </footer>
        </>
    )
}