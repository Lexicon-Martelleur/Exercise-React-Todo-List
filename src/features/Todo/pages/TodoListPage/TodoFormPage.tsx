import { ReactElement } from "react";

import { TodoLayout } from "../../layouts";
import { TodoList } from "../../components";

export const TodoListPage = (): ReactElement => {
    return (
        <TodoLayout>
            <TodoList />
        </TodoLayout> 
    );
}