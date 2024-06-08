import { defaultCache } from "@serwist/next/worker"
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist"
import { Serwist } from "serwist"

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
})

self.addEventListener("fetch", (event) => {
  event.respondWith(handleFetch(event))
})

async function handleFetch(event: FetchEvent) {
  const preloadPromise = self.registration.navigationPreload?.enable()

  await preloadPromise

  const response = await fetch(event.request)

  return response
}

serwist.addEventListeners()
