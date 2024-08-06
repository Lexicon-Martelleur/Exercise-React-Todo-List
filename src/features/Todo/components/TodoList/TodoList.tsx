import { ReactElement } from "react";

import { useTodoContext } from "../../context";
import { TodoItem } from "../TodoItem";

import styles from "./TodoList.module.css";

export const TodoList = (): ReactElement => {
    const [_, todoState] = useTodoContext();

    return (
        <section className={styles.todoList}>
            {todoState.todoList.map(entity => <TodoItem
                key={entity.id}
                todo={entity.todo}/>
            )}
        </section>
    );
}