<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasSlug, HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'description'
    ];

    public function achievements(): HasMany
    {
        return $this->hasMany(Achievement::class);
    }
}