import { ReactElement } from "react";

import styles from "./SortMenu.module.css";
import { Icon } from "../Icon";
import { Icons } from "../../assets";

interface Props {
    title: string;
    listToBeSorted: unknown[];
    selectedSortMode: string
    sortMode: object
    onSelectSortMode: React.ChangeEventHandler<HTMLSelectElement>
}

export const SortMenu: React.FC<Props> = ({
    title,
    listToBeSorted,
    selectedSortMode,
    sortMode,
    onSelectSortMode
}): ReactElement => {
    return (
        <div title="Select sort mode" className={styles.sortMenuHeader}>
            <h3>{listToBeSorted.length} {title}</h3>
            <div className={styles.sortMenuSelectCtr}>
                <Icon className={styles.sortMenuSelectIcon} icon={Icons.sort}/>
                <select className={styles.sortMenuSelect} 
                    value={selectedSortMode}
                    onChange={onSelectSortMode}>
                    {Object.values(sortMode).map(value => (
                    <option 
                        key={value}
                        value={value}>
                        {value}
                    </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
