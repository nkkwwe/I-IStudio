<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InquiryChatController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectInquiryReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
        Route::get('/', [HomeController::class, 'show'])->name('home.localized');

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
    Route::patch('/account/project-briefs/{inquiry}/cancel', [InquiryController::class, 'cancel'])->name('account.project-briefs.cancel');
    Route::get('/account/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'indexForUser'])->name('account.project-briefs.messages');
    Route::post('/account/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'storeForUser'])->name('account.project-briefs.messages.store');
    Route::post('/account/project-briefs/{inquiry}/messages/activity', [InquiryChatController::class, 'activityForUser'])->name('account.project-briefs.activity');
    Route::put('/account/project-briefs/{inquiry}/review', [ProjectInquiryReviewController::class, 'save'])->name('account.project-briefs.review.save');
    Route::get('/project-inquiry-review-attachments/{attachment}', [ProjectInquiryReviewController::class, 'attachment'])->name('project-inquiry-review-attachments.show');
    Route::get('/project-inquiry-reviews/{review}/attachment', [ProjectInquiryReviewController::class, 'legacyAttachment'])->name('project-inquiry-reviews.attachment');
    Route::get('/project-inquiry-messages/{message}/attachment', [InquiryChatController::class, 'attachment'])->name('project-inquiry-messages.attachment');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function (): void {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/project-briefs', [AdminController::class, 'projectBriefs'])->name('admin.project-briefs');
    Route::get('/project-briefs/unread-counts', [InquiryChatController::class, 'unreadCountsForAdmin'])->name('admin.project-briefs.unread-counts');
    Route::patch('/project-briefs/{inquiry}/status', [AdminController::class, 'updateInquiryStatus'])->name('admin.project-briefs.status');
    Route::get('/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'indexForAdmin'])->name('admin.project-briefs.messages');
    Route::post('/project-briefs/{inquiry}/messages', [InquiryChatController::class, 'storeForAdmin'])->name('admin.project-briefs.messages.store');
    Route::post('/project-briefs/{inquiry}/messages/activity', [InquiryChatController::class, 'activityForAdmin'])->name('admin.project-briefs.activity');
    Route::get('/registered-users', [AdminController::class, 'registeredUsers'])->name('admin.registered-users');
    Route::get('/registered-users/{user}', [AdminController::class, 'userDetails'])->name('admin.user-details');
});
