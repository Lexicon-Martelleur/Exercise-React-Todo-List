import { ReactElement } from "react";

import { useTodoContext } from "../../context";
import { TodoItem } from "../TodoItem";
import styles from "./TodoList.module.css";

export const TodoList = (): ReactElement => {
    const todos = useTodoContext();

    return (
        <section className={styles.todoList}>
            <div>
                <h1>Todo List</h1>
                <h3>Stay organized and productive</h3>
            </div>
            {todos.map(entity => <TodoItem
                key={entity.id}
                todo={entity.todo}/>
            )}
        </section>
    )
}