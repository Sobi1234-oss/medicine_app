<?php
namespace App\Http\Controllers;

use App\Models\ProductInfo;
use Illuminate\Http\Request;

class ProductInfoController extends Controller
{
    public function index()
    {
        return response()->json(ProductInfo::with('category')->get());
    }

   public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'category_id' => 'required|exists:category_info,id',
        'price' => 'required|numeric|min:0',
        'description' => 'nullable|string',
        'img_path' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Validate as image
    ]);

    $data = $request->except('img_path');
    
    // Handle image upload
    if ($request->hasFile('img_path')) {
        $path = $request->file('img_path')->store('products', 'public');
        $data['img_path'] = $path;
    }

    $product = ProductInfo::create($data);

    return response()->json($product, 201);
}

    public function show($id)
    {
        $product = ProductInfo::with('category')->find($id);
        return $product
            ? response()->json($product)
            : response()->json(['message' => 'Not Found'], 404);
    }

    public function update(Request $request, $id)
    {
        $product = ProductInfo::find($id);
        if (!$product) return response()->json(['message' => 'Not Found'], 404);

        $product->update($request->all());

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = ProductInfo::find($id);
        if (!$product) return response()->json(['message' => 'Not Found'], 404);

        $product->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
