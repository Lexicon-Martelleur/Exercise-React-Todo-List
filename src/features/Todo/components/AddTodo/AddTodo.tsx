import { ReactElement } from "react";

import { getEmptyDodo, ITodo } from "../../../../service";
import { useTodoContext } from "../../context";
import {
    addTodoAction,
    updateNewTodoAction
} from "../../state";

import { TodoForm } from "../TodoForm";

export const AddTodo = (): ReactElement => {
    const [dispatchTodoAction, todoState] = useTodoContext();
 
    const handleSubmit = (todo: ITodo) => {
        const emptyTodo = getEmptyDodo();
        dispatchTodoAction(updateNewTodoAction(emptyTodo));
        dispatchTodoAction(addTodoAction(todo));
    }

    const handleValueChange = (todo: ITodo) => {
        dispatchTodoAction(updateNewTodoAction(todo));
    }

    return (
        <TodoForm
            todo={todoState.newTodo}
            submitLabel="Add Task"
            onSubmit={handleSubmit}
            onValueChange={handleValueChange}/>
    )
}