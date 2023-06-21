// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "../packages/dom-snapshot-nuxt/src/module"
    // "@example/dom-snapshot-nuxt"
  ],
  devtools: {
    enabled: true
  },
  experimental: {
    renderJsonPayloads: true
  }
})
