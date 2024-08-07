import React, { useRef, useState } from "react";

import { ITodo, ITodoEntity } from "../../../../service";
import { Icon } from "../../../../components";
import { Icons } from "../../../../assets";
import {
    selectAuthor,
    selectDate,
    selectDescription,
    selectDone,
    selectID,
    selectTitle
} from "../../state";

import styles from "./TodoItem.module.css";
import { TodoForm } from "../TodoForm";

interface Props {
    todoEntity: ITodoEntity;
    onToggleDone: (id: string) => void;
    onRemoveTodoItem: (id: string) => void;
    onEditTodoItem: (id: string, newTodo: ITodo) => void;
}

export const TodoItem: React.FC<Props> = ({
    todoEntity,
    onToggleDone,
    onRemoveTodoItem,
    onEditTodoItem
}) => {
    const todoText = useRef<HTMLParagraphElement>(null);
    const [editMode, setEditMode] = useState(false);

    const toggleDisplayText = () => {
        if (todoText.current == null) { return; }
        todoText.current.classList.toggle(styles.none)
    } 

    const handleToggleDone: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        onToggleDone(todoEntity.id);
    }

    const handleSubmit = (todo: ITodo) => {
        onEditTodoItem(todoEntity.id, todo);
        setEditMode(false);
    }

    return (
        <article className={styles.todoItem}
            onClick={_ => { toggleDisplayText() }}>
            {!editMode && <button className={styles.checkBoxBtn}
                onClick={handleToggleDone}>
                <Icon icon={Icons.check}
                    className={selectDone(todoEntity) ? "" : styles.hide} />
            </button>}
            <div className={styles.todoItemBody}>
                {!editMode
                ? (<>
                    <h3>{selectTitle(todoEntity)}</h3>
                    <span>Author: {selectAuthor(todoEntity)}</span>
                    <time dateTime={selectDate(todoEntity)}>
                        Date: {selectDate(todoEntity)}
                    </time>
                    <p ref={todoText}
                        className={styles.none}>
                        {selectDescription(todoEntity)}
                    </p>
                </>)
                : (
                <TodoForm
                    todo={todoEntity.todo}
                    submitLabel="Edit Task"
                    onSubmit={handleSubmit}/>
                )}
            </div>
            <div className={styles.updateTodoCtr}>
                {!editMode && <button className={styles.selectIconBtn}
                    onClick={_ => { onRemoveTodoItem(selectID(todoEntity)) }}>
                    <Icon icon={Icons.trash}/>
               </button>}
               {!editMode
               ? <button className={styles.selectIconBtn}
                    onClick={_ => { setEditMode(prevValue => !prevValue) }}>
                   <Icon icon={Icons.edit}/>
               </button>
               : <button className={styles.selectIconBtn}
                    onClick={_ => { setEditMode(prevValue => !prevValue) }}>
                   <Icon icon={Icons.close}/>
               </button>}
            </div> 
        </article>
    );
}

