<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessageSent; // Import the MessageSent event

class MessageController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = $request->input('message');

        // Broadcast the message
        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['message' => $message], 200);
    }
}
