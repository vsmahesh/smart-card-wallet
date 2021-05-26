const CACHE_APP_SHELL_NAME = "health-card-app-4.2.1";
self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open(CACHE_APP_SHELL_NAME).then((cache) => {
      console.log("[Service Worker] Pre-caching App Shell");
      cache.addAll([
        "/",
        "/index.html",
        "/health-card.html",
        "/scan-health-card.html",
        "/styles/main.css",
        "/js/vendors/html5-qrcode.min.js",
        "/js/vendors/jws-verify.js",
        "/js/vendors/qrcode.min.js",
        "/js/vendors/rawinflate.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.min.css",
      ]);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key != CACHE_APP_SHELL_NAME) {
            console.log("[Service Worker] Removing old cache.", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  const destination = event.request.destination;
  switch (destination) {
    case "style":
    case "script":
    case "document":
    case "image":
      event.respondWith(
        caches.open(CACHE_APP_SHELL_NAME).then((cache) => {
          return cache.match(event.request).then((cachedResponse) => {
            return (
              cachedResponse ||
              fetch(event.request).then((response) => {
                cache.put(event.request, response.clone());
                return response;
              })
            );
          });
        })
      );
      break;

    default:
      event.respondWith(fetch(event.request));
      break;
  }
});
