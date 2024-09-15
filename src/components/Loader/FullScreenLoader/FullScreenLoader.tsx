import { ReactElement } from "react";

import styles from "./FullScreenLoader.module.css";

/**
 * @NOTE CSS variable --MAX_LOADING_TIME is set
 * dynamically from env file see
 * loadCSSVaribalesDynamically.ts.
 */
export const FullScreenLoader = (): ReactElement => (
    <div className={styles.loaderCtr}>
        <div className={styles.loader}></div>
        <div className={styles.progressLoader}></div>
    </div>
);
