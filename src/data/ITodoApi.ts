import { IPaginationMetaData } from "../http";
import { ITodoEntity } from "../service";

export interface ITodoAPI {
    getTodos: () => Promise<[ITodoEntity[], IPaginationMetaData]>;
    createTodo: (todo: ITodoEntity) => Promise<ITodoEntity>;
    deleteTodo: (todoId: number) => Promise<ITodoEntity>;
    updateTodo: (todoId: number) => Promise<ITodoEntity>;
}
