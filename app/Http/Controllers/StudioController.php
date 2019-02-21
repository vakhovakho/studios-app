<?php

namespace App\Http\Controllers;

use App\Events\StudioHasBeenAdded;
use App\Models\Category;
use App\Models\Studio;
use Illuminate\Http\Request;

class StudioController extends Controller
{
    public function index() {
        $studios = Studio::query()
            ->orderByDesc('id')
            ->with('category')
            ->paginate(Studio::FirstViewLimit);

        return $studios;
    }

    public function update() {
        $nextNumber = Studio::query()->count();

        $newStudio = new Studio([
            'name' => "studio {$nextNumber}",
            'path' => "/studio{$nextNumber}.mp4"
        ]);

       Category::query()
            ->find(rand(1,4))
            ->studios()
            ->save($newStudio);

        $newStudio['category'] = $newStudio->category;

        StudioHasBeenAdded::dispatch($newStudio);

        return 'New Studio Has Been Added';
    }
}
