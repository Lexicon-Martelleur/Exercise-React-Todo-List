import { ITodoEntity, IPaginationMetaData} from "../service";

export interface ITodoAPI {
    getTodos: (pageNr: number, signal?: AbortSignal) => Promise<[ITodoEntity[], IPaginationMetaData]>;
    createTodo: (todo: ITodoEntity, signal?: AbortSignal) => Promise<ITodoEntity>;
    deleteTodo: (todoId: number, signal?: AbortSignal) => Promise<ITodoEntity>;
    putTodo: (todo: ITodoEntity, signal?: AbortSignal) => Promise<ITodoEntity>;
    patchTodoDone: (todo: ITodoEntity, signal?: AbortSignal) => Promise<ITodoEntity>;
}
