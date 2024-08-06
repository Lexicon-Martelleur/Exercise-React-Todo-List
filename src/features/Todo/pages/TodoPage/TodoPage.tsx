import { ReactElement } from "react";

import { BaseLayout } from "../../../../layout";
import { Todo } from "../../containers";
import { TodoProvider } from "../../providers";

export const TodoPage = (): ReactElement => {
    return (
        <BaseLayout>
            <TodoProvider>
                <Todo />
            </TodoProvider>
        </BaseLayout> 
    );
}