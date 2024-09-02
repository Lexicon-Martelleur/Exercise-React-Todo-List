import * as TodoService from "../service";

class TodoStorage {
    private readonly _failedTodosKey = "failedStoredTodos";
    private readonly _newTodoKey = "newTodo";

    saveFailedRemoteStoredTodo (todo: TodoService.ITodoEntity): void {
        const todos = this.getFailedRemoteStoredTodos();
        todos.push(todo);
        localStorage.setItem(this._failedTodosKey, JSON.stringify(todos));
    }

    emptyFailedRemoteStoredTodo (): void {
        localStorage.setItem(this._failedTodosKey, JSON.stringify([]));
    }

    saveNewTodo (todos: TodoService.ITodo): void {
        localStorage.setItem(this._newTodoKey, JSON.stringify(todos));
    }

    getFailedRemoteStoredTodos (): TodoService.ITodoEntity[] {
        const obj = localStorage.getItem(this._failedTodosKey);
        if (obj === null) { return []; };
        const parsedObj = JSON.parse(obj);
        if (!Array.isArray(parsedObj) ||
           !parsedObj.every(TodoService.isTodoEntity)) {
            return [];
        } else {
            return parsedObj;
        }
    }

    getNewTodo (): TodoService.ITodo {
        const obj = localStorage.getItem(this._newTodoKey);
        if (obj === null) { return this._getEmptyDodo(); };
        
        const parsedObj = JSON.parse(obj);
        if (!TodoService.isTodo(parsedObj)) {
            return this._getEmptyDodo();
        } else {
            return parsedObj;
        }
    }

    private _getEmptyDodo (): TodoService.ITodo {
        return { title: "", author: "", description: "", done: false };
    }
}

export const todoStorage = new TodoStorage();
