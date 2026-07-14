<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Achievement\StoreAchievementRequest;
use App\Http\Requests\Achievement\UpdateAchievementRequest;
use App\Http\Resources\AchievementResource;
use App\Models\Achievement;
use App\Services\AchievementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * -----------------------------------------------------------------------------
 * Achievement Controller
 * -----------------------------------------------------------------------------
 *
 * Controller hanya bertugas:
 * - menerima request
 * - memanggil Service
 * - mengembalikan response
 */
class AchievementController extends Controller
{
    /**
     * Dependency Injection AchievementService.
     */
    public function __construct(
        private readonly AchievementService $achievementService
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only([

            'search',

            'category_id',

            'level',

            'featured',

            'published',

            'sort',

            'per_page',

        ]);

        $paginator = $this->achievementService
            ->filter($filters);

        return $this->successPaginated(

            $paginator,

            fn ($achievement) => new AchievementResource($achievement),

            'Data prestasi berhasil diambil.'

        );
    }

    /**
     * Menyimpan data prestasi baru.
     */
    public function store(
        StoreAchievementRequest $request
    ): JsonResponse {

        $data = $request->validated();

        $admin = $request->user();

        $data['created_by'] = $admin->id;

        $achievement = $this->achievementService->create(
            $data
            );

        return $this->success(
            new AchievementResource($achievement),
            'Prestasi berhasil ditambahkan.',
            201
        );
    }

    /**
     * Menampilkan detail prestasi.
     */
    public function show(
        Achievement $achievement
    ): JsonResponse {

        return $this->success(
            new AchievementResource($achievement),
            'Detail prestasi berhasil diambil.'
        );
    }

    /**
     * Memperbarui data prestasi.
     */
    public function update(
        UpdateAchievementRequest $request,
        Achievement $achievement
    ): JsonResponse {

        $this->achievementService->update(
            $achievement,
            $request->validated()
        );

        return $this->success(
            new AchievementResource(
                $achievement->fresh()
            ),
            'Prestasi berhasil diperbarui.'
        );
    }

    /**
     * Menghapus data prestasi.
     */
    public function destroy(
        Achievement $achievement
    ): JsonResponse {

        $this->achievementService->delete($achievement);

        return $this->success(
            null,
            'Prestasi berhasil dihapus.'
        );
    }

    /**
     * Mengambil daftar prestasi yang telah dipublikasikan.
     */
    public function published(Request $request): JsonResponse
    {
        $perPage = (int) $request->input('per_page', 10);

        return $this->success(AchievementResource::collection(
                $this->achievementService->getPublished($perPage)),
            'Daftar prestasi berhasil diambil.');
    }

    /**
     * Mengambil daftar prestasi unggulan.
     */
    public function featured(): JsonResponse
    {
        return $this->success(
            AchievementResource::collection($this->achievementService->getFeatured()),
            'Prestasi unggulan berhasil diambil.'
        );
    }

    /**
     * Mengambil statistik prestasi.
     */
    public function statistics(): JsonResponse
    {
        return $this->success(
            $this->achievementService->statistics(),
            'Statistik berhasil diambil.'
        );
    }
}