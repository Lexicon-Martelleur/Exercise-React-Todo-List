import React, { ReactElement } from "react";

import { TodoItem } from "../TodoItem";
import { ITodoEntity } from "../../../../service";

import styles from "./TodoList.module.css";

interface Props {
    todoList: ITodoEntity[]
}

export const TodoList: React.FC<Props> = ({
    todoList
}): ReactElement => {

    return (
        <section className={styles.todoList}>
            {todoList.map(entity => <TodoItem
                key={entity.id}
                todo={entity.todo}/>
            )}
        </section>
    );
}