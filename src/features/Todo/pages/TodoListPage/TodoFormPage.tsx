import { ReactElement } from "react";

import { TodoLayout } from "../../layouts";
import { TodoProvider } from "../../providers";
import { TodoList } from "../../components";

export const TodoListPage = (): ReactElement => {
    return (
        <TodoProvider>
            <TodoLayout>
                <TodoList />
            </TodoLayout>
        </TodoProvider> 
    );
}