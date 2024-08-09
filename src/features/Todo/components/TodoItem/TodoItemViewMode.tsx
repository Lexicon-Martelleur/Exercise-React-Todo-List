import { ReactElement, useRef } from "react";

import { ITodoEntity } from "../../../../service";
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

import styles from "./TodoItemViewMode.module.css";

interface Props {
    todoEntity: ITodoEntity;
    className: string;
    onToggleEditMode: () => void;
    onToggleDone: React.MouseEventHandler<HTMLButtonElement>
    onRemoveTodoItem: (id: string) => void;
}

export const TodoItemViewMode: React.FC<Props> = ({
    todoEntity,
    className,
    onToggleEditMode,
    onToggleDone,
    onRemoveTodoItem
}): ReactElement => {
    const todoDescriptionRef = useRef<HTMLParagraphElement>(null);
    const derivedClass = className ? className : ""

    const handleToggleViewDescription = () => {
        if (todoDescriptionRef.current == null) { return; }
        todoDescriptionRef.current.classList.toggle(styles.none);
    }

    const getToggleDoneTitle = () => {
        return selectDone(todoEntity)
            ? `Set '${selectTitle(todoEntity)}' not done`
            : `Set '${selectTitle(todoEntity)}' done`;
    }
 
    return (
        <article draggable className={derivedClass}
            onClick={handleToggleViewDescription}>
            <button title={getToggleDoneTitle()}
                className={styles.checkBoxBtn}
                onClick={onToggleDone}>
                <Icon icon={{...Icons.check, title: getToggleDoneTitle()}}
                    className={selectDone(todoEntity) ? "" : styles.hide} />
            </button>
            <div className={styles.todoItemBody}>
                <h3>{selectTitle(todoEntity)}</h3>
                <span>Author: {selectAuthor(todoEntity)}</span>
                <time dateTime={selectDate(todoEntity)}>
                    Date: {selectDate(todoEntity)}
                </time>
                <p ref={todoDescriptionRef}
                    className={styles.none}>
                    {selectDescription(todoEntity)}
                </p>
            </div>
            <div className={styles.updateTodoCtr}>
                <button className={styles.selectIconBtn}
                    onClick={_ => { onRemoveTodoItem(selectID(todoEntity)) }}>
                    <Icon icon={Icons.trash}/>
                </button>
                <button className={styles.selectIconBtn}
                    onClick={onToggleEditMode}>
                    <Icon icon={Icons.edit}/>
                </button>
            </div>
        </article>
    );
}
