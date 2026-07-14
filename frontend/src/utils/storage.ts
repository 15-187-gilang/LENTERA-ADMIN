/**
 * ============================================================================
 * Storage Helper
 * ============================================================================
 */

export const storage = {

    get<T>(

        key: string

    ): T | null {

        try {

            const value = localStorage.getItem(key);

            if (!value) {

                return null;

            }

            return JSON.parse(value) as T;

        }

        catch {

            return null;

        }

    },

    set(

        key: string,

        value: unknown

    ) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    remove(

        key: string

    ) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    },

    has(

        key: string

    ) {

        return localStorage.getItem(key) !== null;

    },

};