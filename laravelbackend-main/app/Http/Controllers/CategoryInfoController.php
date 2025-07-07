<?php

namespace App\Http\Controllers;

use App\Models\CategoryInfo;
use Illuminate\Http\Request;

class CategoryInfoController extends Controller
{
    public function index()
    {
        return response()->json(CategoryInfo::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category = CategoryInfo::create($request->all());

        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = CategoryInfo::find($id);

        return $category
            ? response()->json($category)
            : response()->json(['message' => 'Not Found'], 404);
    }

    public function update(Request $request, $id)
    {
        $category = CategoryInfo::find($id);
        if (!$category) return response()->json(['message' => 'Not Found'], 404);

        $category->update($request->all());

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = CategoryInfo::find($id);
        if (!$category) return response()->json(['message' => 'Not Found'], 404);

        $category->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

