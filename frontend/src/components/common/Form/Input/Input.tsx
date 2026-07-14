import "./Input.css";

import {
    forwardRef,
    type InputHTMLAttributes,
    type ReactNode,
} from "react";

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {

    leftIcon?: ReactNode;

    rightIcon?: ReactNode;

    onRightIconClick?: () => void;

    fullWidth?: boolean;

    error?: boolean;

}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            leftIcon,
            rightIcon,
            onRightIconClick,
            fullWidth = true,
            error = false,
            className = "",
            disabled,
            ...props
        },
        ref
    ) => {

        return (

            <div
                className={[
                    "app-input",
                    fullWidth ? "full-width" : "",
                    error ? "has-error" : "",
                    disabled ? "is-disabled" : "",
                    className,
                ]
                    .filter(Boolean)
                    .join(" ")}
            >

                {leftIcon && (

                    <span className="input-left-icon">

                        {leftIcon}

                    </span>

                )}

                <input
                    ref={ref}
                    disabled={disabled}
                    {...props}
                />

                {rightIcon && (

                    <button
                        type="button"
                        className="input-right-icon"
                        onClick={onRightIconClick}
                        tabIndex={-1}
                    >

                        {rightIcon}

                    </button>

                )}

            </div>

        );

    }
);

Input.displayName = "Input";

export default Input;