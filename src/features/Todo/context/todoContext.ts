import React, { useContext } from "react";

import {ITodoState, ITodoAction } from "../state";

export const TodoContext = React.createContext<[
    React.Dispatch<ITodoAction>,
    ITodoState
] | null>(null);

export const useTodoContext = () => {
    const contextValue = useContext(TodoContext);
    if (contextValue == null) {
        throw new Error("useTodoContext must be used within a Provider");
    }
    return contextValue;
}
