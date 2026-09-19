<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

    public function register(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'email.unique' => 'Цей email уже зареєстрований. Увійдіть у профіль.',
            'password.min' => 'Пароль має містити щонайменше 8 символів.',
            'password.confirmed' => 'Паролі не збігаються.',
        ]);

        $email = mb_strtolower(trim($data['email']));
        $name = trim((string) ($data['name'] ?? '')) ?: Str::before($email, '@');

        $user = User::query()->create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($data['password']),
        ]);
        $user->forceFill(['email_verified_at' => now()])->save();

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
