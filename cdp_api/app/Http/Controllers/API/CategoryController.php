<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Category;
use Validator;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\JsonResponse;
use Exception;

class CategoryController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $categories = Category::all();
            return $this->sendResponse(CategoryResource::collection($categories), 'categories retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error retrieving categories.', [$e->getMessage()]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $input = $request->all();
        
            $validator = Validator::make($input, [
                'name' => 'required',
                'is_active' => 'sometimes|required|boolean',
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }
        
            $category = Category::create($input);
        
            return $this->sendResponse(new CategoryResource($category), 'Category created successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error creating Category.', [$e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id): JsonResponse
    {
        try {
            $category = Category::find($id);
        
            if (is_null($category)) {
                return $this->sendError('Category not found.');
            }
        
            return $this->sendResponse(new CategoryResource($category), 'Category retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error retrieving Category.', [$e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Category  $Category
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Category $category): JsonResponse
    {
        try {
            $input = $request->all();
        
            $validator = Validator::make($input, [
                'name' => 'required',
                'is_active' => 'sometimes|required|boolean',
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }
        
            $category->name = $input['name'];
            $category->is_active = $input['is_active'];
            $category->save();
        
            return $this->sendResponse(new CategoryResource($category), 'Category updated successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error updating Category.', [$e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Category  $Category
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Category $category): JsonResponse
    {
        try {
            $category->delete();
            return $this->sendResponse([], 'Category deleted successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error deleting Category.', [$e->getMessage()]);
        }
    }
}
