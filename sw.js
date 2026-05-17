/* Service worker — Pokémon Gen 4 eGuide. See GEN2 sw.js for design notes. */
const CACHE_VERSION = 'gen4-v7';
const STATIC_CACHE  = 'gen4-static-' + CACHE_VERSION;
const RUNTIME_CACHE = 'gen4-runtime-' + CACHE_VERSION;

const PRECACHE_URLS = [
  './', './index.html',
  './assets/css/app.css', './assets/js/app.js', './assets/js/auth.js',
  './assets/favicon.svg', './manifest.webmanifest',
  './assets/data/pokedata.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function(cache) {
      return Promise.allSettled(PRECACHE_URLS.map(function(u) { return cache.add(u); }));
    }).then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) {
        if (k !== STATIC_CACHE && k !== RUNTIME_CACHE) return caches.delete(k);
      }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  var sameOrigin = url.origin === self.location.origin;
  if (url.hostname.indexOf('googleapis.com') !== -1
      || url.hostname.indexOf('accounts.google.com') !== -1
      || url.hostname.indexOf('googletagmanager.com') !== -1) return;
  if (sameOrigin) {
    event.respondWith(caches.match(req).then(function(hit) {
      if (hit) return hit;
      return fetch(req).then(function(resp) {
        if (resp && resp.status === 200) {
          var copy = resp.clone();
          caches.open(STATIC_CACHE).then(function(c) { c.put(req, copy); });
        }
        return resp;
      }).catch(function() { return hit; });
    }));
    return;
  }
  event.respondWith(fetch(req).then(function(resp) {
    if (resp && resp.status === 200 && resp.type === 'basic') {
      var copy = resp.clone();
      caches.open(RUNTIME_CACHE).then(function(c) { c.put(req, copy); });
    }
    return resp;
  }).catch(function() { return caches.match(req); }));
});
