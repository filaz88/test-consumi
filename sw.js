const CACHE_NAME = 'ugo-isotta-v5';
const ASSETS = [
  './simulatore-ev-google.html',
  './manifest.json',
  './apple-touch-icon.png',
  './icon-dogs-192.png',
  './icon-dogs-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
      .catch(() => caches.match('./simulatore-ev-google.html'))
  );
});