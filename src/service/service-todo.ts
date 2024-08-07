import { ITodo, ITodoEntity } from "./types";

export function getInitialTodos (): ITodoEntity[] {
    return [
        {
            id: "1",
            timestamp: Date.now(),
            todo: {
                title: "By food",
                author: "Joel",
                description: "coffe, apples, milk",
                done: false
            }
        },
        {
            id: "2",
            timestamp: Date.now(),
            todo: {
                title: "Read 3 books",
                author: "Joel",
                description: "Bittersweet, ...",
                done: false
            }
        },
        {
            id: "3",
            timestamp: Date.now(),
            todo: {
                title: "Call friend",
                author: "Joel",
                description: "Ask what plan is next saturday",
                done: false
            }
        }
    ];
}

export function getEmptyDodo (): ITodo {
    return { title: "", author: "", description: "", done: false };
}
