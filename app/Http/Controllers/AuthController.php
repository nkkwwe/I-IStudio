<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Services\EmailCodeSender;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class AuthController extends Controller
{
    public function showLogin(): Response
    {
        return Inertia::render('Auth', ['mode' => 'login']);
    }

    public function showRegister(): Response
    {
        return Inertia::render('Auth', ['mode' => 'register']);
    }

    public function requestRegistrationCode(Request $request, EmailCodeSender $sender): RedirectResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email:rfc', 'max:255'],
        ], [
            'email.email' => 'Введіть коректний email.',
        ]);

        $email = mb_strtolower(trim($data['email']));

        if (User::query()->whereRaw('LOWER(email) = ?', [$email])->exists()) {
            throw ValidationException::withMessages([
                'email' => 'Цей email уже зареєстрований. Увійдіть у профіль.',
            ]);
        }

        if (! $sender->configured()) {
            throw ValidationException::withMessages([
                'email' => 'Відправка кодів на email ще не налаштована на сервері.',
            ]);
        }

        $code = (string) random_int(100000, 999999);
        $now = now();

        DB::table('email_verifications')->updateOrInsert(
            ['email' => $email],
            [
                'code_hash' => Hash::make($code),
                'expires_at' => $now->copy()->addMinutes(10),
                'attempts' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        );

        try {
            $sender->send($email, $code);
        } catch (Throwable $exception) {
            report($exception);
            DB::table('email_verifications')->where('email', $email)->delete();

            throw ValidationException::withMessages([
                'email' => 'Не удалось отправить код. Проверьте email и попробуйте ещё раз.',
            ]);
        }

        $request->session()->put('registration', [
            'email' => $email,
            'code_sent' => true,
            'verified' => false,
        ]);

        return redirect()->route('register')->with('verification_sent', true);
    }

    public function verifyRegistrationCode(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email:rfc', 'max:255'],
            'code' => ['required', 'digits:6'],
        ], [
            'email.email' => 'Введіть коректний email.',
            'code.digits' => 'Код має містити 6 цифр.',
        ]);

        $email = mb_strtolower(trim($data['email']));
        $registration = $request->session()->get('registration', []);

        if (($registration['email'] ?? null) !== $email) {
            throw ValidationException::withMessages([
                'email' => 'Спочатку запросіть код для цього email.',
            ]);
        }

        $verification = DB::table('email_verifications')->where('email', $email)->first();

        if (! $verification || Carbon::parse($verification->expires_at)->isPast()) {
            throw ValidationException::withMessages([
                'code' => 'Код недійсний або його термін дії закінчився. Запросіть новий.',
            ]);
        }

        if ($verification->attempts >= 5) {
            throw ValidationException::withMessages([
                'code' => 'Забагато невдалих спроб. Запросіть новий код.',
            ]);
        }

        if (! Hash::check($data['code'], $verification->code_hash)) {
            DB::table('email_verifications')->where('email', $email)->increment('attempts');

            throw ValidationException::withMessages([
                'code' => 'Неправильний код підтвердження.',
            ]);
        }

        DB::table('email_verifications')->where('email', $email)->delete();
        $request->session()->put('registration', [
            'email' => $email,
            'code_sent' => true,
            'verified' => true,
        ]);

        return redirect()->route('register')->with('verification_success', true);
    }

    public function resetRegistration(Request $request): RedirectResponse
    {
        $request->session()->forget('registration');

        return redirect()->route('register');
    }

    public function register(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:120'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'password.min' => 'Пароль має містити щонайменше 8 символів.',
            'password.confirmed' => 'Паролі не збігаються.',
        ]);

        $registration = $request->session()->get('registration', []);
        $email = (string) ($registration['email'] ?? '');

        if ($email === '' || ! ($registration['verified'] ?? false)) {
            throw ValidationException::withMessages([
                'email' => 'Спочатку підтвердіть email кодом.',
            ]);
        }

        if (User::query()->whereRaw('LOWER(email) = ?', [$email])->exists()) {
            throw ValidationException::withMessages([
                'email' => 'Цей email уже зареєстрований. Увійдіть у профіль.',
            ]);
        }

        $name = trim((string) ($data['name'] ?? '')) ?: Str::before($email, '@');

        $user = User::query()->create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($data['password']),
        ]);
        $user->forceFill(['email_verified_at' => now()])->save();
        $request->session()->forget('registration');

        Auth::login($user, true);
        $request->session()->regenerate();

        return redirect()->intended(route('account'));
    }

    public function login(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email:rfc', 'max:255'],
            'password' => ['required', 'string'],
            'remember' => ['nullable', 'boolean'],
        ], [
            'email.email' => 'Введіть коректний email.',
        ]);

        $credentials = [
            'email' => mb_strtolower(trim($data['email'])),
            'password' => $data['password'],
        ];

        if (! Auth::attempt($credentials, (bool) ($data['remember'] ?? false))) {
            throw ValidationException::withMessages([
                'email' => 'Неправильний email або пароль.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('account'));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }

    public function updateProfile(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
        ], [
            'name.required' => 'Введите имя.',
            'name.max' => 'Имя не должно быть длиннее 120 символов.',
        ]);

        $name = trim($data['name']);
        if ($name === '') {
            throw ValidationException::withMessages([
                'name' => 'Введите имя.',
            ]);
        }

        $request->user()->forceFill(['name' => $name])->save();

        return back()->with('profile_updated', true);
    }

    public function deleteAccount(Request $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $user->delete();

        return redirect()->route('home')->with('account_deleted', true);
    }

    public function googleRedirect(): RedirectResponse
    {
        if (! config('services.google.client_id') || ! config('services.google.client_secret')) {
            return redirect()->route('login')->withErrors([
                'google' => 'Вхід через Google ще не налаштований у змінних Render.',
            ]);
        }

        return Socialite::driver('google')->redirect();
    }

    public function googleCallback(Request $request): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Throwable $exception) {
            report($exception);

            return redirect()->route('login')->withErrors([
                'google' => 'Не вдалося завершити вхід через Google. Спробуйте ще раз.',
            ]);
        }

        $email = mb_strtolower(trim((string) $googleUser->getEmail()));
        $googleId = trim((string) $googleUser->getId());

        if ($email === '' || $googleId === '') {
            return redirect()->route('login')->withErrors([
                'google' => 'Google не повернув необхідні дані для входу.',
            ]);
        }

        $userByGoogle = User::query()->where('google_id', $googleId)->first();
        $userByEmail = User::query()->whereRaw('LOWER(email) = ?', [$email])->first();

        if ($userByGoogle && $userByEmail && ! $userByGoogle->is($userByEmail)) {
            return redirect()->route('login')->withErrors([
                'google' => 'Цей Google-профіль і email прив’язані до різних акаунтів.',
            ]);
        }

        if ($userByEmail?->google_id && $userByEmail->google_id !== $googleId) {
            return redirect()->route('login')->withErrors([
                'google' => 'Цей email уже прив’язаний до іншого Google-профілю.',
            ]);
        }

        $user = $userByGoogle ?? $userByEmail;
        if (! $user) {
            $googleName = trim((string) ($googleUser->getName() ?: $googleUser->getNickname()));
            $user = new User([
                'name' => $googleName !== '' ? $googleName : Str::before($email, '@'),
                'email' => $email,
            ]);
        }

        $user->forceFill([
            'email' => $email,
            'google_id' => $googleId,
            'avatar' => $googleUser->getAvatar(),
            'email_verified_at' => now(),
        ])->save();

        Auth::login($user, true);
        $request->session()->regenerate();

        return redirect()->intended(route('account'));
    }
}
