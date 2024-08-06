import { ITodo } from "../../../service"
import {
    addTodoAction,
    toggleTodoDoneAction,
    updateNewTodoAction
} from "../state/actions";
import { TodoActionType } from "../state/constants";
import { todoReducer } from "../state/reducer";
import { ITodoState } from "../state/types";

describe("Todo State", () => {
    const mockPrevTodo: ITodo = {
        title: "prev title",
        description: "prev description",
        done: false
    };
    const mockNextTodo: ITodo = {
        title: "next title",
        description: "next description",
        done: false
    };
    const mockTodoState: ITodoState = {
        newTodo: mockPrevTodo,
        todoList: []
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
            expect(nextState.todoList.map(entity => (
                entity.todo
            ))).toContain(mockNextTodo);
        });

        it("return state with toggled todo done for specified todo entity", () => {
            const startDoneValue = mockNextTodo.done
            const actionAddTodo = addTodoAction(mockNextTodo);
            const nextState = todoReducer(mockTodoState, actionAddTodo);
            const actionToggleTodoDone = toggleTodoDoneAction(nextState.todoList[0].id);
            const nextNextState = todoReducer(nextState, actionToggleTodoDone);
            expect(nextNextState.todoList[0].todo.done).toBe(!startDoneValue);
        });
    });

    describe("addTodoAction", () => {
        it("return an action of type add new action", () => {
            const action = addTodoAction(mockNextTodo);
            expect(action.type).toBe(TodoActionType.addTodo);
        });

        it("return an action with payload as same as inparameter", () => {
            const action = addTodoAction(mockNextTodo);
            expect(action.payload).toBe(mockNextTodo);
        });
    })

    describe("updateNewTodoAction", () => {
        it("return an action of type add new action", () => {
            const action = updateNewTodoAction(mockNextTodo);
            expect(action.type).toBe(TodoActionType.updateNewTodo);
        });

        it("return an action with payload as same as inparameter", () => {
            const action = updateNewTodoAction(mockNextTodo);
            expect(action.payload).toBe(mockNextTodo);
        });
    })

    describe("toggleTodoDoneAction", () => {
        it("return an action of type toggle todo done action", () => {
            const action = toggleTodoDoneAction("2");
            expect(action.type).toBe(TodoActionType.toggleTodoDone);
        });

        it("return an action with payload as same as inparameter", () => {
            const inPara = "2";
            const action = toggleTodoDoneAction(inPara);
            expect(action.payload).toBe(inPara);
        });
    })
});