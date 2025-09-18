/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope
clientsClaim()
cleanupOutdatedCaches()
// self.__WB_MANIFEST is injected at build time
precacheAndRoute(self.__WB_MANIFEST || [])

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})


