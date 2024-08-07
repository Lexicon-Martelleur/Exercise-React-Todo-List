import React, { ReactElement, ReactNode } from "react";

import styles from "./BaseLayout.module.css";
import { NavLink } from "react-router-dom";
import { Path } from "../../constants";

interface Props {
    children?: ReactNode 
}

export const BaseLayout: React.FC<Props> = ({
    children
}): ReactElement => {
    return (
        <>
            <header className={styles.header}>
                <h1>Todo List</h1>
                <nav className={styles.nav}>
                    <NavLink to={Path.ADD_TODO}
                        className={({isActive}) => (
                            isActive ? styles.activeLink : styles.link
                        )}>
                        Add
                    </NavLink>
                    <NavLink    to={Path.INDEX}
                        className={({isActive}) => (
                            isActive ? styles.activeLink : styles.link
                        )}>
                        Todos
                    </NavLink>
                </nav>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>joel.martelleur@gmail.com</p>
            </footer>
        </>
    )
}