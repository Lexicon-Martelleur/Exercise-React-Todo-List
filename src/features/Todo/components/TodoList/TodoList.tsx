import { ReactElement } from "react";

import { useTodoContext } from "../../context";
import { ITodo } from "../../../../service";
import {
    editTodoAction,
    removeTodoAction,
    toggleTodoDoneAction
} from "../../state";
import { TodoItem } from "../TodoItem";

import styles from "./TodoList.module.css";


export const TodoList = (): ReactElement => {
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

    return (
        <section className={styles.todoList}>
            {todoState.todoList.map(entity => (
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
