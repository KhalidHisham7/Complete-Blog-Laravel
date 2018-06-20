<?php
namespace App\Http\Controllers;

class PostController extends Controller
{
    public function getBlogIndex()
    {
      //Fetching post and paginate
      return view('frontend.blog.index');
    }

    public function getSinglePost($post_id , $end = 'frontend')
    {
      //Fetching post
      return view($end . '.blog.single');
    }
}
