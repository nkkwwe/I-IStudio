<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Vite;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_home_page_uses_the_react_home_component(): void
    {
        $this->get('/en')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Home'));
    }

    public function test_inquiry_page_uses_the_react_inquiry_component(): void
    {
        $this->get('/en/inquiry')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Inquiry'));
    }

    public function test_forwarded_https_requests_generate_https_asset_urls(): void
    {
        Vite::useHotFile(storage_path('framework/testing-vite.hot'));

        $this->withHeader('X-Forwarded-Proto', 'https')
            ->get('https://i-istudio.onrender.com/en')
            ->assertOk()
            ->assertSee('https://i-istudio.onrender.com/build/assets/', false);
    }

    public function test_old_page_urls_redirect_to_localized_pages(): void
    {
        $this->get('/')->assertRedirect('/en');
        $this->get('/inquiry?service=ads')->assertRedirect('/en/inquiry?service=ads');
    }
}
