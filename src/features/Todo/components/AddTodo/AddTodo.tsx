import { ReactElement } from "react";
import { v4 as uuid } from "uuid";

import * as TodoService from "../../../../service";
import { useTodoContext } from "../../context";
import * as TodoState from "../../state";
import { useTodoQuery } from "../../hooks";
import { TodoForm } from "../TodoForm";
import { ErrorModal, FullScreenLoader } from "../../../../components";
import { ITodo, ITodoEntity } from "../../../../types";

export const AddTodo = (): ReactElement => {
    const [dispatchTodoAction, todoState] = useTodoContext();
    const todoQueryHook = useTodoQuery(dispatchTodoAction);
 
    const handleSubmitAddTodo = (todo: ITodo) => {
        const emptyTodo = TodoService.getEmptyTodo();
        dispatchTodoAction(TodoState.updateNewTodoAction(emptyTodo));
        const timestamp = TodoService.getUNIXTimestampInSeconds();
        const id = uuid();
        const pageNr = TodoState.selectTodoPage(todoState);
        const todoEntity: ITodoEntity = { id, timestamp, todo };  
        dispatchTodoAction(TodoState.addTodoAction(id, timestamp, todo));
        todoQueryHook.createTodo(todoEntity, pageNr);
    }

    const handleValueChange = (todo: ITodo) => {
        dispatchTodoAction(TodoState.updateNewTodoAction(todo));
    }

    const handleCloseError = () => {
        todoQueryHook.clearErrorState();
    }

    return (
        <>
            {todoQueryHook.pending && <FullScreenLoader /> }
            {todoState.isError && <ErrorModal
                title={"Error"}
                message={todoState.errorMessage}
                onClose={handleCloseError} />
            }
            <TodoForm
                todo={todoState.newTodo}
                submitLabel="Add Task"
                onSubmit={handleSubmitAddTodo}
                onValueChange={handleValueChange}>
            </TodoForm>
        </>
    );
}
