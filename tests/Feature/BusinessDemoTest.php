<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class BusinessDemoTest extends TestCase
{
    public function test_business_sites_have_real_inner_pages_in_every_locale(): void
    {
        foreach (['en', 'ua', 'ro'] as $locale) {
            foreach (['meridian', 'forma', 'verde', 'studio'] as $design) {
                foreach (['home', 'collection', 'about', 'journal', 'contact'] as $section) {
                    $suffix = $section === 'home' ? '' : "/{$section}";
                    $this->get("/{$locale}/designs/{$design}{$suffix}")
                        ->assertOk()
                        ->assertInertia(fn (Assert $page) => $page->component('BusinessDemo')->where('design', $design)->where('section', $section));
                }
            }
        }
    }

    public function test_detail_routes_are_scoped_to_the_correct_business(): void
    {
        foreach (['meridian' => 'growth-strategy', 'forma' => 'quiet-residence', 'verde' => 'ficus', 'studio' => 'open-culture'] as $design => $item) {
            $this->get("/en/designs/{$design}/item/{$item}")->assertOk()
                ->assertInertia(fn (Assert $page) => $page->component('BusinessDemo')->where('item', $item));
        }
        $this->get('/en/designs/verde/bag')->assertOk();
        foreach (['/en/designs/meridian/item/ficus', '/en/designs/forma/item', '/en/designs/studio/bag', '/en/designs/verde/about/ficus', '/en/designs/verde/unknown', '/fr/designs/verde'] as $path) {
            $this->get($path)->assertNotFound();
        }
    }
}
