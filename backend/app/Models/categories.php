<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    protected $fillable = ['categoryTitle', 'categoryDescription'];
    // public function user(){
    //     return $this->belongsTo('App\User');
    // }
}