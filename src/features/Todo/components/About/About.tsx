import { ReactElement, useCallback, useRef } from "react";

import { useTodoContext } from "../../context";
import { images } from "../../../../assets";

import styles from "./About.module.css";
import {
    selectNrOfTodoItems,
    selectAllRemoteTodos
} from "../../state";

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

    /**@TODO should be picked up from server */
    const getNrOfTodosDone = () => {
        return selectAllRemoteTodos(todoState)
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

    return (
        <>
            <div>
                <p>Total nr of todos: {selectNrOfTodoItems(todoState)}</p>
                <p>Nr of todos done: {getNrOfTodosDone()}</p>
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
