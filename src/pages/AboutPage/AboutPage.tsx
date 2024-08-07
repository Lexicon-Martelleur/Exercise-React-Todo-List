import { ReactElement } from "react";

import { About, TodoLayout } from "../../features";

export const AboutPage = (): ReactElement => {
    return (
        <TodoLayout>
            <About />
        </TodoLayout> 
    );
}
