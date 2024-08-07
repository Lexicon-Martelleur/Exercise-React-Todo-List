import React, { useRef } from "react";

import { ITodoEntity } from "../../../../service/types";
import { Icon } from "../../../../components";
import { Icons } from "../../../../assets";

import styles from "./TodoItem.module.css";
import {
    selectAuthor,
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

    const handleToggleDone: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        onToggleDone(todoEntity.id);
    }

    return (
        <article className={styles.todoItem}
            onClick={_ => { toggleDisplayText() }}>
            <button className={styles.checkBoxBtn}
                onClick={handleToggleDone}>
                <Icon icon={Icons.check}
                    className={selectDone(todoEntity) ? "" : styles.hide} />
            </button>
            <div className={styles.todoItemBody}>
                <h3>{selectTitle(todoEntity)}</h3>
                <span>Author: {selectAuthor(todoEntity)}</span>
                <time dateTime={selectDate(todoEntity)}>
                    Date: {selectDate(todoEntity)}
                </time>
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

