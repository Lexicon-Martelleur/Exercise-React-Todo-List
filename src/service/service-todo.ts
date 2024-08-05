import { ITodoEntity } from "./types";

export function getTodos (): ITodoEntity[] {
    return [
        {
            id: "1",
            todo: {
                title: "By food",
                description: "coffe, apples, milk"
            }
        },
        {
            id: "2",
            todo: {
                title: "Read 3 books",
                description: "Bittersweet, ..."
            }
        },
        {
            id: "3",
            todo: {
                title: "Call frien",
                description: "Ask what plan is next saturday"
            }
        }
    ];
}
