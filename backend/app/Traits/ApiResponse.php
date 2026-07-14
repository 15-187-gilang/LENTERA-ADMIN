<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * -----------------------------------------------------------------------------
 * API Response Trait
 * -----------------------------------------------------------------------------
 *
 * Menstandarkan seluruh response JSON pada aplikasi.
 *
 * Digunakan oleh seluruh Controller API.
 */
trait ApiResponse
{
    /**
     * Response ketika request berhasil.
     */
    protected function success(
        mixed $data = null,
        string $message = 'Success',
        int $status = 200
    ): JsonResponse {

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $status);

    }

    /**
     * Response ketika request gagal.
     */
    protected function error(
        string $message = 'Error',
        mixed $errors = null,
        int $status = 400
    ): JsonResponse {

        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $status);

    }

    /**
     * Response ketika request berhasil dengan data yang dipaginasi.
     */
    protected function paginated(
        AnonymousResourceCollection $resource,
        string $message = 'Success'
    ): JsonResponse {

        $response = $resource->response()->getData(true);
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $response['data'],
            'meta' => $response['meta'] ?? null,
            'links' => $response['links'] ?? null,
        ]);

    }
}