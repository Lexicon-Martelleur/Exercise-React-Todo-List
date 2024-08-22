import { isTodoEntity, ITodoEntity } from "../service";
import { getTodoAPI } from "../config";
import { ITodoAPI } from "./ITodoApi";
import { APIError } from "./APIError";
import { createAPIProxy } from "./APIProxy";
import { IPaginationMetaData, isPaginationMetaData } from "../http"

class TodoAPI implements ITodoAPI {
    private readonly API = getTodoAPI();
    private readonly defaultHeader = {
        "Content-Type": "application/json",
    }

    async getTodos (): Promise<[ITodoEntity[], IPaginationMetaData]> {
        const res = await fetch(`${this.API}/todo`);
        const todos = await res.json() as ITodoEntity[];
        const todoList = todos.map(item => {
            return {
                ...item,
                id: `${item.id}`,
                timestamp: Number(item.timestamp),
        }})
        const paginationMetaData = JSON.parse(res.headers.get("X-Pagination") ?? "");
        if (todoList.every(isTodoEntity) &&
            isPaginationMetaData(paginationMetaData)) {
                return [todoList, paginationMetaData];
        } else {
            throw new APIError();
        }
    }

    async createTodo (todo: ITodoEntity): Promise<ITodoEntity> {
        const res = await fetch(`${this.API}/todo`, {
            headers: this.defaultHeader,
            method: "POST",
            body: JSON.stringify({
                timestamp: `${todo.timestamp}`,
                todo: todo.todo
            }),
        })

        const createdTodo = await res.json() as ITodoEntity;
        const todoEntity = {
            ...createdTodo,
            id: `${createdTodo.id}`,
            timestamp: Number(createdTodo.timestamp),
        }

        if (isTodoEntity(todoEntity)) {
            return todoEntity;
        } else {
            throw new APIError()
        }
    }

    async deleteTodo (todoId: number): Promise<ITodoEntity> {
        throw new Error("Not implemented");
    }
    
    async putTodo (todo: ITodoEntity): Promise<ITodoEntity> {
        throw new Error("Not implemented");
    }

    async patchTodoDone (todo: ITodoEntity): Promise<ITodoEntity> {
        throw new Error("Not implemented");
    }
}

const defaultTodoApi: ITodoAPI = new TodoAPI();
export const todoApi = createAPIProxy(defaultTodoApi);
