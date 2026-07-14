import { useState } from "react";

/**
 * ============================================================================
 * useForm
 * ============================================================================
 */

export default function useForm<T extends object>(
    initialValues: T
) {

    /**
     * ------------------------------------------------------------------------
     * Form State
     * ------------------------------------------------------------------------
     */

    const [values, setValues] =

        useState<T>(initialValues);

    /**
     * ------------------------------------------------------------------------
     * Error State
     * ------------------------------------------------------------------------
     */

    const [errors, setErrors] =

        useState<

            Partial<Record<keyof T, string>>

        >({});

    /**
     * ------------------------------------------------------------------------
     * Loading
     * ------------------------------------------------------------------------
     */

    const [loading, setLoading] =

        useState(false);

    /**
     * ------------------------------------------------------------------------
     * Submitting
     * ------------------------------------------------------------------------
     */

    const [submitting, setSubmitting] =

        useState(false);

    /**
     * ------------------------------------------------------------------------
     * Update Single Field
     * ------------------------------------------------------------------------
     */

    function setFieldValue<

        K extends keyof T

    >(

        field: K,

        value: T[K]

    ) {

        setValues((prev) => ({

            ...prev,

            [field]: value,

        }));

    }

    /**
     * ------------------------------------------------------------------------
     * Update Multiple Fields
     * ------------------------------------------------------------------------
     */

    function setFormValues(

        value: Partial<T>

    ) {

        setValues((prev) => ({

            ...prev,

            ...value,

        }));

    }

    /**
     * ------------------------------------------------------------------------
     * Reset Form
     * ------------------------------------------------------------------------
     */

    function reset() {

        setValues(initialValues);

        setErrors({});

    }

    /**
     * ------------------------------------------------------------------------
     * Replace Form
     * ------------------------------------------------------------------------
     */

    function replace(

        value: T

    ) {

        setValues(value);

        setErrors({});

    }

    /**
     * ------------------------------------------------------------------------
     * Error
     * ------------------------------------------------------------------------
     */

    function setFieldError<

        K extends keyof T

    >(

        field: K,

        message: string

    ) {

        setErrors((prev) => ({

            ...prev,

            [field]: message,

        }));

    }

    /**
     * ------------------------------------------------------------------------
     * Clear Error
     * ------------------------------------------------------------------------
     */

    function clearError<

        K extends keyof T

    >(

        field: K

    ) {

        setErrors((prev) => ({

            ...prev,

            [field]: undefined,

        }));

    }

    /**
     * ------------------------------------------------------------------------
     * Clear All Errors
     * ------------------------------------------------------------------------
     */

    function clearErrors() {

        setErrors({});

    }

    return {

        values,

        errors,

        loading,

        submitting,

        setLoading,

        setSubmitting,

        setFieldValue,

        setFormValues,

        setFieldError,

        clearError,

        clearErrors,

        reset,

        replace,

    };

}