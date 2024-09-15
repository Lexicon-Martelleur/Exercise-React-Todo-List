import React, { ReactElement, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

import { Path } from "../../constants";
import { Icon } from "../../components";
import { Icons } from "../../assets";

import styles from "./BaseLayout.module.css";

interface Props {
    children?: ReactNode;
}

export const BaseLayout: React.FC<Props> = ({
    children
}): ReactElement => {
    const navLinks = [
        { to: Path.INDEX, label: "Todos" },
        { to: Path.ADD_TODO, label: "Add" },
        { to: Path.ABOUT, label: "About" }
    ]
    return (
        <>
            <header className={styles.header}>
                <h1><Link to={Path.INDEX}>
                    <Icon size={"large"} icon={Icons.home}/>
                </Link></h1>
                <nav className={styles.nav}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({isActive}) => (
                                isActive ? styles.activeLink : styles.link
                            )}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>joel.martelleur@gmail.com</p>
            </footer>
        </>
    );
}
