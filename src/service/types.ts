export type ITodo = Readonly<{
    title: string;
    description: string;
}>

export interface ITodoEntity {
    id: string;
    todo: ITodo;
}