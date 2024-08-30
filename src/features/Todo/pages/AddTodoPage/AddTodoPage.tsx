import { ReactElement } from "react";

import { TodoLayout } from "../../layouts";
import { AddTodo } from "../../components";

export const AddTodoPage = (): ReactElement => {
    return (
        <TodoLayout>
            <AddTodo />
        </TodoLayout> 
    );
}