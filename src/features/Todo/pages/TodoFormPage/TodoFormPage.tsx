import { ReactElement } from "react";

import { TodoLayout } from "../../containers";
import { TodoProvider } from "../../providers";
import { TodoForm } from "../../components";

export const TodoFormPage = (): ReactElement => {
    return (
        <TodoProvider>
            <TodoLayout>
                <TodoForm />
            </TodoLayout>
        </TodoProvider> 
    );
}