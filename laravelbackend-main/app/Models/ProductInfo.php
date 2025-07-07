<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductInfo extends Model
{
    protected $table = 'products_info';

    protected $fillable = ['name', 'details', 'category_id', 'price', 'description', 'img_path'];

    protected $appends = ['image_url']; // 👈 This line adds the custom accessor to API response

    public function category()
    {
        return $this->belongsTo(CategoryInfo::class, 'category_id');
    }

    public function getImageUrlAttribute()
    {
        return $this->img_path 
            ? url('storage/' . $this->img_path) 
            : null;
    }
}


