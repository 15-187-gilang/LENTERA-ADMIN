import { useEffect, useState } from "react";

/**
 * ==========================================================================
 * useDebounce
 * ==========================================================================
 *
 * Menunda perubahan value selama delay tertentu.
 * Cocok digunakan untuk search agar tidak request API setiap ketikan.
 */

export default function useDebounce<T>(
    value: T,
    delay = 500,
): T {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedValue(value);

        }, delay);

        return () => clearTimeout(timer);

    }, [value, delay]);

    return debouncedValue;

}