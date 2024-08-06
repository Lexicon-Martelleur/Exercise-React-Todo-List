import React from "react";
import { ReactElement } from "react";

interface Props {
    fieldName: string;
    minLength: number;
    maxLength: number;
    labelTitle: string;
    className?: string;
    type?: "input" | "textarea"
}

export const RequiredInput: React.FC<Props> = ({
    fieldName,
    minLength,
    maxLength,
    labelTitle,
    type,
    className
}): ReactElement => {
    return (
        <div className={className ? className : ""}>
            <label htmlFor={fieldName}>{labelTitle}</label>
            {type && type=="textarea"
            ? <textarea
                name={fieldName}
                id={fieldName}
                placeholder="Enter a task title"
                required
                minLength={minLength}
                maxLength={maxLength}
                rows={5}/>
            : <input
                name={fieldName}
                id={fieldName}
                placeholder="Enter a task title"
                required
                minLength={minLength}
                maxLength={maxLength}/>
            }
        </div>
    )
}