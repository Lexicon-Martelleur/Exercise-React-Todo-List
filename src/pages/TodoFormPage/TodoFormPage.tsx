import { ReactElement } from "react";

import { TodoForm, TodoLayout } from "../../features";

export const TodoFormPage = (): ReactElement => {
    return (
        <TodoLayout>
            <TodoForm />
        </TodoLayout> 
    );
}