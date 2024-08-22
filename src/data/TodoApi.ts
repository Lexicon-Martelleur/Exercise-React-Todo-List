import { isTodoEntity, ITodoEntity } from "../service";
import { getTodoAPI } from "../config";
import { ITodoAPI } from "./ITodoApi";
import { APIError } from "./APIError";
import { IPaginationMetaData, isPaginationMetaData } from "../http"

class TodoAPI implements ITodoAPI {
    private readonly API = getTodoAPI();
    private readonly defaultHeader = {
        "Content-Type": "application/json",
    }

    async getTodos (): Promise<[ITodoEntity[], IPaginationMetaData]> {
        try {
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
        } catch (e) {
            throw new APIError(e instanceof Error ? e : undefined)
        }
    }

    async createTodo (todo: ITodoEntity): Promise<ITodoEntity> {
        try {
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
        } catch (e) {
            throw new APIError(e instanceof Error ? e : undefined)
        }
    }

    async deleteTodo (todoId: number): Promise<ITodoEntity> {
        throw new Error("Not implemented");
    }
    
    async updateTodo (todoId: number): Promise<ITodoEntity> {
        throw new Error("Not implemented");
    }
}

export const todoApi: ITodoAPI = new TodoAPI();