<?php
  
namespace App\Models;
  
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
  
class Product extends Model
{
    use HasFactory;
  
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'detail' , 'category_id'
    ];

    /** 
     * This method defines the relationship between the Product and User models.
     * It indicates that each product belongs to a user.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}