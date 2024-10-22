<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index($receiverId)
    {
        $messages = Message::where('sender_id', auth()->id())
                    ->where('receiver_id', $receiverId)
                    ->orWhere(function ($query) use ($receiverId) {
                        $query->where('sender_id', $receiverId)
                              ->where('receiver_id', auth()->id());
                    })
                    ->orderBy('created_at', 'asc')
                    ->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        broadcast(new \App\Events\MessageSent($message))->toOthers();

        return response()->json($message, 201);
    }
}
