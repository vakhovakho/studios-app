# studios-app

Little app for managing studios list and listening to websocket to insert recently added studios


## Before getting started:
*Configure Your Laravel App's .env variables for Laravel-websockets package
and bootstrap.js for pusher settings*
 
 
## To get App working, run following commands:
```
1. composer install
2. npm install
3. php artisan migrate:fresh --seed
4. php artisan serve //start your local server
5. php artisan websockets:serve
```
 
 
> *To test app navigate to* **homepage** *and in the other tab or window open* **'/update'** *url. this will add new studio dumb data in your database and update your homepage without refreshing it!*
 
 
 
**Main tools used in this proect:**
* Laravel PHP framework
* laravel-websockets package
 
 
* React.js framework
* rxjs library
* react-js-pagination package
* pusher.js library
* axios package
