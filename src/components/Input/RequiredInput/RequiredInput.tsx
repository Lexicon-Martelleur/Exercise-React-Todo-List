import { ReactElement } from "react";

import styles from "./RequiredInput.module.css";

interface Props {
    fieldName: string;
    minLength: number;
    maxLength: number;
    labelTitle: string;
    value: string;
    placeholder: string;
    className?: string;
    type?: "input" | "textarea";
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const RequiredInput: React.FC<Props> = ({
    fieldName,
    minLength,
    maxLength,
    labelTitle,
    value,
    placeholder,
    type,
    className,
    onChange = () => {}
}): ReactElement => {
    const derivedClassNames = [
        styles.requiredInput,
        className ? className : ""
    ].join(" ");
 
    return (
        <div className={derivedClassNames}>
            <label htmlFor={fieldName}>{labelTitle}</label>
            {type && type=="textarea"
            ? <textarea
                name={fieldName}
                id={fieldName}
                placeholder={placeholder}
                required
                value={value}
                minLength={minLength}
                maxLength={maxLength}
                rows={5}
                onChange={onChange} />
            : <input
                name={fieldName}
                id={fieldName}
                placeholder={placeholder}
                required
                value={value}
                minLength={minLength}
                maxLength={maxLength}
                onChange={onChange}  />
            }
        </div>
    );
}
