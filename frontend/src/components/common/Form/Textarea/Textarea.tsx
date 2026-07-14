import "./Textarea.css";

import {
    forwardRef,
    type TextareaHTMLAttributes,
} from "react";

interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {

    error?: boolean;

    fullWidth?: boolean;

    resize?: "none" | "vertical" | "horizontal" | "both";

}

const Textarea = forwardRef<
    HTMLTextAreaElement,
    TextareaProps
>(
    (
        {
            error = false,
            fullWidth = true,
            resize = "vertical",
            className = "",
            disabled,
            ...props
        },
        ref
    ) => {

        return (

            <textarea
                ref={ref}
                disabled={disabled}
                className={[
                    "app-textarea",
                    fullWidth ? "full-width" : "",
                    error ? "has-error" : "",
                    disabled ? "is-disabled" : "",
                    `resize-${resize}`,
                    className,
                ]
                    .filter(Boolean)
                    .join(" ")}
                {...props}
            />

        );

    }
);

Textarea.displayName = "Textarea";

export default Textarea;