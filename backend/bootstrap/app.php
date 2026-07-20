<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    ->withMiddleware(function (Middleware $middleware): void {

        // Aktifkan CORS untuk semua API routes
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);

        $middleware->redirectGuestsTo(function (Request $request) {

            if ($request->expectsJson()) {
                return null;
            }

            return route('login');

        });

    })

    ->withExceptions(function (Exceptions $exceptions): void {

        $exceptions->render(function (
            ValidationException $e,
            Request $request
        ) {

            if (! $request->expectsJson()) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);

        });

        $exceptions->render(function (
            AuthenticationException $e,
            Request $request
        ) {

            if (! $request->expectsJson()) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.',
            ], 401);

        });

        $exceptions->render(function (
            ModelNotFoundException $e,
            Request $request
        ) {

            if (! $request->expectsJson()) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan.',
            ], 404);

        });

        $exceptions->render(function (
            NotFoundHttpException $e,
            Request $request
        ) {

            if (! $request->expectsJson()) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Endpoint tidak ditemukan.',
            ], 404);

        });

    })

    ->create();