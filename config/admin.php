<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Administrator access
    |--------------------------------------------------------------------------
    |
    | Keep the administrator allowlist outside the repository. The value is
    | normalized before it is compared with the authenticated user's email.
    |
    */

    'email' => env('ADMIN_EMAIL', ''),
];
