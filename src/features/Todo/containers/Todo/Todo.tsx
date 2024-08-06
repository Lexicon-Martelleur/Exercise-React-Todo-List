import { ReactElement } from "react"

import { TodoList, TodoForm } from "../../components";
import styles from "./Todo.module.css";

export const Todo = (): ReactElement => {
    return (
        <section className={styles.todoSection}>
            <div>
                <h1>Todo List</h1>
                <p>Stay organized and  productive.</p>
            </div>
            <TodoForm />
            <TodoList />
        </section>
    )
}