<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderInfo extends Model
{
    protected $table = 'order_info';
protected $fillable = ['product_id', 'location', 'total_amount', 'quantity'];
  public function product()
{
    return $this->belongsTo(ProductInfo::class, 'product_id');
}

    
}

