@extends('layouts.app')

@section('content')
<div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Reset Password</h2>

        <form method="POST" action="{{ route('password.update') }}">
            @csrf

            <!-- Token (Hidden) -->
            <input type="hidden" name="token" value="{{ $token }}">

            <!-- Email Field -->
            <div class="mb-4">
                <label for="email" class="block text-gray-600">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    value="{{ old('email') }}" 
                    required
                >
                @error('email')
                    <p class="text-red-500 text-sm mt-2">{{ $message }}</p>
                @enderror
            </div>

            <!-- Password Field -->
            <div class="mb-4">
                <label for="password" class="block text-gray-600">New Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                >
                @error('password')
                    <p class="text-red-500 text-sm mt-2">{{ $message }}</p>
                @enderror
            </div>

            <!-- Confirm Password Field -->
            <div class="mb-4">
                <label for="password_confirmation" class="block text-gray-600">Confirm Password</label>
                <input 
                    type="password" 
                    id="password_confirmation" 
                    name="password_confirmation" 
                    class="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required
                >
            </div>

            <!-- Submit Button -->
            <div class="mb-6">
                <button type="submit" class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none">
                    Reset Password
                </button>
            </div>

            <div class="text-center">
                <a href="{{ route('login') }}" class="text-blue-500 hover:text-blue-700">Back to Login</a>
            </div>
        </form>
    </div>
</div>
@endsection
