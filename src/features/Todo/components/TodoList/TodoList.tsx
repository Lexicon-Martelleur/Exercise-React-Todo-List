import React, { ReactElement, useState } from "react";

import { useTodoContext } from "../../context";
import { ITodo, sortByAuthor, sortByDate } from "../../../../service";
import {
    editTodoAction,
    removeTodoAction,
    toggleTodoDoneAction
} from "../../state";
import { SelectMenu } from "../../../../components";
import { TodoItem } from "../TodoItem";

import styles from "./TodoList.module.css";

const sortMode = {
    author: "Sort by author",
    date: "Sort by date",
    none: "Not sorted"
} as const;

type SortModeType = typeof sortMode[
    keyof typeof sortMode
];

export const TodoList = (): ReactElement => {
    const [
        selectedSortMode,
        setSelectedSortMode
    ] = useState<SortModeType>(sortMode.none);
    const [dispatchTodoAction, todoState] = useTodoContext();

    const handleToggleDone = (id: string) => {
        dispatchTodoAction(toggleTodoDoneAction(id));
    }

    const handleRemoveTodo = (id: string) => {
        dispatchTodoAction(removeTodoAction(id));
    }

    const handleEditTodo = (id: string, editedTodo: ITodo) => {
        dispatchTodoAction(editTodoAction(id, editedTodo));
    }

    const getTodoList = (mode: SortModeType) => {
        switch (mode) {
            case sortMode.author: return sortByAuthor(todoState.todoList);
            case sortMode.date: return sortByDate(todoState.todoList);
            case sortMode.none: return todoState.todoList
            default: return todoState.todoList;
        }
    }

    const handleSelectSortMode: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedSortMode(event.target.value as SortModeType)
    }

    return (
        <section className={styles.todoList}>
            <SelectMenu title={`${todoState.todoList.length} Todos`}
                options={Object.values(sortMode)}
                selectedOption={selectedSortMode}
                onOptionChange={handleSelectSortMode} />
            {getTodoList(selectedSortMode).map(entity => (
                <TodoItem
                    key={entity.id}
                    todoEntity={entity}
                    onToggleDone={handleToggleDone}
                    onRemoveTodoItem={handleRemoveTodo}
                    onEditTodoItem={handleEditTodo} />
            ))}
        </section>
    );
}
