import React, { useContext } from "react";

import { ITodoEntity } from "../../../service/types";

export const TodoContext = React.createContext<Readonly<ITodoEntity[]> | null>(null);

export const useTodoContext = () => {
    const contextValue = useContext(TodoContext);
    if (contextValue == null) {
        throw new Error("useTodoContext must be used within a Provider");
    }
    return contextValue;
}
