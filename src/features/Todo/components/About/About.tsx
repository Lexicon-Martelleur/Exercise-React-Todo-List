import { ReactElement, useEffect, useRef } from "react";

import { useTodoContext } from "../../context";
import { images } from "../../../../assets";

import styles from "./About.module.css";

export const About = (): ReactElement => {
    const [_, todoState] = useTodoContext();    
    const imageRefs = useRef<HTMLDivElement[]>([]);
    const imageSources = [
        images.calm1.src,
        images.calm2.src,
        images.calm3.src,
        images.calm4.src,
        images.calm5.src
    ];

    const getNrOfTodosNotDone = () => {
        return todoState.todoList.filter(item => item.todo.done === true).length;
    }

    useEffect(() => {
        imageRefs.current.forEach((ref, index) => {
            if (ref == null) { return; }
            ref.style.backgroundImage = `url(${imageSources[index]})`;
        });
    }, [imageSources]);

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
                        ref={(el) => (imageRefs.current[index] = el!)}
                        className={styles[`box${index + 1}`]}
                    ></div>
                ))}
            </section>
        </>
    );
}
