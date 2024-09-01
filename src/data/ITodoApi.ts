import { ITodoEntity, IPaginationData } from "../service";

export interface ITodoAPI {
    getTodos: (
        pageNr: number,
        signal?: AbortSignal
    ) => Promise<[ITodoEntity[], IPaginationData]>;
    
    createTodo: (
        todo: ITodoEntity,
        signal?: AbortSignal
    ) => Promise<ITodoEntity>;
    
    deleteTodo: (
        todoId: number,
        signal?: AbortSignal
    ) => Promise<ITodoEntity>;
    
    putTodo: (
        todo: ITodoEntity,
        signal?: AbortSignal
    ) => Promise<ITodoEntity>;
    
    patchTodoDone: (
        todo: ITodoEntity,
        signal?: AbortSignal
    ) => Promise<ITodoEntity>;
}
