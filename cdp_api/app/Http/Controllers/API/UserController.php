<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;
use App\Http\Resources\UserResource;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Exception;
use Illuminate\Support\Facades\Hash;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $users = User::all();
            return $this->sendResponse(UserResource::collection($users), 'Users retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error retrieving users.', [$e->getMessage()]);
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
        
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'is_admin' => 'required|boolean',
                'tc' => 'required|boolean',
                'password' => 'required|min:6',
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'is_admin' => $request->is_admin,
                'tc' => $request->tc,
                'password' => Hash::make($request->password),
            ]);    
        
            return $this->sendResponse(new UserResource($user), 'User created successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error creating user.', [$e->getMessage()]);
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
            $user = User::find($id);
        
            if (is_null($user)) {
                return $this->sendError('User not found.');
            }
        
            return $this->sendResponse(new UserResource($user), 'User retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error retrieving user.', [$e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, User $user): JsonResponse
    {
        try {
            $input = $request->all();
        
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
                'is_admin' => 'sometimes|required|boolean',
                'tc' => 'sometimes|required|boolean',
                'password' => 'nullable|min:6',
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }
        
            $user->update($request->except(['password']));
            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
                $user->save();
            }
            return $this->sendResponse(new UserResource($user), 'User updated successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error updating user.', [$e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(User $user): JsonResponse
    {
        try {
            $user->delete();
            return $this->sendResponse([], 'User deleted successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error deleting user.', [$e->getMessage()]);
        }
    }
}
