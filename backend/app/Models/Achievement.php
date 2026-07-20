<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Achievement extends Model
{
    use HasSlug, HasFactory;
    protected $fillable = [
        'category_id',
        'created_by',
        'title',
        'slug',
        'excerpt',
        'description',
        'recipient',
        'organizer',
        'level',
        'achievement_date',
        'thumbnail',
        'featured',
        'is_published',
        'published_at'
    ];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'is_published' => 'boolean',
            'achievement_date' => 'date',
            'published_at' => 'datetime',
        ];
    }

    /*
     * Relationship dengan model AchievementImage.
     */
    public function images(): HasMany
    {
        return $this->hasMany(AchievementImage::class);
    }

    /*
     * Relationship dengan model Category.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class)
            ->withDefault([
                'name' => 'Tidak ada kategori',
            ]);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'created_by')
            ->withDefault([
                'name' => 'Tidak diketahui',
            ]);
    }
    
    /*
     * Scope untuk mengambil data yang sudah dipublikasikan.
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    /*
     * Scope untuk mengambil data draft.
     */
    public function scopeDraft(Builder $query): Builder
    {
        return $query->where('is_published', false);
    }

    /*
     * Scope untuk mengambil prestasi unggulan.
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('featured', true);
    }
}
