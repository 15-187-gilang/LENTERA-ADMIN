import type {
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

import "./Button.css";

/**
 * ============================================================================
 * Button Props
 * ============================================================================
 */

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {

    variant?:
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger"
        | "outline";

    leftIcon?: ReactNode;

    rightIcon?: ReactNode;

    loading?: boolean;

    fullWidth?: boolean;

}

/**
 * ============================================================================
 * Button Component
 * ============================================================================
 */

export default function Button({

    variant = "primary",

    leftIcon,

    rightIcon,

    loading = false,

    fullWidth = false,

    className = "",

    children,

    disabled,

    ...props

}: ButtonProps) {

    return (

        <button

            className={[

                "btn",

                `btn-${variant}`,

                fullWidth ? "btn-full" : "",

                className,

            ]
                .filter(Boolean)
                .join(" ")}

            disabled={loading || disabled}

            {...props}

        >

            {

                loading && (

                    <span className="btn-spinner" />

                )

            }

            {

                !loading && leftIcon

            }

            <span>

                {

                    loading

                        ? "Memproses..."

                        : children

                }

            </span>

            {

                !loading && rightIcon

            }

        </button>

    );

}