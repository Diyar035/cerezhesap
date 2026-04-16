const CACHE_NAME = 'atom-kardesler-v1';
const urlsToCache = [
  '/cerezhesap/',
  '/cerezhesap/index.html',
  '/cerezhesap/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});