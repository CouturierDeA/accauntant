const {mix} = require('laravel-mix');

mix.sass('resources/assets/sass/index.scss', '/css/index.css')
    .js('resources/assets/js/index.js', '/js/index.js')
    .disableNotifications();
