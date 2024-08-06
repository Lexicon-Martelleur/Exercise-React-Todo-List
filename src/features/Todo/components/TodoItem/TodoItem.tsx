import React from "react";

import { ITodoEntity } from "../../../../service/types";
import { Icon } from "../../../../components";
import { Icons } from "../../../../assets";

import styles from "./TodoItem.module.css";
import { selectDescription, selectDone, selectID, selectTitle } from "../../state";

interface Props {
    todoEntity: ITodoEntity;
    toggleDone: (id: string) => void;
}

export const TodoItem: React.FC<Props> = ({
    todoEntity,
    toggleDone
}) => {
    return (
        <article className={styles.todoItem}>
            <div className={styles.checkBoxCtr}
                onClick={_ => { toggleDone(selectID(todoEntity)) }}>
                <Icon icon={Icons.check}
                    className={selectDone(todoEntity) ? "" : styles.hide} />
            </div>
            <div className={styles.todoItemBody}>
                <h4>Title: {selectTitle(todoEntity)}</h4>
                <p>Description: {selectDescription(todoEntity)}</p>
            </div>
            <div className={styles.trashCtr}>
               <Icon icon={Icons.trash}/>
            </div> 
        </article>
    );
}

