<?php

use App\Http\Controllers\ProfileController;
use App\Models\Todo;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;

use function PHPSTORM_META\map;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/todo', [App\Http\Controllers\TodoController::class, 'index'])->middleware(['auth', 'verified'])->name('todo');
Route::post('/todo/store', [App\Http\Controllers\TodoController::class, 'store'])->middleware(['auth', 'verified'])->name('todo.store');
Route::put('/todo/update/{id}', [App\Http\Controllers\TodoController::class, 'update'])->middleware(['auth', 'verified'])->name('todo.update');
Route::delete('/todo/delete/{id}', [App\Http\Controllers\TodoController::class, 'destroy'])->middleware(['auth', 'verified'])->name('todo.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
