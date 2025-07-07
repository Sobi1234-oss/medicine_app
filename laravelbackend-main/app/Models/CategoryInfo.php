<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryInfo extends Model
{
    protected $table = 'category_info';

    protected $fillable = ['name', 'description'];

    public function products()
    {
        return $this->hasMany(ProductInfo::class, 'category_id');
    }
}

