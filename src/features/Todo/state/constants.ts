export const TodoActionType = {
    updateNewTodo: "UPDATE_NEW_TODO",
    addTodo: "ADD_TODO",
    addTodoEntities: "ADD_TODO_ENTITIES",
    updateTodoPagination: "UPDATE_TODO_PAGINATION",
    removeTodo: "REMOVE_TODO",
    editTodo: "EDIT_TODO",
    toggleTodoDone: "TOGGLE_TODO_DONE",
    swapTodoListItems: "SWAP_TODO_LIST_ITEMS",
    updateErrorState: "UPDATE_ERROR_STATE",
    addFailedStoredTodos: "ADD_FAILED_STORED_TODOS"
} as const
