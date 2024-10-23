<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Message;
use App\Models\Conversation;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $conversation = Conversation::inRandomOrder()->first();

        if ($conversation) {
            foreach (range(1, 10) as $index) {
                Message::create([
                    'conversation_id' => $conversation->id,
                    'sender_id' => ($index % 2 === 0)
                        ? $conversation->sender_id
                        : $conversation->receiver_id,
                    'message' => "This is message #$index from user " . (($index % 2) + 1) . ".",
                    'is_read' => false,
                ]);
            }
        }
    }
}
