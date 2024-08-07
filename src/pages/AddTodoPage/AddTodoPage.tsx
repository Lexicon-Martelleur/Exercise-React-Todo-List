import { ReactElement } from "react";

import { AddTodo, TodoLayout } from "../../features";

export const AddTodoPage = (): ReactElement => {
    return (
        <TodoLayout>
            <AddTodo />
        </TodoLayout> 
    );
}