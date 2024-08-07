import { useOutletContext } from "react-router-dom";

import {ITodoState, ITodoAction } from "../state";

export const useTodoContext = () => {
    return useOutletContext<[
        React.Dispatch<ITodoAction>,
        ITodoState
    ]>();
}