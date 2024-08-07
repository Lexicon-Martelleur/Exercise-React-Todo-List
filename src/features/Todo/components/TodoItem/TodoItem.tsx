import { ReactElement, useRef, useState } from "react";

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
    const todoDescriptionRef = useRef<HTMLParagraphElement>(null);
    const [editMode, setEditMode] = useState(false);

    const handleToggleViewDescription = () => {
        if (todoDescriptionRef.current == null) { return; }
        todoDescriptionRef.current.classList.toggle(styles.none);
    }

    const handleToggleEditMode = () => {
        setEditMode(prevValue => !prevValue);
    }

    const handleToggleDone: React.MouseEventHandler<HTMLButtonElement> = (event) => {
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
            ? <TodoItemViewMode todoEntity={todoEntity}
                todoDescriptionRef={todoDescriptionRef}
                onToggleViewDescription={handleToggleViewDescription}
                onToggleEditMode={handleToggleEditMode}
                onToggleDone={handleToggleDone}
                onRemoveTodoItem={onRemoveTodoItem}/>
            : <TodoItemEditMode todoEntity={todoEntity}
                onSubmitEditTodo={handleSubmitEditTodo}
                onToggleEditMode={handleToggleEditMode} />
        }</article>
    );
}
