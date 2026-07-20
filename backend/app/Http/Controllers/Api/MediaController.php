<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMediaRequest;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use App\Services\MediaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * -----------------------------------------------------------------------------
 * Media Controller
 * -----------------------------------------------------------------------------
 *
 * Controller hanya bertugas:
 * - menerima request
 * - memanggil Service
 * - mengembalikan response
 */
class MediaController extends Controller
{
    public function __construct(
        private readonly MediaService $mediaService
    ) {}

    /**
     * Mengambil daftar media dengan filter dan pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only([
            'search',
            'per_page',
        ]);

        $paginator = $this->mediaService->filter($filters);

        return $this->successPaginated(
            $paginator,
            fn ($media) => new MediaResource($media),
            'Data media berhasil diambil.'
        );
    }

    /**
     * Mengupload file media baru.
     */
    public function store(StoreMediaRequest $request): JsonResponse
    {
        $admin = $request->user();
        $file  = $request->file('file');
        $thumbnail = $request->file('thumbnail');

        $media = $this->mediaService->upload($file, $admin->id, $thumbnail);

        return $this->success(
            new MediaResource($media),
            'Media berhasil diunggah.',
            201
        );
    }

    /**
     * Menampilkan detail satu media.
     */
    public function show(Media $media): JsonResponse
    {
        return $this->success(
            new MediaResource($media->load('uploader')),
            'Detail media berhasil diambil.'
        );
    }

    /**
     * Menghapus media.
     */
    public function destroy(Media $media): JsonResponse
    {
        $this->mediaService->delete($media);

        return $this->success(
            null,
            'Media berhasil dihapus.'
        );
    }
}
