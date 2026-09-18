<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/inquiry', function () {
    return Inertia::render('Inquiry');
})->name('inquiry');
