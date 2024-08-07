import { Children, ReactElement, ReactNode } from "react";

import { TodoList, TodoForm } from "../../components";

import styles from "./TodoLayout.module.css";

interface Props {
    children?: ReactNode
}

export const TodoLayout: React.FC<Props> = ({
    children
}): ReactElement => {
    return (
        <section className={styles.todoSection}>
            <div>
                <h1>Todo List</h1>
                <p>Stay organized and productive.</p>
            </div>
            {children}
            {/* <TodoForm />
            <TodoList /> */}
        </section>
    );
}
