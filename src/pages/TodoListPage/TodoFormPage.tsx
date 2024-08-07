import { ReactElement } from "react";

import { TodoList, TodoLayout } from "../../features";

export const TodoListPage = (): ReactElement => {
    return (
        <TodoLayout>
            <TodoList />
        </TodoLayout> 
    );
}