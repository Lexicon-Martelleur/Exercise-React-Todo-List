import React, { ReactElement } from "react";

import styles from "./PageNavigation.module.css";

interface Props {
    page: number;
    nrOfPages: number;
    onNext: () => void;
    onPrev: () => void;
}

export const PageNavigation: React.FC<Props> = ({
    page,
    nrOfPages,
    onPrev,
    onNext
}): ReactElement => {
    const isFirstPage = () => {
        return page === 1
    }

    const isLastPage = () => {
        return page >= nrOfPages
    }

    return (
        <article className={styles.pageNavigationArticle}>
            <button
                disabled={isFirstPage()}
                type="button"
                onClick={_ => { onPrev() }}>{"<"}</button>
            <p>{`${page}/${nrOfPages}`}</p>
            <button
               disabled={isLastPage()}
                type="button"
                onClick={_ => { onNext() }}>{">"}</button>
        </article>
    );
}