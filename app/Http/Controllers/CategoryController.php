<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Validator;
use App\Category;
use Illuminate\Support\Facades\Response;

class CategoryController extends Controller
{
  public function getCategoryIndex()
  {
    $categories = Category::orderBy('created_at' , 'desc')->paginate(5);
    return view('admin.blog.categories' , ['categories' => $categories]);
  }

  public function postCreateCategory(Request $request)
  {
    $this->validate($request , [
      'name' => 'required|unique:categories'
    ]);
    $category = new Category();
    $category->name = $request['name'];
    if($category->save())
    {
      return Response::json(['message' => 'Category Created.'] , 200);
    }
    return Response::json(['message' => 'Error during creation'] , 404);
  }
}
