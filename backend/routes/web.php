<?php

use App\Events\MessageSent;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    // event(new MessageSent('hello world'));
    // dd('sent');
    return view('welcome');
});

Route::post('/send-message', function (\Illuminate\Http\Request $request) {
    $message = $request->input('message');
    event(new MessageSent($message));
    return response()->json(['status' => 'Message sent!']);
});
