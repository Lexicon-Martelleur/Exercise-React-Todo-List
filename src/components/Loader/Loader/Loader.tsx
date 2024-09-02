import { ReactElement } from "react";

import styles from "./Loader.module.css";

export const Loader = (): ReactElement => (
    <article className={styles.loaderArticle}>
        <div className={styles.loader}></div>
    </article>
);
