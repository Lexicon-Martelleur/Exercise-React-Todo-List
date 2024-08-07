import { ReactElement } from "react";

import { ITodo, ITodoEntity } from "../../../../service";
import { Icon } from "../../../../components";
import { Icons } from "../../../../assets";
import { TodoForm } from "../TodoForm";
import React from "react";

import styles from "./TodoItem.module.css";

interface Props {
    todoEntity: ITodoEntity;
    onSubmitEditTodo: (todo: ITodo) => void;
    onToggleEditMode: () => void;
}

export const TodoItemEditMode: React.FC<Props> = ({
    todoEntity,
    onSubmitEditTodo,
    onToggleEditMode
}): ReactElement => {
    return (
        <article className={styles.todoItem}>
            <TodoForm
                todo={todoEntity.todo}
                submitLabel="Edit Task"
                onSubmit={onSubmitEditTodo}/>
            <div className={styles.closeEditModeCtr}>
                <button className={styles.selectIconBtn}
                    onClick={onToggleEditMode}>
                    <Icon icon={Icons.close}/>
                </button>
            </div>
        </article>
    );
}
