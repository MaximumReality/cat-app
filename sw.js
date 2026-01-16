const CACHE_NAME = 'sphynx-v1';
const ASSETS = [
  '/sphynx-overdrive/',
  '/sphynx-overdrive/index.html',
  '/sphynx-overdrive/manifest.json',
  '/sphynx-overdrive/flyazulo.png',
  '/sphynx-overdrive/mochkil_front_kart.png',
  '/sphynx-overdrive/mochkil_walk_right_cake.png',
  '/sphynx-overdrive/logo.png',
  '/sphynx-overdrive/hacker-favicon.PNG',
  '/sphynx-overdrive/credibility_badge.png'
];

// Install event: cache all assets
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

// Fetch event: serve from cache if available
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});

// Activate event: clean up old caches
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
});
