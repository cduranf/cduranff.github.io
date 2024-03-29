var cacheName = "perris-v22";
var filesToCache = [
    "/",
    "/index.html",
    "/registro.html",
    "/login.html",
    "/scripts/app.js",
    "/scripts/jquery-3.1.0.min.js",
    "/scripts/main.js",
    "/styles/main.css",
    "/styles/estil.css",
    "/styles/estilos.css",
    "/styles/font-awesome.css",
    "/styles/registro.css",
    "/fonts/fontawesome-webfont.woff2",
    "/fonts/fontawesome-webfont.woff",
    "/fonts/fontawesome-webfont.ttf",
    "/fonts/fontawesome-webfont.svg",
    "/fonts/fontawesome-webfont.eot",
    "/fonts/FontAwesome.otf",
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/dog-icono.png",
    "/images/img1.jpeg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.jpg",
    "/images/img7.png"
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( cacheName ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
} );

self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys( ).then( function( keyList ) {
            return Promise.all( keyList.map( function( key ) {
                if ( key != cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete( key );
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener( 'fetch', function( e ) {
    console.log( '[ServiceWorker] Fetch', e.request.url );
    e.respondWith(
        caches.match( e.request ).then( function( response ) {
            return response || fetch( e.request );
        } )
    );
} );