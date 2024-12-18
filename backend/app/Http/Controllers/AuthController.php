<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Client;
use App\Models\Prestataire;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Google\Client as GoogleClient;

class AuthController extends Controller
{
    public function addUser(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:client,prestataire',
        ]);

        // Check if the email exists and return a custom error message
        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'error' => 'errror',
                'status' => 409
            ], 409);
        }

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Create the user
        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'phone' => $request->phone,
            'role' => $request->role,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create role-specific record
        switch ($request->role) {
            case 'client':
                Client::create(['user_id' => $user->id]);
                break;
            case 'prestataire':
                Prestataire::create(['user_id' => $user->id]);
                break;
        }

        return response()->json(['user' => $user], 201); // 201 Created
    }

    public function login(Request $request)
    {

        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $user = JWTAuth::user();

        $role = $user->role;

        return response()->json([
            'token' => $token,
            'user' => Auth::user(),
            'role' => $role,
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function me()
    {
        return response()->json(Auth::user());
    }

    public function verifyToken(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json(['valid' => true, 'user' => $user, 'message' => null], 200);
        } catch (\Exception $e) {
            return response()->json(['valid' => false, 'message' => 'Votre session a expiré. Veuillez vous reconnecter.'], 401);
        }
    }

    public function googleLogin(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'name' => 'required|string',
            'google_id' => 'required|string',
        ]);

        try {
            // Verify if the user exists
            $user = User::where('email', $validated['email'])->first();

            if ($user) {
                $user->google_id = $validated['google_id'];
                $user->save();

                $token = JWTAuth::fromUser($user);

                return response()->json([
                    'success' => true,
                    'message' => 'User found',
                    'user' => $user,
                    'token' => $token,
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => "The user is not registered via Google",
                ], 400);
            }
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => "Error creating token",
            ], 500);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => "Internal error",
                'error' => $err->getMessage(),
            ], 500);
        }
    }

    public function googleClientLogin(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'google_id' => 'required|string',
        ]);

        try {
            $user = User::where('email', $validated['email'])->first();
            
            if ($user) {
                // Update the Google ID for existing user
                $user->google_id = $validated['google_id'];
                $user->save();

                $token = JWTAuth::fromUser($user);

                return response()->json([
                    'success' => true,
                    'message' => 'User found',
                    'user' => $user,
                    'token' => $token,
                ], 200);
            } else {
                // Create a new user with the "client" role
                $user = User::create([
                    'firstName' => $validated['firstName'],
                    'lastName' => $validated['lastName'],
                    'email' => $validated['email'],
                    'google_id' => $validated['google_id'],
                    'role' => 'client',
                    'password' => Hash::make($validated['google_id']),
                ]);

                // Generate JWT token
                $token = JWTAuth::fromUser($user);

                return response()->json([
                    'success' => true,
                    'message' => 'User registered successfully',
                    'user' => $user,
                    'token' => $token,
                ], 201);
            }
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => "Error creating token",
            ], 500);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => "Internal error",
                'error' => $err->getMessage(),
            ], 500);
        }
    }

    public function googleProviderLogin(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'google_id' => 'required|string',
        ]);

        try {
            // Check if the user already exists
            $user = User::where('email', $validated['email'])->first();

            if ($user) {
                $user->google_id = $validated['google_id'];
                $user->save();

                $token = JWTAuth::fromUser($user);

                return response()->json([
                    'success' => true,
                    'message' => 'User found',
                    'user' => $user,
                    'token' => $token,
                ], 200);
            } else {
                // Create a new user with the "prestataire" role
                $user = User::create([
                    'firstName' => $validated['firstName'],
                    'lastName' => $validated['lastName'],
                    'email' => $validated['email'],
                    'google_id' => $validated['google_id'],
                    'role' => 'prestataire',
                    'password' => Hash::make($validated['google_id']),
                ]);

                // Generate JWT token
                $token = JWTAuth::fromUser($user);

                return response()->json([
                    'success' => true,
                    'message' => 'User registered successfully',
                    'user' => $user,
                    'token' => $token,
                ], 201);
            }
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => "Error creating token",
            ], 500);
        } catch (\Exception $err) {
            return response()->json([
                'success' => false,
                'message' => "Internal error",
                'error' => $err->getMessage(),
            ], 500);
        }
    }
}
