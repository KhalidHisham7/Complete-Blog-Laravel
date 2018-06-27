<?php

use Illuminate\Database\Seeder;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new \App\Admin();
        $admin->email = "test@test.com";
        $admin->password = bcrypt('123465');
        $admin->save();
    }
}
