import "./Select.css";

import {
    forwardRef,
    type ReactNode,
    type SelectHTMLAttributes,
} from "react";

export interface SelectOption {

    readonly label: string;

    readonly value: string | number;

    readonly disabled?: boolean;

}

interface SelectProps
    extends Omit<
        SelectHTMLAttributes<HTMLSelectElement>,
        "children"
    > {

    options: readonly SelectOption[];

    placeholder?: string;

    leftIcon?: ReactNode;

    error?: boolean;

    fullWidth?: boolean;

}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            options,
            placeholder,
            leftIcon,
            error = false,
            fullWidth = true,
            className = "",
            disabled,
            ...props
        },
        ref
    ) => {

        return (

            <div
                className={[
                    "app-select",
                    fullWidth ? "full-width" : "",
                    error ? "has-error" : "",
                    disabled ? "is-disabled" : "",
                    className,
                ]
                    .filter(Boolean)
                    .join(" ")}
            >

                {leftIcon && (

                    <span className="select-left-icon">

                        {leftIcon}

                    </span>

                )}

                <select
                    ref={ref}
                    disabled={disabled}
                    {...props}
                >

                    {placeholder && (

                        <option value="">

                            {placeholder}

                        </option>

                    )}

                    {options.map((option) => (

                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >

                            {option.label}

                        </option>

                    ))}

                </select>

            </div>

        );

    }
);

Select.displayName = "Select";

export default Select;