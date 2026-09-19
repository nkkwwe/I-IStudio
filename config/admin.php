<?php

$adminEmails = [];
$environmentSources = [
    is_array(getenv()) ? getenv() : [],
    $_ENV,
    $_SERVER,
];

foreach ($environmentSources as $environment) {
    foreach ($environment as $key => $value) {
        if (! preg_match('/^ADMIN_EMAIL[0-9]*$/', (string) $key)) {
            continue;
        }

        $email = mb_strtolower(trim((string) $value));
        if ($email !== '') {
            $adminEmails[] = $email;
        }
    }
}

$adminEmails = array_values(array_unique($adminEmails));

return [
    /*
    |--------------------------------------------------------------------------
    | Administrator access
    |--------------------------------------------------------------------------
    |
    | Keep the administrator allowlist outside the repository. Every variable
    | named ADMIN_EMAIL, ADMIN_EMAIL2, ADMIN_EMAIL3, etc. is included.
    |
    */

    'emails' => $adminEmails,
];
