<?php

use App\Http\Controllers\AuthController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/inquiry', function () {
    return Inertia::render('Inquiry');
})->name('inquiry');

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
    Route::post('/register/request-code', [AuthController::class, 'requestRegistrationCode'])->middleware('throttle:user-email-code')->name('register.request-code');
    Route::post('/register/verify-code', [AuthController::class, 'verifyRegistrationCode'])->middleware('throttle:user-email-verify')->name('register.verify-code');
    Route::get('/register/reset', [AuthController::class, 'resetRegistration'])->name('register.reset');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');
    Route::get('/auth/google', [AuthController::class, 'googleRedirect'])->name('auth.google');
    Route::get('/auth/google/callback', [AuthController::class, 'googleCallback'])->name('auth.google.callback');
});

Route::middleware('auth')->group(function (): void {
    Route::get('/account', function () {
        return Inertia::render('Account');
    })->name('account');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
