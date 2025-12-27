const CACHE_NAME = "pina-pwa-v1";

const ASSETS = [
  "./",
  "./pina.html",
  "./pina_.png",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  const { request } = event;

  // Nunca cachear chamadas da API
  if (request.url.includes("powerplatform.com")) {
    return;
  }

  event.respondWith(
    caches.match(request).then(response =>
      response || fetch(request)
    )
  );
});
