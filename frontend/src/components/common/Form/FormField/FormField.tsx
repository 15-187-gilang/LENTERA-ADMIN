import "./FormField.css";

import type { ReactNode } from "react";

interface FormFieldProps {

    label: string;

    children: ReactNode;

    required?: boolean;

    error?: string;

    helperText?: string;

    className?: string;

}

export default function FormField({

    label,

    children,

    required = false,

    error,

    helperText,

    className = "",

}: FormFieldProps) {

    return (

        <div
            className={`form-field ${className}`}
        >

            <label
                className="form-label"
            >

                {label}

                {

                    required && (

                        <span className="required">

                            *

                        </span>

                    )

                }

            </label>

            <div className="form-control">

                {children}

            </div>

            {

                error ? (

                    <p className="form-error">

                        {error}

                    </p>

                ) : helperText ? (

                    <p className="form-helper">

                        {helperText}

                    </p>

                ) : null

            }

        </div>

    );

}