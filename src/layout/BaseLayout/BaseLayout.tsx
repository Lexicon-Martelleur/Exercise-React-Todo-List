import React, { ReactElement, ReactNode } from "react";

import styles from "./BaseLayout.module.css";
import { Link, NavLink } from "react-router-dom";
import { Path } from "../../constants";
import { Icon } from "../../components";
import { Icons } from "../../assets";

interface Props {
    children?: ReactNode;
}

export const BaseLayout: React.FC<Props> = ({
    children
}): ReactElement => {
    return (
        <>
            <header className={styles.header}>
                <h1><Link to={Path.INDEX}>
                    <Icon size={"large"} icon={Icons.home}/>
                </Link></h1>
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