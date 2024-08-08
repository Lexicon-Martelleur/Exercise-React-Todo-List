import { ReactElement, useEffect, useRef } from "react";

import { useTodoContext } from "../../context";
import { images } from "../../../../assets";

import styles from "./About.module.css";

export const About = (): ReactElement => {
    const [_, todoState] = useTodoContext();    
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageSources = [
        images.calm1.src,
        images.calm2.src,
        images.calm3.src,
        images.calm4.src,
        images.calm5.src
    ];

    const getNrOfTodosNotDone = () => {
        return todoState.todoList
            .filter(item => item.todo.done === true)
            .length;
    }

    useEffect(() => {
        imageRefs.current.forEach((ref, index) => {
            if (ref == null) { return; }
            ref.style.backgroundImage = `url(${imageSources[index]})`;
        });
    }, [imageSources]);

    const toggleLargeImage = (index: number) => {
        imageRefs.current[index]?.classList.toggle(`${styles.largeImage}`);
    }

    return (
        <>
            <div>
                <p>Total nr of todos: {todoState.todoList.length}</p>
                <p>Nr of todos done: {getNrOfTodosNotDone()}</p>
            </div>
            <section className={styles.aboutSectionImageCtr}>
                {imageSources.map((_, index) => (
                    <div
                        key={index}
                        ref={element => { imageRefs.current[index] = element }}
                        className={styles[`box${index + 1}`]}
                        onClick={_ => { toggleLargeImage(index) }}
                    ></div>
                ))}
            </section>
        </>
    );
}
