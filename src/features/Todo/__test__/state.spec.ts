import { ITodo } from "../../../service"
import { addTodoAction, updateNewTodoAction } from "../state/actions";
import { TodoActionType } from "../state/constants";
import { todoReducer } from "../state/reducer";
import { ITodoState } from "../state/types";

describe("Todo State", () => {
    const mockPrevTodo: ITodo = {
        title: "prev title",
        description: "prev description"
    };
    const mockNextTodo = {
        title: "next title",
        description: "next description"
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
            const action = addTodoAction(mockNextTodo);
            expect(action.type).toBe(TodoActionType.updateNewTodo);
        });

        it("return an action with payload as same as inparameter", () => {
            const action = addTodoAction(mockNextTodo);
            expect(action.payload).toBe(mockNextTodo);
        });
    })
});