import React, { ReactElement, ReactNode } from "react";

import styles from "./SelectButton.module.css"

interface Props {
    children?: ReactNode;
    type?: "submit" | "button" | "reset";
    disabled?: boolean;
    onSelect?: () => void;
}

export const SelectButton: React.FC<Props> = ({
    children,
    type,
    disabled = false,
    onSelect = () => {}
}): ReactElement => {
    return (
        <button className={styles.selectBtn}
            type={type}
            disabled={disabled}
            onClick={_ => { onSelect() }}>
            {children} 
        </button>
    );
}
