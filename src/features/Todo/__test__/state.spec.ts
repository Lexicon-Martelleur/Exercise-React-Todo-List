import * as TodoService from "../../../service";
import * as TodoState from "../state";

describe("Todo State", () => {
    const mockPrevTodo: TodoService.ITodo = {
        title: "prev title",
        author: "mock author",
        description: "prev description",
        done: false
    };

    const mockNextTodo: TodoService.ITodo = {
        title: "next title",
        author: "mock author",
        description: "next description",
        done: false
    };
    
    const mockInitTodoEntity: TodoService.ITodoEntity = {
        id: "1",
        timestamp: TodoService.getUNIXTimestampInSeconds(),
        todo: {
            title: "first title",
            author: "mock author",
            description: "first description",
            done: false
        }
    }
    
    const mockTodoState: TodoState.ITodoState = {
        newTodo: mockPrevTodo,
        latestHandledTodo: null,
        todoPagination: null,
        remoteTodos: [mockInitTodoEntity],
        isError: false,
        errorMessage: "Error message"
    };

    describe("todoReducer", () => {
        it("return state with replaced value for new todo", () => {
            const action = TodoState.updateNewTodoAction(mockNextTodo);
            const nextState = TodoState.todoReducer(mockTodoState, action);
            expect(nextState.newTodo).not.toBe(mockPrevTodo);
            expect(nextState.newTodo).toBe(mockNextTodo);
        });

        it("return state with added todo entity to the list of todos", () => {
            const todoEntity: TodoService.ITodoEntity = {
                id: "101",
                timestamp: 1,
                todo: mockNextTodo
            }
            const action = TodoState.addTodoAction(todoEntity.id, todoEntity.timestamp, mockNextTodo);
            const nextState = TodoState.todoReducer(mockTodoState, action);
            expect(nextState.latestHandledTodo).toStrictEqual(todoEntity);
        });

        it(`return state with toggled todo done value
            for specified todo entity`, () => {
            const indexTodo = 0;
            const startDoneValue = mockTodoState.remoteTodos[indexTodo].todo.done
            const action = TodoState.toggleTodoDoneAction(mockTodoState.remoteTodos[indexTodo].id);
            const nextState = TodoState.todoReducer(mockTodoState, action);
            expect(nextState.remoteTodos[indexTodo].todo.done).toBe(!startDoneValue);
        });

        it("return state with removed specified todo", () => {
            const indexTodo = 0;
            const action = TodoState.removeTodoAction(mockTodoState.remoteTodos[indexTodo].id);
            expect(mockTodoState.remoteTodos).toContain(mockInitTodoEntity);
            const nextState = TodoState.todoReducer(mockTodoState, action);
            expect(nextState.remoteTodos).not.toContain(mockInitTodoEntity);
        });

        it("return state with swaped todo items in the todo list", () => {
            const todoEntityA: TodoService.ITodoEntity = {
                id: "101",
                timestamp: 1,
                todo: mockNextTodo
            }
            const todoEntityB: TodoService.ITodoEntity = {
                id: "102",
                timestamp: 1,
                todo: mockNextTodo
            }
            mockTodoState.remoteTodos.push(todoEntityA);
            const todoAIndex = mockTodoState.remoteTodos.length - 1;
            mockTodoState.remoteTodos.push(todoEntityB);
            const todoBIndex = mockTodoState.remoteTodos.length - 1;
            
            const idTodoA = mockTodoState.remoteTodos[todoAIndex].id;
            const idTodoB = mockTodoState.remoteTodos[todoBIndex].id;
            
            const actionSwap = TodoState.swapTodoListItemsAction(idTodoA, idTodoB);
            const nextState = TodoState.todoReducer(mockTodoState, actionSwap);
            expect(nextState.remoteTodos[todoAIndex].id).toBe(idTodoB);
            expect(nextState.remoteTodos[todoBIndex].id).toBe(idTodoA);
        });

        it("return state with edited specified todo", () => {
            const indexTodo = 0;
            const editedTodo: TodoService.ITodo = {
                title: "edited title",
                author: "edited author",
                description: "edited description",
                done: false
            };
            const action = TodoState.editTodoAction(
                mockTodoState.remoteTodos[indexTodo].id,
                editedTodo);
            expect(mockTodoState.remoteTodos).toContain(mockInitTodoEntity);
            const nextState = TodoState.todoReducer(mockTodoState, action);
            expect(nextState.remoteTodos[indexTodo].todo).toStrictEqual(editedTodo);
        });

        it("return state with updated pagination state", () => {
            const newPaginationData: TodoService.IPaginationData = {
                TotalItemCount: 100,
                TotalPageCount: 10,
                PageSize: 10,
                PageNr: 3
            }
            const action = TodoState.updateTodoPaginationAction(newPaginationData);
            const nextState = TodoState.todoReducer(mockTodoState, action);
            expect(nextState.todoPagination).toStrictEqual(newPaginationData);
        });

        it("return state updated with error state", () => {
            const isError = true;
            const errorMsg = "New Error message";
            const action = TodoState.updateTodoErrorStateAction(
                isError,
                errorMsg);
            const nextState = TodoState.todoReducer(mockTodoState, action);
            expect(nextState.isError).toStrictEqual(isError);
            expect(nextState.errorMessage).toStrictEqual(errorMsg);
        });
    });

    describe("addTodoAction", () => {
        it(`return an action of type add new todo
            with payload value same as input parameter`, () => {
            const todoEntity: TodoService.ITodoEntity = {
                id: "101",
                timestamp: 1,
                todo: mockNextTodo
            }
            const action = TodoState.addTodoAction(todoEntity.id, todoEntity.timestamp, mockNextTodo);
            expect(action.type).toBe(TodoState.TodoActionType.addTodo);
            expect(action.payload).toStrictEqual({
                id: todoEntity.id,
                timestamp: todoEntity.timestamp,
                todo: todoEntity.todo
            });
        });
    });

    describe("updateNewTodoAction", () => {
        it(`return an action of type add new todo
            with payload value same as input parameter`, () => {
            const action = TodoState.updateNewTodoAction(mockNextTodo);
            expect(action.type).toBe(TodoState.TodoActionType.updateNewTodo);
            expect(action.payload).toBe(mockNextTodo);
        });
    });

    describe("toggleTodoDoneAction", () => {
        it(`return an action of type toggle todo done
            with payload value same as input parameter`, () => {
            const inPara = "2"
            const action = TodoState.toggleTodoDoneAction(inPara);
            expect(action.type).toBe(TodoState.TodoActionType.toggleTodoDone);
            expect(action.payload).toBe(inPara);
        });
    });

    describe("removeTodoAction", () => {
        it(`return an action of type remove todo
            with payload value same as input parameter`, () => {
            const inPara = "2"
            const action = TodoState.removeTodoAction(inPara);
            expect(action.type).toBe(TodoState.TodoActionType.removeTodo);
            expect(action.payload).toBe(inPara);
        });
    });

    describe("swapTodoListItems", () => {
        it(`return an action of type swap todo items
            with payload value same as input parameter`, () => {
            const idTodoA = "2"
            const idTodoB = "3"
            const action = TodoState.swapTodoListItemsAction(idTodoA, idTodoB);
            expect(action.type).toBe(TodoState.TodoActionType.swapTodoListItems);
            expect(action.payload).toStrictEqual({ idTodoA, idTodoB });
        });
    });

    describe("editTodoAction", () => {
        it(`return an action of type edit todo
            with payload value same as input parameter`, () => {
            const id = "2";
            const editedTodo: TodoService.ITodo = {
                title: "edited title",
                author: "edited author",
                description: "edited description",
                done: false
            };
            const action = TodoState.editTodoAction(id, editedTodo);
            expect(action.type).toBe(TodoState.TodoActionType.editTodo);
            expect(action.payload).toStrictEqual({id, editedTodo});
        });
    });

    describe("updateTodoPaginationAction", () => {
        it(`return an action of type update todo pagination
            with payload value same as input parameter`, () => {
            const paginationData: TodoService.IPaginationData = {
                TotalItemCount: 100,
                TotalPageCount: 10,
                PageSize: 10,
                PageNr: 3
            };
            const action = TodoState.updateTodoPaginationAction(paginationData);
            expect(action.type).toBe(TodoState.TodoActionType.updateTodoPagination);
            expect(action.payload).toStrictEqual(paginationData);
        });
    });

    describe("updateTodoErrorStateAction", () => {
        it(`return an action of type update todo error state
            with payload value same as input parameter`, () => {
            const isError = true;
            const errorMsg = "Error Message"
            const action = TodoState.updateTodoErrorStateAction(isError, errorMsg);
            expect(action.type).toBe(TodoState.TodoActionType.updateErrorState);
            expect(action.payload).toStrictEqual({ isError, errorMsg });
        });

        it("return default erromessage set to empty", () => {
            const isError = true;
            const emptyMessage = "";
            const action = TodoState.updateTodoErrorStateAction(isError);
            expect(action.type).toBe(TodoState.TodoActionType.updateErrorState);
            expect(action.payload).toStrictEqual({
                isError, errorMsg: emptyMessage
            });
        });
    });
});