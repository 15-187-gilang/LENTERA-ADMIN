import "./Switch.css";

import {
    forwardRef,
    type InputHTMLAttributes,
} from "react";

interface SwitchProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "type"
    > {

    label?: string;

    description?: string;

    loading?: boolean;

}

const Switch = forwardRef<
    HTMLInputElement,
    SwitchProps
>(
    (
        {
            label,
            description,
            loading = false,
            disabled = false,
            className = "",
            ...props
        },
        ref
    ) => {

        const isDisabled =
            disabled || loading;

        return (

            <label
                className={[
                    "app-switch",
                    isDisabled
                        ? "disabled"
                        : "",
                    className,
                ]
                    .filter(Boolean)
                    .join(" ")}
            >

                <input
                    ref={ref}
                    type="checkbox"
                    disabled={isDisabled}
                    {...props}
                />

                <span className="switch-slider" />

                {(label || description) && (

                    <div className="switch-content">

                        {

                            label && (

                                <span className="switch-label">

                                    {label}

                                </span>

                            )

                        }

                        {

                            description && (

                                <span className="switch-description">

                                    {description}

                                </span>

                            )

                        }

                    </div>

                )}

            </label>

        );

    }
);

Switch.displayName = "Switch";

export default Switch;