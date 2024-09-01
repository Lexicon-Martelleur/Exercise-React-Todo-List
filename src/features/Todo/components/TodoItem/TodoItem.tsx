import { ReactElement, useState } from "react";

import { ITodo, ITodoEntity } from "../../../../service";
import { TodoItemViewMode } from "./TodoItemViewMode";
import { TodoItemEditMode } from "./TodoItemEditMode";

import styles from "./TodoItem.module.css";
import { selectTitle } from "../../state";

interface Props {
    todoEntity: ITodoEntity;
    className?: string;
    onToggleDone: (todo: ITodoEntity) => void;
    onRemoveTodoItem: (todo: ITodoEntity) => void;
    onEditTodoItem: (todo: ITodoEntity) => void;
}

export const TodoItem: React.FC<Props> = ({
    todoEntity,
    className,
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
        event.preventDefault();
        event.stopPropagation();
        const doneStatus = todoEntity.todo.done
        const updatedTodo: ITodoEntity = {
            id: todoEntity.id,
            timestamp: todoEntity.timestamp,
            todo: { ...todoEntity.todo, done: !doneStatus }
        }
        onToggleDone(updatedTodo);
    }

    const handleSubmitEditTodo = (todo: ITodo) => {
        const updatedTodo: ITodoEntity = {
            id: todoEntity.id,
            timestamp: todoEntity.timestamp,
            todo
        }
        onEditTodoItem(updatedTodo);
        setEditMode(false);
    }

    const getDerivedClassNames = () => {
        return `${styles.todoItem} ${className ? className : ""}`
    }

    return (
        <article title={`Select to view '${selectTitle(todoEntity)}' details`}>
        {!editMode
            ? <TodoItemViewMode className={getDerivedClassNames()} 
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
