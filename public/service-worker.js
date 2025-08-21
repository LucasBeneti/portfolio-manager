const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  'dist/assets/index-B-x_ffpT.css',
  '/manifest.json',
  '/images/portfolio-icon-192-192.png',
  '/images/portfolio-icon-512-512.png',
  // Add other static assets your app needs
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve cached content and handle navigation fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle navigation requests (for SPA routing)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        // If network fails, serve the cached index.html for navigation
        return caches.match('/') || caches.match('/');
      })
    );
    return;
  }

  // Handle all other requests
  event.respondWith(
    caches.match(request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }

      return fetch(request)
        .then((response) => {
          // Don't cache if not a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to cache for future requests
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // If it's an image request and network fails, you could return a fallback image
          // For now, just let it fail gracefully
          return new Response('Offline', { status: 503 });
        });
    })
  );
});
