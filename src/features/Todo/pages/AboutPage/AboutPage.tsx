import { ReactElement } from "react";

import { TodoLayout } from "../../layouts";
import { About } from "../../components";

export const AboutPage = (): ReactElement => {
    return (
        <TodoLayout>
            <About />
        </TodoLayout> 
    );
}
