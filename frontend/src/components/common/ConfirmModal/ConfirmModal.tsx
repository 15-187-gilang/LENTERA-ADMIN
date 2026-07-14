import "./ConfirmModal.css";

import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {

    open: boolean;

    title: string;

    message: string;

    confirmText?: string;

    cancelText?: string;

    loading?: boolean;

    danger?: boolean;

    onConfirm: () => void;

    onClose: () => void;

}

export default function ConfirmModal({

    open,

    title,

    message,

    confirmText = "Konfirmasi",

    cancelText = "Batal",

    loading = false,

    danger = true,

    onConfirm,

    onClose,

}: ConfirmModalProps) {

    if (!open) {

        return null;

    }

    return (

        <div className="confirm-modal-overlay">

            <div className="confirm-modal">

                <div className="confirm-modal-icon">

                    <AlertTriangle size={40} />

                </div>

                <div className="confirm-modal-body">

                    <h2>

                        {title}

                    </h2>

                    <p>

                        {message}

                    </p>

                </div>

                <div className="confirm-modal-footer">

                    <button

                        type="button"

                        className="btn btn-outline"

                        onClick={onClose}

                        disabled={loading}

                    >

                        {cancelText}

                    </button>

                    <button

                        type="button"

                        className={
                            danger
                                ? "btn btn-danger"
                                : "btn btn-primary"
                        }

                        onClick={onConfirm}

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Memproses..."

                                : confirmText

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}