import { ITodo, ITodoEntity } from "../../../service"
import {
    addTodoAction,
    removeTodoAction,
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
    const mockInitTodoEntity: ITodoEntity = {
        id: "1",
        timestamp: Date.now(),
        todo: {
            title: "first title",
            description: "first description",
            done: false
        }
    } 
    const mockTodoState: ITodoState = {
        newTodo: mockPrevTodo,
        todoList: [ mockInitTodoEntity ]
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

        it(`return state with toggled todo done value
            for specified todo entity`, () => {
            const indexTodo = 0;
            const startDoneValue = mockTodoState.todoList[indexTodo].todo.done
            const action = toggleTodoDoneAction(mockTodoState.todoList[indexTodo].id);
            const nextState = todoReducer(mockTodoState, action);
            expect(nextState.todoList[indexTodo].todo.done).toBe(!startDoneValue);
        });

        it("return state with removed specified todo", () => {
            const indexTodo = 0;
            const action = removeTodoAction(mockTodoState.todoList[indexTodo].id);
            expect(mockTodoState.todoList).toContain(mockInitTodoEntity);
            const nextState = todoReducer(mockTodoState, action);
            expect(nextState.todoList).not.toContain(mockInitTodoEntity);
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
});