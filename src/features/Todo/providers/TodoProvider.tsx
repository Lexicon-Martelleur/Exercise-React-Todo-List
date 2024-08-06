import React, { ReactElement, useReducer } from "react";

import { TodoContext } from "../context";
import { todoInitData, todoReducer } from "../state";

interface Props {
    children?: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({
	children
}): ReactElement => {

  const [
	  todoState,
	  dispatchTodoAction
  ] = useReducer(todoReducer, todoInitData);

  return (
	  <TodoContext.Provider value={[dispatchTodoAction, todoState]}>
	  	  {children}
	  </TodoContext.Provider>
  );
}
