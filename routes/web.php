<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\InquiryChatController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

$siteLocales = ['en', 'ua', 'ro'];

Route::get('/', fn () => redirect()->route('home.localized', ['locale' => 'en']))->name('home');

// Keep old unprefixed links working while making every user-facing page canonical under a locale.
Route::get('/inquiry', function (Request $request) {
    $url = route('inquiry.localized', ['locale' => 'en']);

    return redirect()->to($request->getQueryString() ? $url.'?'.$request->getQueryString() : $url);
})->name('inquiry');
Route::post('/inquiry', [InquiryController::class, 'store'])->name('inquiry.store');

Route::get('/login', function (Request $request) {
    $url = route('login.localized', ['locale' => 'en']);

    return redirect()->to($request->getQueryString() ? $url.'?'.$request->getQueryString() : $url);
})->name('login');
Route::get('/register', fn () => redirect()->route('login.localized', ['locale' => 'en']))->name('register');
Route::middleware('guest')->group(function (): void {
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login')->name('login.store');
    Route::post('/register/request-code', [AuthController::class, 'requestRegistrationCode'])->middleware('throttle:user-email-code')->name('register.request-code');
    Route::post('/register/verify-code', [AuthController::class, 'verifyRegistrationCode'])->middleware('throttle:user-email-verify')->name('register.verify-code');
    Route::get('/register/reset', [AuthController::class, 'resetRegistration'])->name('register.reset');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');
});
Route::get('/account', fn () => redirect()->route('account.localized', ['locale' => 'en']))->name('account');
Route::get('/account/project-briefs', fn () => redirect()->route('account.project-briefs.localized', ['locale' => 'en']))->name('account.project-briefs');
Route::get('/auth/google', [AuthController::class, 'googleRedirect'])->middleware('guest')->name('auth.google');
Route::get('/auth/google/callback', [AuthController::class, 'googleCallback'])->name('auth.google.callback');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');
Route::patch('/account/profile', [AuthController::class, 'updateProfile'])->middleware('auth')->name('account.profile.update');
Route::delete('/account', [AuthController::class, 'deleteAccount'])->middleware('auth')->name('account.delete');

Route::prefix('{locale}')
    ->whereIn('locale', $siteLocales)
    ->group(function (): void {
        Route::get('/', function () {
            return Inertia::render('Home');
        })->name('home.localized');

        Route::get('/inquiry', [InquiryController::class, 'show'])->name('inquiry.localized');
        Route::post('/inquiry', [InquiryController::class, 'store'])->name('inquiry.store.localized');

        Route::middleware('guest')->group(function (): void {
            Route::get('/login', [AuthController::class, 'showLogin'])->name('login.localized');
            Route::get('/register', fn (Request $request) => redirect()->route('login.localized', ['locale' => $request->route('locale')]))->name('register.localized');
            Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login')->name('login.store.localized');
            Route::post('/register/request-code', [AuthController::class, 'requestRegistrationCode'])->middleware('throttle:user-email-code')->name('register.request-code.localized');
            Route::post('/register/verify-code', [AuthController::class, 'verifyRegistrationCode'])->middleware('throttle:user-email-verify')->name('register.verify-code.localized');
            Route::get('/register/reset', [AuthController::class, 'resetRegistration'])->name('register.reset.localized');
            Route::post('/register', [AuthController::class, 'register'])->name('register.store.localized');
            Route::get('/auth/google', [AuthController::class, 'googleRedirect'])->name('auth.google.localized');
        });

        Route::middleware('auth')->group(function (): void {
            Route::get('/account', [InquiryController::class, 'account'])->name('account.localized');
            Route::get('/account/project-briefs', [InquiryController::class, 'mine'])->name('account.project-briefs.localized');
            Route::patch('/account/profile', [AuthController::class, 'updateProfile'])->name('account.profile.update.localized');
            Route::delete('/account', [AuthController::class, 'deleteAccount'])->name('account.delete.localized');
            Route::post('/logout', [AuthController::class, 'logout'])->name('logout.localized');
        });
    });

// These endpoints are application APIs and remain unprefixed.
Route::middleware('auth')->group(function (): void {
    Route::get('/account/project-briefs/unread-counts', [InquiryController::class, 'unreadCounts'])->name('account.project-briefs.unread-counts');
    Route::get('/account/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'indexForUser'])->name('account.project-briefs.messages');
    Route::post('/account/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'storeForUser'])->name('account.project-briefs.messages.store');
    Route::get('/project-inquiry-messages/{message}/attachment', [InquiryChatController::class, 'attachment'])->name('project-inquiry-messages.attachment');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function (): void {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/project-briefs', [AdminController::class, 'projectBriefs'])->name('admin.project-briefs');
    Route::patch('/project-briefs/{inquiry}/status', [AdminController::class, 'updateInquiryStatus'])->name('admin.project-briefs.status');
    Route::get('/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'indexForAdmin'])->name('admin.project-briefs.messages');
    Route::post('/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'storeForAdmin'])->name('admin.project-briefs.messages.store');
    Route::get('/registered-users', [AdminController::class, 'registeredUsers'])->name('admin.registered-users');
});
