<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Product;
use Validator;
use App\Http\Resources\ProductResource;
use Illuminate\Http\JsonResponse;
use Exception;

class ProductController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $products = Product::with('category')->get();
            return $this->sendResponse(ProductResource::collection($products), 'Products retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error retrieving products.', [$e->getMessage()]);
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
                'detail' => 'required',
                'category_id' => 'required'
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }
        
            $product = Product::create($input);
        
            return $this->sendResponse(new ProductResource($product), 'Product created successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error creating product.', [$e->getMessage()]);
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
            $product = Product::with('category')->find($id);
        
            if (is_null($product)) {
                return $this->sendError('Product not found.');
            }
        
            return $this->sendResponse(new ProductResource($product), 'Product retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error retrieving product.', [$e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Product $product): JsonResponse
    {
        try {
            $input = $request->all();
        
            $validator = Validator::make($input, [
                'name' => 'required',
                'detail' => 'required',
                'category_id' => 'required'
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }
        
            $product->name = $input['name'];
            $product->detail = $input['detail'];
            $product->category_id = $input['category_id'];
            $product->save();
        
            return $this->sendResponse(new ProductResource($product), 'Product updated successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error updating product.', [$e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Product $product): JsonResponse
    {
        try {
            $product->delete();
            return $this->sendResponse([], 'Product deleted successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error deleting product.', [$e->getMessage()]);
        }
    }
}
