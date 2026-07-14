<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

abstract class Controller extends BaseController
{
    use AuthorizesRequests;
    use ValidatesRequests;

    /**
     * Success Response.
     */
    protected function success(
        mixed $data = null,
        string $message = 'Success',
        int $status = 200
    ): JsonResponse {

        return response()->json([

            'success' => true,

            'message' => $message,

            'data' => $data,

        ], $status);
    }

    /**
     * --------------------------------------------------------------------------
     * Paginated Response
     * --------------------------------------------------------------------------
     *
     * Response khusus untuk endpoint yang menggunakan pagination.
     * Struktur response tetap konsisten dengan response API lainnya.
    */
    protected function successPaginated(
        LengthAwarePaginator $paginator,
        callable $transform,
        string $message = 'Success',
        int $status = 200
    ): JsonResponse {

        return response()->json([

            'success' => true,

            'message' => $message,

            'data' => collect(
                $paginator->items()
            )->map($transform)->values(),

            'pagination' => [

                'current_page' => $paginator->currentPage(),

                'last_page' => $paginator->lastPage(),

                'per_page' => $paginator->perPage(),

                'total' => $paginator->total(),

                'from' => $paginator->firstItem(),

                'to' => $paginator->lastItem(),

                'next_page_url' => $paginator->nextPageUrl(),

                'prev_page_url' => $paginator->previousPageUrl(),

            ],

        ], $status);

    }

    /**
     * Error Response.
     */
    protected function error(
        string $message,
        mixed $errors = null,
        int $status = 400
    ): JsonResponse {

        return response()->json([

            'success' => false,

            'message' => $message,

            'errors' => $errors,

        ], $status);
    }
}