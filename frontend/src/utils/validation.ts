/**
 * ============================================================================
 * Validation Helper
 * ============================================================================
 */

export const validation = {

    required(

        value: unknown

    ): boolean {

        return value !== undefined

            && value !== null

            && value !== "";

    },

    email(

        value: string

    ): boolean {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(

            value

        );

    },

    minLength(

        value: string,

        length: number

    ): boolean {

        return value.length >= length;

    },

    maxLength(

        value: string,

        length: number

    ): boolean {

        return value.length <= length;

    },

    image(

        type: string

    ): boolean {

        return type.startsWith(

            "image/"

        );

    },

    maxFileSize(

        size: number,

        maxMB: number

    ): boolean {

        return size <=

            maxMB *

            1024 *

            1024;

    },

};