<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LandingDemoTest extends TestCase
{
    public function test_all_landing_demos_are_available_in_every_site_locale(): void
    {
        foreach (['en', 'ua', 'ro'] as $locale) {
            foreach (['mono', 'pulse', 'orbit', 'atelier'] as $design) {
                $this->get("/{$locale}/designs/{$design}")
                    ->assertOk()
                    ->assertInertia(fn (Assert $page) => $page
                        ->component('LandingDemo')
                        ->where('design', $design));
            }
        }
    }

    public function test_unavailable_designs_and_locales_are_not_rendered(): void
    {
        foreach (['/en/designs/unknown', '/fr/designs/mono'] as $path) {
            $this->get($path)->assertNotFound();
        }
    }
}
