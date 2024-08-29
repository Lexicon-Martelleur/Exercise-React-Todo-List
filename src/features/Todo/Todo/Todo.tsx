import { ReactElement, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useTodoStateManager } from "../hooks";
import { ErrorModal } from "../../../components";

export const Todo = (): ReactElement => {
    const [
		todoState,
		dispatchTodoAction
	] = useTodoStateManager();

    useEffect(()=> {
        console.log(todoState)
    })

    return (
        <>
           {todoState.isError && <ErrorModal
                title=""
                message=""
                onClose={() => {}} />}
            <Outlet context={[dispatchTodoAction, todoState]}/>  
        </>
    )
}
