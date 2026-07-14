<?php

namespace App\Exceptions;

use Exception;

/**
 * --------------------------------------------------------------------------
 * Business Exception
 * --------------------------------------------------------------------------
 *
 * Digunakan untuk melempar exception yang berkaitan dengan aturan bisnis
 * aplikasi (business rules).
 *
 * Contoh:
 * - Kategori sudah ada.
 * - Prestasi sudah dipublikasikan.
 * - Gagal menghapus data karena masih digunakan.
 */
class BusinessException extends Exception
{
    //
}