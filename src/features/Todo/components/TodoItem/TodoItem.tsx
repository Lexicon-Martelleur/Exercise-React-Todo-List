import React, { useRef } from "react";

import { ITodoEntity } from "../../../../service/types";
import { Icon } from "../../../../components";
import { Icons } from "../../../../assets";

import styles from "./TodoItem.module.css";
import {
    selectDate,
    selectDescription,
    selectDone,
    selectID,
    selectTitle
} from "../../state";

interface Props {
    todoEntity: ITodoEntity;
    onToggleDone: (id: string) => void;
    onRemoveTodoItem: (id: string) => void;
}

export const TodoItem: React.FC<Props> = ({
    todoEntity,
    onToggleDone,
    onRemoveTodoItem
}) => {
    const todoText = useRef<HTMLParagraphElement>(null);

    const toggleDisplayText = () => {
        if (todoText.current == null) { return; }
        todoText.current.classList.toggle(styles.none)
    } 

    return (
        <article className={styles.todoItem}
            onClick={_ => { toggleDisplayText() }}>
            <button className={styles.checkBoxBtn}
                onClick={_ => { onToggleDone(selectID(todoEntity)) }}>
                <Icon icon={Icons.check}
                    className={selectDone(todoEntity) ? "" : styles.hide} />
            </button>
            <div className={styles.todoItemBody}>
                <h4>{selectTitle(todoEntity)}</h4>
                <time dateTime={selectDate(todoEntity)}>{selectDate(todoEntity)}</time>
                <p ref={todoText}
                    className={styles.none}>
                    {selectDescription(todoEntity)}
                </p>
            </div>
            <div className={styles.updateTodoCtr}>
                <button className={styles.selectIconBtn}
                    onClick={_ => { onRemoveTodoItem(selectID(todoEntity)) }}>
                    <Icon icon={Icons.trash}/>
               </button>
               <button className={styles.selectIconBtn}>
               </button>
            </div> 
        </article>
    );
}

