Laravel Setup Code API >>>


https://getcomposer.org/download/

install composer and set composer path and check php --version & composer --version

After restart the CMD then check 

# composer install

# project create >>>

# composer create-project --prefer-dist laravel/laravel cdp_api

# cd cdp_api

# mv .env.example .env
# php artisan key:generate
# php artisan serve

# how to check laravel version >>

php artisan --version

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


How to create api in laravel 11.0.1 >>>

Step for Laravel 11 Sanctum REST API Authentication Example
Step 1: Install Laravel 11
Step 2: Install Sanctum API
Step 3: Sanctum Configuration
Step 4: Add Product Table and Model
Step 5: Create API Routes
Step 6: Create Controller Files

Run Laravel App

++++++++++++++++++++++++++++++++++++++++++

Api documents url :

https://laravel.com/api/11.x/

Step 1: Install Laravel 11 

# composer create-project laravel/laravel example-app

Step 2: Install Sanctum API

# php artisan install:api

Step 3: Sanctum Configuration

app/Models/User.php >>>>

+++++++++++++++++++++++++++++++++++++

Step 4: Add Product Table and Model

php artisan make:migration create_products_table

+++++++++++++++++++++++++++++

# php artisan migrate

+++++++++++++++++++++++++++++

app/Models/Product.php >>

++++++++++++++++++++++++++++++++++++++++++

Step 5: Create API Routes

routes/api.php >>

++++++++++++++++++++++++++++++++++++++

for login & register

app/Http/Controllers/API/RegisterController.php

++++++++++++++++++++++++++++++++++++++=

app/Http/Controllers/API/ProductController.php  >>>

write code in this file ..

++++++++++++++++++++++++++++++++++++++++++

Step 7: Create Eloquent API Resources  >>>

# php artisan make:resource ProductResource

++++++++++++++++++++++++++++++++++++++++++

app/Http/Resources/ProductResource.php >>>>

write some code in array response ..
++++++++++++++++++++++++++++++++++++++++++++++


run server in php >>>

# php artisan serve

++++++++++++++++++++++++++++++++++++++++++++++

Now, go to your Postman and check the following APIs.

Make sure in the details API, we will use the following headers as listed below:

'headers' => [
    'Accept' => 'application/json',
    'Authorization' => 'Bearer '.$accessToken,
]

++++++++++++++++++++++++++++++++++++++++++++++


If you create model , resource , controller all in single command >>

#  php artisan make:controller API/UserSettingController --model=UserSetting --resource

+++++++++++++++++++++++++++++++++++++++++++++++

migrate table >>>

# php artisan migrate 

+++++++++++++++++++++++++++++++++++++++++++++++


If i need to remove Intervention\Image  ( package ) then run one command >>

# composer remove intervention/image --verbose

++++++++++++++++++++++++++++++++++++++++++++++++

Composer Diagnoses:  composer diagnose  ( to check for common issues in your setup. )

++++++++++++++++++++++++++++++++++++++++++++++++++

How to genrate pdf >>>

package install >>

#  composer require barryvdh/laravel-dompdf

need to remove its extra for then update ..

++++++++++++++++++++++++++++++++++++++++++++++++++++


How to handle wrong url in api response >>>

bootstrap/app.php >>>

add some code >>>

<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status'=>false,
                    'data'=>[],
                    'message' => 'Page not found.'
                ], 404);
            }
        });
    })->create();
	
	
	
clear cache >>  php artisan cache:clear

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







