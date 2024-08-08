import { ITodo, ITodoEntity } from "./types";

export function getInitialTodos (): ITodoEntity[] {
    return [
        {
            id: "1",
            timestamp: Date.now() + 5000000,
            todo: {
                title: "By food",
                author: "Lars",
                description: "coffe, apples, milk",
                done: false
            }
        },
        {
            id: "2",
            timestamp: Date.now(),
            todo: {
                title: "Read 3 books",
                author: "Mr. Nice",
                description: "Bittersweet, ...",
                done: false
            }
        },
        {
            id: "3",
            timestamp: Date.now() + 2000000,
            todo: {
                title: "Call friend",
                author: "Carl",
                description: "Ask what plan is next saturday",
                done: false
            }
        }
    ];
}

export function getEmptyDodo (): ITodo {
    return { title: "", author: "", description: "", done: false };
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
