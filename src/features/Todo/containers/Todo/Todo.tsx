import { ReactElement } from "react";

import { TodoList, TodoForm } from "../../components";
import { useTodoContext } from "../../context";
import { getEmptyDodo, ITodo } from "../../../../service";
import { addTodoAction, toggleTodoDoneAction, updateNewTodoAction } from "../../state";

import styles from "./Todo.module.css";

export const Todo = (): ReactElement => {
    const [dispatchTodoAction, todoState] = useTodoContext();
    const addNewTodo = (todo: ITodo) => {
        dispatchTodoAction(updateNewTodoAction(getEmptyDodo()));
        dispatchTodoAction(addTodoAction(todo));
    }

    const handleToggleDone = (id: string) => {
        dispatchTodoAction(toggleTodoDoneAction(id));
    }

    return (
        <section className={styles.todoSection}>
            <div>
                <h1>Todo List</h1>
                <p>Stay organized and productive.</p>
            </div>
            <TodoForm 
                newTodo={todoState.newTodo}
                addNewTodo={addNewTodo} />
            <TodoList
                todoList={todoState.todoList}
                toggleDone={handleToggleDone} />
        </section>
    );
}