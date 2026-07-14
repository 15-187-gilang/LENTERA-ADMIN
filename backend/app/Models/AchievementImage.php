<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AchievementImage extends Model
{
    use HasFactory;

    protected $fillable = [

        'achievement_id',

        'image',

        'caption',

        'sort_order',

    ];

    protected function casts(): array
    {
        return [

            'sort_order' => 'integer',

        ];
    }

    public function achievement(): BelongsTo
    {
        return $this->belongsTo(
            Achievement::class
        );
    }
}