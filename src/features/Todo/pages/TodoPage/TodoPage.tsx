import { ReactElement } from "react";

import { BaseLayout } from "../../../../layout";
import { TodoList } from "../../components";
import { TodoProvider } from "../../providers";

export const TodoPage = (): ReactElement => {
    return (
        <BaseLayout>
            <TodoProvider>
                <TodoList />
            </TodoProvider>
        </BaseLayout> 
    )
}