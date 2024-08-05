import React, { ReactElement } from "react";

import { TodoContext } from "../context";
import { todos } from "../state";

interface Props {
  children?: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({
    children
}): ReactElement => {

  return (
    <TodoContext.Provider value={todos}>
      {children}
    </TodoContext.Provider>
  );
}
