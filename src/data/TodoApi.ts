import { isTodoEntity, ITodoEntity } from "../service";
import { ITodoAPI } from "./ITodoApi"

class TodoAPI implements ITodoAPI {
    private readonly API = "http://192.168.0.36:5114/api"

    async getTodos (): Promise<ITodoEntity[]> {
        try {
            const res = await fetch(`${this.API}/todo`);
            const todos = await res.json() as ITodoEntity[];
            const todoList = todos.map(item => {
                return {
                    ...item,
                    id: `${item.id}`,
                    timestamp: Number(item.timestamp),
            }})
            if (todoList.every(isTodoEntity)) {
                return todoList;
            } else {
                throw new Error("API error");
            }
        } catch (e) {
            console.log(e);
            throw new Error("API error");
        }
    }

    async createTodo (todo: ITodoEntity): Promise<ITodoEntity> {
        try {
            const res = await fetch(`${this.API}/todo`, {
                headers: {
                    "Content-Type": "application/json",
                },
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
                throw new Error("API error")
            }
        } catch (e) {
            console.log(e);
            throw new Error("API error");
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