import { ITodo, ITodoEntity } from "./types";
import { todoStorage } from "../data/todoStorage";

export function getInitialTodos (): ITodoEntity[] {
    return todoStorage.getTodos();
}

export function getEmptyDodo (): ITodo {
    return todoStorage.getNewTodo();
}

export function sortByAuthor (todoList: ITodoEntity[]): ITodoEntity[] {
    return todoList.slice().sort((a, b) => {
        const authorA = a.todo.author;
        const authorB = b.todo.author;
        return authorA.localeCompare(authorB);
    });
}

export function sortByDate (todoList: ITodoEntity[]): ITodoEntity[] {
    return todoList.slice().sort((a, b) => {
        const dateA = a.timestamp;
        const dateB = b.timestamp;
        if (dateA < dateB) { return -1; }
        else if (dateA > dateB) { return 1; }
        else { return 0; }
    });
}

export function StoreTodos (todos: ITodoEntity[]): void {
    todoStorage.saveTodos(todos);
}

export function StoreNewTodo (newTodo: ITodo): void {
    todoStorage.saveNewTodo(newTodo);
}
