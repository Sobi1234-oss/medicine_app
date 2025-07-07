<?php

use App\Http\Controllers\CategoryInfoController;
use App\Http\Controllers\ProductInfoController;
use App\Http\Controllers\OrderInfoController;
use App\Http\Controllers\UserController;


Route::apiResource('categories', CategoryInfoController::class);
Route::apiResource('products', ProductInfoController::class);
Route::apiResource('orders', OrderInfoController::class);
Route::apiResource('users', UserController::class);
Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);

// In routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/store-fcm-token', [UserController::class, 'storeFcmToken']);
    Route::post('/orders', [OrderInfoController::class, 'store']);
    // Add other protected routes here
});