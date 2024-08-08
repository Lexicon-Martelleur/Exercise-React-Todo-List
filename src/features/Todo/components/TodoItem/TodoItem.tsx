import { ReactElement, useState } from "react";

import { ITodo, ITodoEntity } from "../../../../service";
import { TodoItemViewMode } from "./TodoItemViewMode";
import { TodoItemEditMode } from "./TodoItemEditMode";

import styles from "./TodoItem.module.css";
import { selectTitle } from "../../state";

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
}): ReactElement => {
    const [editMode, setEditMode] = useState(false);

    const handleToggleEditMode = () => {
        setEditMode(prevValue => !prevValue);
    }

    const handleToggleDone:
    React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        onToggleDone(todoEntity.id);
    }

    const handleSubmitEditTodo = (todo: ITodo) => {
        onEditTodoItem(todoEntity.id, todo);
        setEditMode(false);
    }

    return (
        <article title={`Select to view '${selectTitle(todoEntity)}' details`}>
        {!editMode
            ? <TodoItemViewMode className={styles.todoItem} 
                todoEntity={todoEntity}
                onToggleEditMode={handleToggleEditMode}
                onToggleDone={handleToggleDone}
                onRemoveTodoItem={onRemoveTodoItem} />
            : <TodoItemEditMode className={styles.todoItem} 
                todoEntity={todoEntity}
                onSubmitEditTodo={handleSubmitEditTodo}
                onToggleEditMode={handleToggleEditMode} />
        }</article>
    );
}
