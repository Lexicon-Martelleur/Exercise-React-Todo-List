import { IPaginationData, ITodo, ITodoEntity } from "../../../service";
import {
    addTodoAction,
    editTodoAction,
    removeTodoAction,
    swapTodoListItemsAction,
    toggleTodoDoneAction,
    updateNewTodoAction,
    updateTodoErrorStateAction,
    updateTodoPaginationAction
} from "../state/actions";
import { TodoActionType } from "../state/constants";
import { todoReducer } from "../state/reducer";
import { ITodoState } from "../state/types";

describe("Todo State", () => {
    const mockPrevTodo: ITodo = {
        title: "prev title",
        author: "mock author",
        description: "prev description",
        done: false
    };

    const mockNextTodo: ITodo = {
        title: "next title",
        author: "mock author",
        description: "next description",
        done: false
    };
    
    const mockInitTodoEntity: ITodoEntity = {
        id: "1",
        timestamp: Date.now(),
        todo: {
            title: "first title",
            author: "mock author",
            description: "first description",
            done: false
        }
    }
    
    const mockTodoState: ITodoState = {
        newTodo: mockPrevTodo,
        latestHandledTodo: null,
        todoPagination: null,
        serverFetchedTodoList: [mockInitTodoEntity],
        serverFailedTodoList: [],
        isError: false,
        errorMessage: "Error message"
    };

    describe("todoReducer", () => {
        it("return state with replaced value for new todo", () => {
            const action = updateNewTodoAction(mockNextTodo);
            const nextState = todoReducer(mockTodoState, action);
            expect(nextState.newTodo).not.toBe(mockPrevTodo);
            expect(nextState.newTodo).toBe(mockNextTodo);
        });

        it("return state with added todo entity to the list of todos", () => {
            const action = addTodoAction(mockNextTodo);
            const nextState = todoReducer(mockTodoState, action);
            expect(nextState.serverFetchedTodoList.map(entity => (
                entity.todo
            ))).toContain(mockNextTodo);
        });

        it(`return state with toggled todo done value
            for specified todo entity`, () => {
            const indexTodo = 0;
            const startDoneValue = mockTodoState.serverFetchedTodoList[indexTodo].todo.done
            const action = toggleTodoDoneAction(mockTodoState.serverFetchedTodoList[indexTodo].id);
            const nextState = todoReducer(mockTodoState, action);
            expect(nextState.serverFetchedTodoList[indexTodo].todo.done).toBe(!startDoneValue);
        });

        it("return state with removed specified todo", () => {
            const indexTodo = 0;
            const action = removeTodoAction(mockTodoState.serverFetchedTodoList[indexTodo].id);
            expect(mockTodoState.serverFetchedTodoList).toContain(mockInitTodoEntity);
            const nextState = todoReducer(mockTodoState, action);
            expect(nextState.serverFetchedTodoList).not.toContain(mockInitTodoEntity);
        });

        it("return state with swaped todo items in the todo list", () => {
            const todoAIndex = mockTodoState.serverFetchedTodoList.length - 1;
            const todoBIndex = todoAIndex + 1;

            const actionAdd = addTodoAction(mockNextTodo);
            const nextState = todoReducer(mockTodoState, actionAdd);
            const idTodoA = nextState.serverFetchedTodoList[todoAIndex].id;
            const idTodoB = nextState.serverFetchedTodoList[todoBIndex].id;
            
            const actionSwap = swapTodoListItemsAction(idTodoA, idTodoB);
            const nextNextState = todoReducer(nextState, actionSwap);
            
            expect(nextNextState.serverFetchedTodoList[todoAIndex].id).toBe(idTodoB);
            expect(nextNextState.serverFetchedTodoList[todoBIndex].id).toBe(idTodoA);
        });

        it("return state with edited specified todo", () => {
            const indexTodo = 0;
            const editedTodo: ITodo = {
                title: "edited title",
                author: "edited author",
                description: "edited description",
                done: false
            };
            const action = editTodoAction(
                mockTodoState.serverFetchedTodoList[indexTodo].id,
                editedTodo);
            expect(mockTodoState.serverFetchedTodoList).toContain(mockInitTodoEntity);
            const nextState = todoReducer(mockTodoState, action);
            expect(nextState.serverFetchedTodoList[indexTodo].todo).toStrictEqual(editedTodo);
        });

        it("return state with updated pagination state", () => {
            const newPaginationData: IPaginationData = {
                TotalItemCount: 100,
                TotalPageCount: 10,
                PageSize: 10,
                PageNr: 3
            }
            const action = updateTodoPaginationAction(newPaginationData);
            const nextState = todoReducer(mockTodoState, action);
            expect(nextState.todoPagination).toStrictEqual(newPaginationData);
        });

        it("return state updated with error state", () => {
            const isError = true;
            const errorMsg = "New Error message";
            const action = updateTodoErrorStateAction(
                isError,
                errorMsg);
            const nextState = todoReducer(mockTodoState, action);
            expect(nextState.isError).toStrictEqual(isError);
            expect(nextState.errorMessage).toStrictEqual(errorMsg);
        });
    });

    describe("addTodoAction", () => {
        it(`return an action of type add new todo
            with payload value same as input parameter`, () => {
            const action = addTodoAction(mockNextTodo);
            expect(action.type).toBe(TodoActionType.addTodo);
            expect(action.payload).toBe(mockNextTodo);
        });
    });

    describe("updateNewTodoAction", () => {
        it(`return an action of type add new todo
            with payload value same as input parameter`, () => {
            const action = updateNewTodoAction(mockNextTodo);
            expect(action.type).toBe(TodoActionType.updateNewTodo);
            expect(action.payload).toBe(mockNextTodo);
        });
    });

    describe("toggleTodoDoneAction", () => {
        it(`return an action of type toggle todo done
            with payload value same as input parameter`, () => {
            const inPara = "2"
            const action = toggleTodoDoneAction(inPara);
            expect(action.type).toBe(TodoActionType.toggleTodoDone);
            expect(action.payload).toBe(inPara);
        });
    });

    describe("removeTodoAction", () => {
        it(`return an action of type remove todo
            with payload value same as input parameter`, () => {
            const inPara = "2"
            const action = removeTodoAction(inPara);
            expect(action.type).toBe(TodoActionType.removeTodo);
            expect(action.payload).toBe(inPara);
        });
    });

    describe("swapTodoListItems", () => {
        it(`return an action of type swap todo items
            with payload value same as input parameter`, () => {
            const idTodoA = "2"
            const idTodoB = "3"
            const action = swapTodoListItemsAction(idTodoA, idTodoB);
            expect(action.type).toBe(TodoActionType.swapTodoListItems);
            expect(action.payload).toStrictEqual({ idTodoA, idTodoB });
        });
    });

    describe("editTodoAction", () => {
        it(`return an action of type edit todo
            with payload value same as input parameter`, () => {
            const id = "2";
            const editedTodo: ITodo = {
                title: "edited title",
                author: "edited author",
                description: "edited description",
                done: false
            };
            const action = editTodoAction(id, editedTodo);
            expect(action.type).toBe(TodoActionType.editTodo);
            expect(action.payload).toStrictEqual({id, editedTodo});
        });
    });

    describe("updateTodoPaginationAction", () => {
        it(`return an action of type update todo pagination
            with payload value same as input parameter`, () => {
            const paginationData: IPaginationData = {
                TotalItemCount: 100,
                TotalPageCount: 10,
                PageSize: 10,
                PageNr: 3
            };
            const action = updateTodoPaginationAction(paginationData);
            expect(action.type).toBe(TodoActionType.updateTodoPagination);
            expect(action.payload).toStrictEqual(paginationData);
        });
    });

    describe("updateTodoErrorStateAction", () => {
        it(`return an action of type update todo error state
            with payload value same as input parameter`, () => {
            const isError = true;
            const errorMsg = "Error Message"
            const action = updateTodoErrorStateAction(isError, errorMsg);
            expect(action.type).toBe(TodoActionType.updateErrorState);
            expect(action.payload).toStrictEqual({ isError, errorMsg });
        });

        it("return default erromessage set to empty", () => {
            const isError = true;
            const emptyMessage = "";
            const action = updateTodoErrorStateAction(isError);
            expect(action.type).toBe(TodoActionType.updateErrorState);
            expect(action.payload).toStrictEqual({
                isError, errorMsg: emptyMessage
            });
        });
    });
});