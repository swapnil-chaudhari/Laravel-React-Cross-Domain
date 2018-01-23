<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;

class CategoriesController extends Controller
{
    public function index(Request $request)
    {
        $results = Categories::all('id', 'categoryTitle', 'categoryDescription')->toArray();

        if (!$results){
            $results = ['error'  =>  'No information found.'];

            return response()->json([
                'error'  =>  'No information found.'
            ]);
          }

        return response()->json([
              'results'  => $results
            ]);

    }

    public function store(Request $request)
    {
      $categories = new Categories;
      $categories->categoryTitle = $request->categoryTitle;
      $categories->categoryDescription = $request->categoryDescription;
      $categories->save();
      return response()->json([
        'results'  =>  'Category is added successfully.'
      ]);
    }

    public function update(Request $request, $id)
    {
        try {
          Categories::find($id)->update($request->all());
          return response()->json([
              'results'  =>  'Category is updated successfully.'
          ]);
        } catch(Exception $e) {
            return response()->json([
                'results'  =>  'Update operation has failed.'
            ]);
        }
    }

    public function destroy($id)
    {
        try {
          Categories::find($id)->delete();
          return response()->json([
              'results'  =>  'Category is deleted successfully.'
          ]);
        } catch(Exception $e) {
            return response()->json([
                'results'  =>  'Delete operation has failed.'
            ]);
        }
    }

}