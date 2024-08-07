import React, { ReactElement } from "react";

import { TodoItem } from "../TodoItem";
import { ITodoEntity } from "../../../../service";

import styles from "./TodoList.module.css";

interface Props {
    todoList: ITodoEntity[];
    toggleDone: (id: string) => void;
    removeTodoItem: (id: string) => void;
}

export const TodoList: React.FC<Props> = ({
    todoList,
    toggleDone,
    removeTodoItem
}): ReactElement => {

    return (
        <section className={styles.todoList}>
            {todoList.map(entity => (
                <TodoItem
                    key={entity.id}
                    todoEntity={entity}
                    onToggleDone={toggleDone}
                    onRemoveTodoItem={removeTodoItem} />
            ))}
        </section>
    );
}