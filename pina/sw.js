const CACHE_NAME = "pina-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./pina_.png",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", event => {
  const { request } = event;

  // NÃO cachear requisições da API
  if (request.url.includes("powerplatform.com")) {
    return;
  }

  event.respondWith(
    caches.match(request).then(response =>
      response || fetch(request)
    )
  );
});
