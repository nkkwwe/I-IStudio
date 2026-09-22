<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\InquiryChatController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/inquiry', [InquiryController::class, 'show'])->name('inquiry');
Route::post('/inquiry', [InquiryController::class, 'store'])->name('inquiry.store');

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::get('/register', fn () => redirect()->route('login'))->name('register');
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login')->name('login.store');
    Route::post('/register/request-code', [AuthController::class, 'requestRegistrationCode'])->middleware('throttle:user-email-code')->name('register.request-code');
    Route::post('/register/verify-code', [AuthController::class, 'verifyRegistrationCode'])->middleware('throttle:user-email-verify')->name('register.verify-code');
    Route::get('/register/reset', [AuthController::class, 'resetRegistration'])->name('register.reset');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');
    Route::get('/auth/google', [AuthController::class, 'googleRedirect'])->name('auth.google');
    Route::get('/auth/google/callback', [AuthController::class, 'googleCallback'])->name('auth.google.callback');
});

Route::middleware('auth')->group(function (): void {
    Route::get('/account', [InquiryController::class, 'account'])->name('account');
    Route::get('/account/project-briefs', [InquiryController::class, 'mine'])->name('account.project-briefs');
    Route::get('/account/project-briefs/unread-counts', [InquiryController::class, 'unreadCounts'])->name('account.project-briefs.unread-counts');
    Route::get('/account/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'indexForUser'])->name('account.project-briefs.messages');
    Route::post('/account/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'storeForUser'])->name('account.project-briefs.messages.store');
    Route::get('/project-inquiry-messages/{message}/attachment', [InquiryChatController::class, 'attachment'])->name('project-inquiry-messages.attachment');
    Route::patch('/account/profile', [AuthController::class, 'updateProfile'])->name('account.profile.update');
    Route::delete('/account', [AuthController::class, 'deleteAccount'])->name('account.delete');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function (): void {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/project-briefs', [AdminController::class, 'projectBriefs'])->name('admin.project-briefs');
    Route::patch('/project-briefs/{inquiry}/status', [AdminController::class, 'updateInquiryStatus'])->name('admin.project-briefs.status');
    Route::get('/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'indexForAdmin'])->name('admin.project-briefs.messages');
    Route::post('/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'storeForAdmin'])->name('admin.project-briefs.messages.store');
    Route::get('/registered-users', [AdminController::class, 'registeredUsers'])->name('admin.registered-users');
});
