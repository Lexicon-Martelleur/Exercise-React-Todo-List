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

import styles from "./TodoItem.module.css";

interface Props {
    todoEntity: ITodoEntity;
    todoDescriptionRef: React.RefObject<HTMLParagraphElement>;
    onToggleViewDescription: () => void;
    onToggleEditMode: () => void;
    onToggleDone: React.MouseEventHandler<HTMLButtonElement>
    onRemoveTodoItem: (id: string) => void;
}

export const TodoItemViewMode: React.FC<Props> = ({
    todoEntity,
    todoDescriptionRef,
    onToggleViewDescription,
    onToggleEditMode,
    onToggleDone,
    onRemoveTodoItem
}) => {
    return (
        <article className={styles.todoItem}
            onClick={onToggleViewDescription}>
            <button className={styles.checkBoxBtn}
                onClick={onToggleDone}>
                <Icon icon={Icons.check}
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
