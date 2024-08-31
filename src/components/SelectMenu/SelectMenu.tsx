import { ReactElement, useState } from "react";

import styles from "./SelectMenu.module.css";
import { Icon } from "../Icon";
import { Icons } from "../../assets";

interface Props {
    title: string;
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
}

export const SelectMenu: React.FC<Props> = ({
    title,
    options,
    selectedOption,
    onSelect
}): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: string) => {
        onSelect(option);
    }

    const getSelectButtonClassNames = () => {
        return `${styles.selectButton} ${isOpen ? styles.selectOpen : ""}`
    }

    const toggleOpen: React.MouseEventHandler<HTMLButtonElement> = (_) => {
        setIsOpen(!isOpen);
    }

    return (
        <article title="Select sort mode" className={styles.selectArticle}>
            <h3 className={styles.selectMenuTitle}>{title}</h3>
            <button className={getSelectButtonClassNames()}
                onClick={toggleOpen}>
                <Icon className={styles.selectIcon} icon={Icons.sort}/>
                <p className={styles.selectLabel}
                    onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption}
                </p>
                {isOpen && (
                <div className={styles.optionCtr}>
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className={styles.optionItem}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                )}
            </button>
        </article>
    );
}
