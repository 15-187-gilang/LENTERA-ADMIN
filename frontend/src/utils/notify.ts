import toast, { type ToastOptions } from "react-hot-toast";

/**
 * ============================================================================
 * Notify Helper
 * ============================================================================
 *
 * Seluruh notifikasi aplikasi menggunakan helper ini.
 * Jangan memanggil react-hot-toast secara langsung.
 */

const DEFAULT_OPTIONS: ToastOptions = {

    duration: 3000,

    position: "top-right",

};

export const notify = {

    success(

        message: string,

        options?: ToastOptions

    ) {

        toast.success(

            message,

            {

                ...DEFAULT_OPTIONS,

                ...options,

            }

        );

    },

    error(

        message: string,

        options?: ToastOptions

    ) {

        toast.error(

            message,

            {

                ...DEFAULT_OPTIONS,

                ...options,

            }

        );

    },

    warning(

        message: string,

        options?: ToastOptions

    ) {

        toast(

            message,

            {

                icon: "⚠️",

                ...DEFAULT_OPTIONS,

                ...options,

            }

        );

    },

    info(

        message: string,

        options?: ToastOptions

    ) {

        toast(

            message,

            {

                icon: "ℹ️",

                ...DEFAULT_OPTIONS,

                ...options,

            }

        );

    },

    loading(

        message = "Memproses..."

    ) {

        return toast.loading(message);

    },

    dismiss(

        toastId?: string

    ) {

        toast.dismiss(toastId);

    },

};