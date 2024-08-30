import { isTodo, isTodoEntity, ITodo, ITodoEntity } from "../service";

class TodoStorage {
    private readonly _todosKey = "todos";
    private readonly _newTodoKey = "newTodo";

    constructor () {
        const todos = this.getTodos();
        if (todos.length === 0) {
            this.saveTodos([]);
        }
    }

    saveTodos (todos: ITodoEntity[]): void {
        localStorage.setItem(this._todosKey, JSON.stringify(todos));
    }

    saveNewTodo (todos: ITodo): void {
        localStorage.setItem(this._newTodoKey, JSON.stringify(todos));
    }

    getTodos (): ITodoEntity[] {
        const obj = localStorage.getItem(this._todosKey);
        if (obj === null) { return []; };
        
        const parsedObj = JSON.parse(obj);
        if (!Array.isArray(parsedObj) ||
           !parsedObj.every(isTodoEntity)) {
            return [];
        } else {
            return parsedObj;
        }
    }

    getNewTodo (): ITodo {
        const obj = localStorage.getItem(this._newTodoKey);
        if (obj === null) { return this._getEmptyDodo(); };
        
        const parsedObj = JSON.parse(obj);
        if (!isTodo(parsedObj)) {
            return this._getEmptyDodo();
        } else {
            return parsedObj;
        }
    }

    private _getEmptyDodo (): ITodo {
        return { title: "", author: "", description: "", done: false };
    }
}

export const todoStorage = new TodoStorage();
