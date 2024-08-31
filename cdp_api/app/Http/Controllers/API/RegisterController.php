<?php 

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Http\JsonResponse;
use Exception;

class RegisterController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'c_password' => 'required|same:password',
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }
        
            $input = $request->all();
            $input['is_admin'] = $input['isAdmin'];
            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
            $success['token'] = $user->createToken('CDP')->plainTextToken;
            $success['name'] = $user->name;
        
            return $this->sendResponse($success, 'User registered successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error registering user.', [$e->getMessage()]);
        }
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        try {
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = Auth::user();
                $success['token'] = $user->createToken('CDP')->plainTextToken;
                $success['name'] = $user->name;
                $success['email'] = $user->email;
                $success['is_admin'] = $user->is_admin;
                return $this->sendResponse($success, 'User logged in successfully.');
            } else {
                return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
            }
        } catch (Exception $e) {
            return $this->sendError('Error logging in user.', [$e->getMessage()]);
        }
    }
}
