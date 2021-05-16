const CACHE_APP_SHELL_NAME = "health-card-app";
const CACHE_DYNAMIC_NAME = "v3.6";
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
        "/js/vendors/qrcode.min.js",
        "/js/vendors/rawinflate.min.js",
        "/js/models/health-card-model.js",
        "/js/libs/fhir/fhir-resource-types.js",
        "/js/libs/fhir/immunization-codes.js",
        "/js/libs/context-store.js",
        "/js/libs/date-utils.js",
        "/js/libs/health-card-store.js",
        "/js/libs/jws-helper.js",
        "/js/libs/qr-scanner-helper.js",
        "/js/controllers/health-card.js",
        "/js/controllers/index.js",
        "/js/controllers/scan-health-card.js",
        "/js/components/card-list-item.js",
        "/js/components/card-list.js",
        "/js/components/tagnames.js",
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
          if (key != CACHE_APP_SHELL_NAME && key != CACHE_DYNAMIC_NAME) {
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
