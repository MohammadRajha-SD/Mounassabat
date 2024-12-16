<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class ForgotPasswordController extends Controller
{

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );
        return response()->json(['message' => $status], 200);

        // if ($status == Password::RESET_LINK_SENT) {
        // return response()->json(['message' => $status], 200);
        // }

        // return response()->json(['message' => $status], 400);
    }
}
