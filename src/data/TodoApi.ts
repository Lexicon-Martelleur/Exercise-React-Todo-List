import { getTodoAPI } from "../config";
import { ITodoAPI } from "./ITodoApi";
import { APIError } from "./APIError";
import { createAPIProxy } from "./APIProxy";
import {
    IPaginationData,
    isPaginationData,
    isTodoEntity,
    ITodoEntity
} from "../types";

class TodoAPI implements ITodoAPI {
    private readonly API = getTodoAPI();
    private readonly nrOfTodos = 10;
    
    private readonly defaultHeader = {
        "Content-Type": "application/json",
    };

    async getTodos (
        pageNr: number,
        signal?: AbortSignal
    ): Promise<[ITodoEntity[], IPaginationData]> {
        const url = `${this.API}/todo?pageSize=${this.nrOfTodos}&pageNr=${pageNr}`
        const res = await fetch(url, {
            headers: this.defaultHeader,
            signal
        });
        if(!res.ok) { throw new APIError(res.statusText); }
        const todos = await res.json() as ITodoEntity[];
        const todoList = todos.map(item => {
            return {
                ...item,
                id: `${item.id}`,
                timestamp: Number(item.timestamp),
        }})
        
        
        const paginationData = JSON.parse(res.headers.get("X-Pagination") ?? "");
        if (todoList.every(isTodoEntity) &&
        isPaginationData(paginationData)) {
                return [todoList, paginationData];
        } else {
            throw new APIError();
        }
    }

    async createTodo (
        todo: ITodoEntity,
        signal?: AbortSignal
    ): Promise<ITodoEntity> {
        const res = await fetch(`${this.API}/todo`, {
            headers: this.defaultHeader,
            method: "POST",
            signal,
            body: JSON.stringify({
                timestamp: `${todo.timestamp}`,
                todo: todo.todo
            }),
        })
        if(!res.ok) { throw new APIError(res.statusText); }
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

    async deleteTodo (todoId: number, signal?: AbortSignal): Promise<ITodoEntity> {
        const res = await fetch(`${this.API}/todo/${todoId}`, {
            headers: this.defaultHeader,
            method: "DELETE",
            signal
        })

        if (res.ok) {
            return await res.json();    
        } else {
            throw new APIError(res.statusText);
        }
    }
    
    async putTodo (
        todo: ITodoEntity,
        signal?: AbortSignal
    ): Promise<ITodoEntity> {
        const id = Number(todo.id);
        const res = await fetch(`${this.API}/todo/${id}`, {
            headers: this.defaultHeader,
            method: "PUT",
            signal,
            body: JSON.stringify({
                id,
                timestamp: `${todo.timestamp}`,
                todo: todo.todo
            }),
        })
        if(!res.ok) { throw new APIError(res.statusText); }
        const updatedTodo = await res.json() as ITodoEntity;
        const todoEntity = {
            ...updatedTodo,
            id: `${updatedTodo.id}`,
            timestamp: Number(updatedTodo.timestamp)
        }
        if (isTodoEntity(todoEntity)) {
            return updatedTodo;
        } else {
            throw new APIError()
        }
    }

    async patchTodoDone (
        todo: ITodoEntity,
        signal?: AbortSignal
    ): Promise<ITodoEntity> {
        const id = Number(todo.id);
        const res = await fetch(`${this.API}/todo/${id}`, {
            headers: this.defaultHeader,
            method: "PATCH",
            signal,
            body: JSON.stringify([
                {
                    op: "replace",
                    path: "/done",
                    value: todo.todo.done
                } 
            ]),
        })
        if(!res.ok) { throw new APIError(res.statusText); }
        const updatedTodo: ITodoEntity = await res.json();
        const todoEntity = {
            ...updatedTodo,
            id: `${updatedTodo.id}`,
            timestamp: Number(updatedTodo.timestamp)
        }
        if (isTodoEntity(todoEntity)) {
            return updatedTodo;
        } else {
            throw new APIError()
        }
    }
}

const defaultTodoApi: ITodoAPI = new TodoAPI();
export const todoApi = createAPIProxy(defaultTodoApi);
