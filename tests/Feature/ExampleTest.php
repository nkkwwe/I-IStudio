<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_home_page_uses_the_react_home_component(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Home'));
    }

    public function test_inquiry_page_uses_the_react_inquiry_component(): void
    {
        $this->get('/inquiry')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Inquiry'));
    }

    public function test_forwarded_https_requests_generate_https_asset_urls(): void
    {
        $this->withHeader('X-Forwarded-Proto', 'https')
            ->get('https://i-istudio.onrender.com/')
            ->assertOk()
            ->assertSee('https://i-istudio.onrender.com/build/assets/', false);
    }
}
