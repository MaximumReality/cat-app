const CACHE_NAME = 'sphynx-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'flyazulo.png',
  'mochkil_front_kart.png',
  'mochkil_walk_right_cake.png',
  'logo.png',
  'hacker-favicon.PNG', 
  'sw.js'
];

// Install service worker and cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets for Maximum Reality...');
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch assets from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log('Clearing old cache:', key);
          return caches.delete(key);
        }
      }))
    )
  );
});
