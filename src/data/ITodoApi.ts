import { ITodoEntity } from "../service";

export interface ITodoAPI {
    getTodos: () => Promise<ITodoEntity[]>;
    createTodo: (todo: ITodoEntity) => Promise<ITodoEntity>;
    deleteTodo: (todoId: number) => Promise<ITodoEntity>;
    updateTodo: (todoId: number) => Promise<ITodoEntity>;
}
