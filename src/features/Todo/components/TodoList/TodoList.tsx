import { ReactElement, useEffect, useRef, useState } from "react";

import { useTodoContext } from "../../context";
import * as TodoService from "../../../../service";
import * as TodoState from "../../state";
import * as Components from "../../../../components";
import { TodoItem } from "../TodoItem";
import { TodoSynchronizer } from "../TodoSynchronizer";
import { useTodoQuery } from "../../hooks";

import styles from "./TodoList.module.css";
import { ITodoEntity } from "../../../../types";

const sortMode = {
    author: "Sort by author",
    dateOldest: "Sort by oldest date",
    dateLatest: "Sort by latest date"
} as const;

type SortModeType = typeof sortMode[
    keyof typeof sortMode
];

export const TodoList = (): ReactElement => {
    const [
        selectedSortMode,
        setSelectedSortMode
    ] = useState<SortModeType>(sortMode.dateLatest);
    const [dispatchTodoAction, todoState] = useTodoContext();
    const [draggedId, setDraggedId] = useState<string | undefined>(undefined);
    const [draggedOverId, setDraggedOverId] = useState<string | undefined>(undefined);
    const todoQueryHook = useTodoQuery(dispatchTodoAction);
    const latestEditedtTodoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
		const page = TodoState.selectTodoPage(todoState);
		todoQueryHook.getTodos(page);
	}, []);

    useEffect(() => {
        latestEditedtTodoRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, [todoState])

    const handleToggleDone = (todo: ITodoEntity) => {
        dispatchTodoAction(TodoState.toggleTodoDoneAction(todo.id));
        todoQueryHook.patchTodoDone(todo);
    }

    const handleRemoveTodo = (todo: ITodoEntity) => {
        dispatchTodoAction(TodoState.removeTodoAction(todo.id));
        todoQueryHook.deleteTodo(todo, TodoState.selectTodoPage(todoState));
    }

    const handleEditTodo = (todo: ITodoEntity) => {
        dispatchTodoAction(TodoState.editTodoAction(todo.id, todo.todo));
        todoQueryHook.putTodo(todo);
    }

    const getTodoList = (mode: SortModeType) => {
        const todos = TodoState.selectRemoteTodos(todoState);
        switch (mode) {
            case sortMode.author: return TodoService.sortByAuthor(todos);
            case sortMode.dateOldest: return TodoService.sortByOldestDateFirst(todos);
            case sortMode.dateLatest: return TodoService.sortByLatestDateFirst(todos)
            default: return todos;
        }
    }

    const handleSelectSortMode = (option: string) => {
        if (Object.values(sortMode).includes(option as SortModeType)) {
            setSelectedSortMode(option as SortModeType)
        } else {
            setSelectedSortMode(option as SortModeType)
        }
    }

    const updateDraggedId = (id: string | undefined) => {
        setDraggedId(id);
    }

    const updateDraggedOverId = (id: string | undefined) => {
        setDraggedOverId(id);
    }

    const handleDrop = () => {
        if (draggedId == null || draggedOverId == null) { return; }
        dispatchTodoAction(TodoState.swapTodoListItemsAction(draggedId, draggedOverId));
    }

    const handleNextPage = () => {
        const page = TodoState.selectTodoPage(todoState) + 1
		todoQueryHook.getTodos(page);
    }

    const handlePrevPage = () => {
        const page = TodoState.selectTodoPage(todoState) - 1			
		todoQueryHook.getTodos(page);
    }

    const isLatestEditedTodo = (todo: ITodoEntity) => {
        const latestTodoId = TodoState.selectLatestTodo(todoState)?.id
        if (latestTodoId == null) { return false; }
        return todo.id === latestTodoId;
    }

    if (todoQueryHook.pending) {
        return <Components.Loader />
    }

    return (
        <section className={styles.todoList}>
            <TodoSynchronizer />
            {todoState.todoPagination != null && <Components.PageNavigation
                page={TodoState.selectTodoPage(todoState)}
                nrOfPages={TodoState.selectNrOfTodoPages(todoState)}
                onPrev={handlePrevPage}
                onNext={handleNextPage} />
            }
            <Components.SelectMenu
                title={`${TodoState.selectNrOfTodoItems(todoState)} Stored Todos`}
                options={Object.values(sortMode)}
                selectedOption={selectedSortMode}
                onSelect={handleSelectSortMode} />
            {getTodoList(selectedSortMode).map(entity => (
                <Components.DraggableContainer
                    key={entity.id}
                    childId={entity.id}
                    className={styles.draggedTodoItem}
                    onDragged={updateDraggedId}
                    onDraggedOver={updateDraggedOverId}
                    onDrop={handleDrop}>
                    <TodoItem
                        todoEntity={entity}
                        className={isLatestEditedTodo(entity) ? styles.todoItemLatest : ""}
                        onToggleDone={handleToggleDone}
                        onRemoveTodoItem={handleRemoveTodo}
                        onEditTodoItem={handleEditTodo} />
                    {isLatestEditedTodo(entity) && <div ref={latestEditedtTodoRef}></div>}
                </Components.DraggableContainer>
            ))}
            {todoState.todoPagination != null && <Components.PageNavigation
                page={TodoState.selectTodoPage(todoState)}
                nrOfPages={TodoState.selectNrOfTodoPages(todoState)}
                onPrev={handlePrevPage}
                onNext={handleNextPage} />
            }
        </section>
    );
}
