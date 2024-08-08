import { ReactElement } from "react";

import styles from "./SelectMenu.module.css";
import { Icon } from "../Icon";
import { Icons } from "../../assets";

interface Props {
    title: string;
    options: string[];
    selectedOption: string;
    onOptionChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const SelectMenu: React.FC<Props> = ({
    title,
    options,
    selectedOption,
    onOptionChange
}): ReactElement => {
    return (
        <div title="Select sort mode" className={styles.selectMenu}>
            <h3 className={styles.selectMenuTitle}>{title}</h3>
            <div className={styles.selectMenuSelectCtr}>
                <Icon className={styles.selectMenuSelectIcon} icon={Icons.sort}/>
                <select className={styles.selectMenuSelect} 
                    value={selectedOption}
                    onChange={onOptionChange}>
                    {options.map(value => (
                    <option 
                        key={value}
                        value={value}>
                        {value}
                    </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
