import { ITodo, ITodoEntity } from "./types";

export function getInitialTodos (): ITodoEntity[] {
    return [
        {
            id: "1",
            timestamp: Date.now(),
            todo: {
                title: "By food",
                description: "coffe, apples, milk",
                done: false
            }
        },
        {
            id: "2",
            timestamp: Date.now(),
            todo: {
                title: "Read 3 books",
                description: "Bittersweet, ...",
                done: false
            }
        },
        {
            id: "3",
            timestamp: Date.now(),
            todo: {
                title: "Call friend",
                description: "Ask what plan is next saturday",
                done: false
            }
        }
    ];
}

export function getEmptyDodo (): ITodo {
    return { title: "", description: "", done: false };
}
