export type ITodo = Readonly<{
    title: string;
    author: string;
    description: string;
    done: boolean
}>

export interface ITodoEntity {
    id: string;
    timestamp: number;
    todo: ITodo;
}