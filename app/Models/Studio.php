<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Studio extends Model
{
    protected $table = 'studios';
    protected $fillable = ['name', 'path'];

    const FirstViewLimit = 20;

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function getPathAttribute($value) {
        return asset($value);
    }
}
