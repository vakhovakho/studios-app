<?php

use Illuminate\Database\Seeder;

class StudiosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [];

        for($i = 1; $i < 25; $i++) {
            $data[] = [
                'name' => "Studio {$i}",
                'category_id' => rand(1,4),
                'path' => "/studio{$i}.mp4"
            ];
        }

        \Illuminate\Support\Facades\DB::table('studios')
            ->insert($data);
    }
}
