import { ReactElement, useCallback, useRef } from "react";

import { useTodoContext } from "../../context";
import { images } from "../../../../assets";

import styles from "./About.module.css";
import * as TodoState from "../../state";

export const About = (): ReactElement => {
    const [_, todoState] = useTodoContext();
    const imageRefs = useRef<(HTMLDivElement)[]>([]);
    const imageSources = [
        images.calm1.src,
        images.calm2.src,
        images.calm3.src,
        images.calm4.src,
        images.calm5.src
    ];

    /**
     * @TODO Currently just show done from current page 
     * should be picked up from server to get all todos
     * that is done.
     *
     * */
    const getNrOfTodosDone = () => {
        return TodoState.selectRemoteTodos(todoState)
            .filter(item => item.todo.done === true)
            .length;
    }

    const toggleLargeImage = (index: number) => {
        imageRefs.current[index]?.classList.toggle(`${styles.largeImage}`);
    }

    const setBackgroundImage = useCallback((element: HTMLDivElement | null, imageIndex: number) => {
        if (element == null) { return; }
        element.style.backgroundImage = `url(${imageSources[imageIndex]})`;
        imageRefs.current[imageIndex] = element;
    }, [imageSources])

    const writeNrOfTodos = () => {
        return `Total nr of todos: ${TodoState.selectNrOfTodoItems(todoState)}`
    } 

    const writeNrOfTodosDone = () => {
        return `Nr of todos done on page
        ${TodoState.selectTodoPage(todoState)}: ${getNrOfTodosDone()}`
    } 

    return (
        <>
            <div>
                <p>{writeNrOfTodos()}</p>
                <p>{writeNrOfTodosDone()}</p>
            </div>
            <section className={styles.aboutSectionImageCtr}>
                {imageSources.map((_, index) => (
                    <div
                        key={index}
                        ref={element => { setBackgroundImage(element, index) }}
                        className={styles[`box${index + 1}`]}
                        onClick={_ => { toggleLargeImage(index) }}
                    ></div>
                ))}
            </section>
        </>
    );
}
