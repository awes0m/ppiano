'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "7b6804f106d04e557ab5aeed6d37c1a9",
"assets/AssetManifest.bin.json": "e3f1a8ecb5244a219818fb44776c6c9d",
"assets/AssetManifest.json": "6f2beef60104ebca482a05182a01b8b0",
"assets/assets/logo.png": "671c76ed815e5ff388b8641e3dfa661f",
"assets/assets/notes/A0.wav": "30f5b39a0ed785ee3f360d7fa3319ca6",
"assets/assets/notes/A1.wav": "df85273f44f84c3ef0389540e0d067d5",
"assets/assets/notes/A2.wav": "d17630c687b046039aab52ba8c099313",
"assets/assets/notes/A3.wav": "014254278e8d83e940f27f84254b415f",
"assets/assets/notes/A4.wav": "4c06a155b2f180b7b491667b3c05bc22",
"assets/assets/notes/A5.wav": "7ddbc574d9b9ce9890c1470fd4022ced",
"assets/assets/notes/A6.wav": "131cff5e099a84b1a3aefbffd86f7bd6",
"assets/assets/notes/A7.wav": "ad88503cf4298ee9f3006a796e5c7da0",
"assets/assets/notes/Ab1.wav": "2f1beb9e7488a87f5922c7eb117b2fbe",
"assets/assets/notes/Ab2.wav": "990c4c174f4ab163d393128bbd6e8315",
"assets/assets/notes/Ab3.wav": "a43b0bf8ec22aeec2c91f6c728df668a",
"assets/assets/notes/Ab4.wav": "1b92cbd1f809354e65f98f62fe1aed38",
"assets/assets/notes/Ab5.wav": "55a856c81e66a07d61ee8899d9bf2c29",
"assets/assets/notes/Ab6.wav": "bccd274d863b7213076586c5dc207e60",
"assets/assets/notes/Ab7.wav": "a8166d9714cb683243db21b6e456cf5e",
"assets/assets/notes/B0.wav": "1127060b204948841d00eb6ade1080cb",
"assets/assets/notes/B1.wav": "5e5837739c780a7641499ae25fb58dbf",
"assets/assets/notes/B2.wav": "21b967371f7d6431bc304e0af765131d",
"assets/assets/notes/B3.wav": "cefc9132081c3e333555de82c6be9f13",
"assets/assets/notes/B4.wav": "b1c885e794aa91ea7c400dc664c2a894",
"assets/assets/notes/B5.wav": "261195b77c02282ef64c98898cd7925e",
"assets/assets/notes/B6.wav": "0e11bd6645cec0270497022688be9eb9",
"assets/assets/notes/B7.wav": "e11f31565c893f6d00fe6dbafe459d70",
"assets/assets/notes/Bb0.wav": "5e1dae84ff2b519afb61aa6da1731bac",
"assets/assets/notes/Bb1.wav": "c16cc87b9b2a0f80bdf3546a79e3687e",
"assets/assets/notes/Bb2.wav": "1cd7df67de15c35a6fb22ce121e357ee",
"assets/assets/notes/Bb3.wav": "67c412e06823706c959e5e1de45e6da7",
"assets/assets/notes/Bb4.wav": "0f4fb4a35a2f9262a417a09b846a1f89",
"assets/assets/notes/Bb5.wav": "3d59df1a146e2d6f56dcba0e8c13f102",
"assets/assets/notes/Bb6.wav": "dfb58e0cbbb1a4f4459f4967f2c94f25",
"assets/assets/notes/Bb7.wav": "69d64c6d7cb87f48ac0758ad76554a0a",
"assets/assets/notes/C1.wav": "d6a201e4c1d1d0952041fa1fa68222e1",
"assets/assets/notes/C2.wav": "57f1e495b3105ff2bfb4da24cd303f17",
"assets/assets/notes/C3.wav": "0ea8e81cee4c8658265039ba19abbd5c",
"assets/assets/notes/C4.wav": "6117b65e375aef4754a8fa831318ddcc",
"assets/assets/notes/C5.wav": "a33e2dfb71b07a53aa95caa3db607c67",
"assets/assets/notes/C6.wav": "96e13c5c413d1bf04f4be97a3be6811b",
"assets/assets/notes/C7.wav": "1d7d366a169e17cc0f9d9ec762ec9fc7",
"assets/assets/notes/C8.wav": "85547b72558a4b048b191dc79bad139f",
"assets/assets/notes/D1.wav": "69d88940711b09a3fa4fbc9154439cd7",
"assets/assets/notes/D2.wav": "36dac684ac413b0b3c590a4e868cc6f0",
"assets/assets/notes/D3.wav": "810716c373857acae27897c54b4ec1f6",
"assets/assets/notes/D4.wav": "72c5e618c482261e3a54afc54967ea08",
"assets/assets/notes/D5.wav": "919b1532b44d581080bde9f2546649ad",
"assets/assets/notes/D6.wav": "d1f2c1b24a67140003206fd16f3f3d8a",
"assets/assets/notes/D7.wav": "3eb1915108668fc298871deb029cc629",
"assets/assets/notes/Db1.wav": "b9919f3a5b87d495168de982015533d0",
"assets/assets/notes/Db2.wav": "4efc903a8c09d654bfe2f9e7d1b1b159",
"assets/assets/notes/Db3.wav": "ba16e5524e190abe8d9e3bce3145aefd",
"assets/assets/notes/Db4.wav": "97df2176bc6eeb7fabe980256d8c000c",
"assets/assets/notes/Db5.wav": "9761cc393b4a9a58bd743b5030065ff0",
"assets/assets/notes/Db6.wav": "4726e0775829949adebe489e3add3c6e",
"assets/assets/notes/Db7.wav": "900ba48dd1bd18f9f61b135f66ffcba5",
"assets/assets/notes/E1.wav": "af939d823939ac0203c6286cf7ad167d",
"assets/assets/notes/E2.wav": "f4901096aeb83d0a374b417289297602",
"assets/assets/notes/E3.wav": "792f30a12e3316c613daf565335dcdad",
"assets/assets/notes/E4.wav": "1c7ed0c09b5c244b0bf2804945a63de0",
"assets/assets/notes/E5.wav": "bb0d27587116c95e478ece3128dee572",
"assets/assets/notes/E6.wav": "feb81f140bc9e3f1820386dafef5ee77",
"assets/assets/notes/E7.wav": "f6a9ee2a58ac98c68b810e108aa5bd84",
"assets/assets/notes/Eb1.wav": "082f17dbceb5ca3032f66e18cd79972d",
"assets/assets/notes/Eb2.wav": "0d2b2d5b688b24f98d5bc22c79fd5ae6",
"assets/assets/notes/Eb3.wav": "7c7ba0d368d393ca54f9d45139fe2255",
"assets/assets/notes/Eb4.wav": "9742dc9ce5b9f5e978407fb5f719fffd",
"assets/assets/notes/Eb5.wav": "62f85c306167cf35124dc241b9c2079c",
"assets/assets/notes/Eb6.wav": "4b3dc990853090db3554f58def0290f2",
"assets/assets/notes/Eb7.wav": "f4e4e266c1b7441fbb2e50ffeeb762cf",
"assets/assets/notes/F1.wav": "f423c6fc3820b4d50ae9298ac18e4e77",
"assets/assets/notes/F2.wav": "1e12284560605d78806d735c64918320",
"assets/assets/notes/F3.wav": "92079a5058f913ea3674497e16c920ea",
"assets/assets/notes/F4.wav": "cb68630ade7b59ca4bf644bc697ab8b2",
"assets/assets/notes/F5.wav": "2799118cc3fc8ddd4f9697ba7d02454d",
"assets/assets/notes/F6.wav": "d8079072cd839601958412e3427791b6",
"assets/assets/notes/F7.wav": "aff7e8a8cb6b436a35a65de364f4be8e",
"assets/assets/notes/G1.wav": "25687476ed59e5c7d6e519dbd0777c82",
"assets/assets/notes/G2.wav": "5e57d845fd80852870aa685a44db56cc",
"assets/assets/notes/G3.wav": "aa10eaa353f60d4d94d05eb95f39a77a",
"assets/assets/notes/G4.wav": "cbe04edae77301795c639def7c219124",
"assets/assets/notes/G5.wav": "3ea1c7404e181c38101f567fb1961e81",
"assets/assets/notes/G6.wav": "e2e033522fcf382b3314e92f8d7663a8",
"assets/assets/notes/G7.wav": "68ede5855c073c214d4ae000e1251e95",
"assets/assets/notes/Gb1.wav": "65e722eb243d6c80be1cc082c81c5ff9",
"assets/assets/notes/Gb2.wav": "9bf78b39115bad256ae3ef4f479e787c",
"assets/assets/notes/Gb3.wav": "4ac4ae681ee83341ed769583ed5bb9fc",
"assets/assets/notes/Gb4.wav": "2daad295c4de94a32e76557f9ca24484",
"assets/assets/notes/Gb5.wav": "2cbb56eabdfdc9f114b01f35d58fe9da",
"assets/assets/notes/Gb6.wav": "29fd545a00f1fce76b1a7d9e7e2bcfc8",
"assets/assets/notes/Gb7.wav": "62f73db191c3215d4baff3a5a5d6836b",
"assets/assets/Terserah.ttf": "b53139cb6da2b841aed158cce068bd46",
"assets/FontManifest.json": "0a68a4f4a18bc0cdfcce46100e07030a",
"assets/fonts/MaterialIcons-Regular.otf": "c0ad29d56cfe3890223c02da3c6e0448",
"assets/NOTICES": "f30c61171668dbc666116420098ea792",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "cf0c2724110c7293ae77be6bed40fd2e",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "87506426e16c4775168790c87f3f1213",
"/": "87506426e16c4775168790c87f3f1213",
"main.dart.js": "defa285904adcc6ac8499918e7f52b08",
"manifest.json": "9d69d38af9b8f9c47d44f8fa95f0d63a",
"version.json": "dfe3f3e15ef91dc463bb812aa64268b2"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
