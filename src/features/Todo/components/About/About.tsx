import { ReactElement } from "react";

import { useTodoContext } from "../../context";

import styles from "./About.module.css"; 

export const About = (): ReactElement => {
    const [_, todoState] = useTodoContext();
    
    const getNrOfTodosNotDone = () => {
        return todoState.todoList.filter(item => item.todo.done === true).length;
    } 
    
    return (
        <section>
            <ul className={styles.aboutStatusList}>
                <li>Total nr of todos: {todoState.todoList.length}</li>
                <li>Nr of todos done: {getNrOfTodosNotDone()}</li>
            </ul>
        </section>
    );
}
