const CACHE_NAME = 'portfolio-v1';

// lista de arquivos que serão pre-cached, garantindo que estão disponíveis offline
const urlsToCache = [
  '/',
  'dist/assets/index-B-x_ffpT.css',
  '/manifest.json',
  '/images/portfolio-icon-192-192.png',
  '/images/portfolio-icon-512-512.png',
  // Add other static assets your app needs
];

// Install event - cache resources
/**
 * - ouve pelo evento de install, que é triggado quando o service worker é instalado
 * - usa o método waitUntil do evento para atrasar a instalação até que os assets especificados
 * sejam adicionados ao cache
 * - abre o cache com o nome definido em CACHE_NAME e adicioanr todos os assets da lista urlsToCache
 * - chama skipWaiting para ativar o service worker imediatamente após a instalação
 */
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
/**
 * - esse passo serve para limpar caches antigos que não são mais necessários
 */
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
  self.clients.claim(); // método para controlar imeditamente todas as páginas dentro do scope do service worker
});

// Fetch event - serve cached content and handle navigation fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle navigation requests (for SPA routing)
  /*
    - essa if é para verificar se a requisição é de navegação, e se for, tenta buscar do cache o index.html
    - aqui que garantimos que, mesmo offline, damos o match para o index.html, o que permite que a navegação
    seja lidada pela lib de navegação que usamos (porque essa navegação é lidada do lado do cliente)
   */

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        // If network fails, serve the cached index.html for navigation
        return caches.match('/');
      })
    );
    return;
  }

  // Handle all other requests
  /**
   * aqui são lidadas todas as outras requisições (assets, APIs, etc)
   * - usa o respondWith para interceptar a resposta da requisição
   * - tenta buscar a requisição no cache
   * - se encontrar, retorna a resposta cacheada
   * - se não encontrar, faz a requisição na rede
   * - se a resposta da rede for válida, clona a resposta e a adiciona ao cache para futuras requisições
   * - se a rede falhar, retorna uma resposta de fallback (nesse caso, uma simples mensagem de 'Offline')
   */
  event.respondWith(
    caches.match(request).then((response) => {
      // Return cached version or fetch from network
      /**
       * - checa se temos um request cacheado para a requi
       */
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
