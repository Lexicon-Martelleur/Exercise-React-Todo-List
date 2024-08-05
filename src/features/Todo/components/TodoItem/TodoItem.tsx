import React from "react";

import { ITodo } from "../../../../service/types";
import styles from "./TodoItem.module.css";

interface Props {
    todo: ITodo
}

export const TodoItem: React.FC<Props> = ({
    todo
}) => {
    return (
        <article className={styles.todoItem}>
            <h4>Title: {todo.title}</h4>
            <p>Description: {todo.description}</p>
        </article>
    )
}