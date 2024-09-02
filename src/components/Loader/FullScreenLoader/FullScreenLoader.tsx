import { ReactElement } from "react";

import styles from "./FullScreenLoader.module.css";

export const FullScreenLoader = (): ReactElement => (
    <div className={styles.loaderCtr}>
        <div className={styles.loader}></div>
        <div className={styles.progressLoader}></div>
    </div>
);
