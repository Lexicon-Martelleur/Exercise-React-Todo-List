export type ITodo = Readonly<{
    title: string;
    description: string;
    done: boolean
}>

export interface ITodoEntity {
    id: string;
    todo: ITodo;
}