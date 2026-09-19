<?php

namespace App\Services;

use App\Mail\EmailVerificationCode;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class EmailCodeSender
{
    public function configured(): bool
    {
        return (bool) config('services.resend.key') || config('mail.default') !== 'log';
    }

    public function send(string $email, string $code): void
    {
        $resendApiKey = config('services.resend.key');

        if ($resendApiKey) {
            Http::acceptJson()
                ->withToken($resendApiKey)
                ->timeout(15)
                ->post('https://api.resend.com/emails', [
                    'from' => sprintf('%s <%s>', config('mail.from.name'), config('mail.from.address')),
                    'to' => [$email],
                    'subject' => 'Код подтверждения I&I Studio',
                    'html' => view('emails.email-verification-code', ['code' => $code])->render(),
                ])
                ->throw();

            return;
        }

        Mail::to($email)->send(new EmailVerificationCode($code));
    }
}
