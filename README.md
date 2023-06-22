# Snapshot Dom Nuxt Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![CI](https://github.com/Hebilicious/dom-snapshot-nuxt/actions/workflows/ci.yaml/badge.svg)](https://github.com/Hebilicious/dom-snapshot-nuxt/actions/workflows/ci.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[npm-version-src]: https://img.shields.io/npm/v/@hebilicious/dom-snapshot-nuxt
[npm-version-href]: https://npmjs.com/package/@hebilicious/dom-snapshot-nuxt
[npm-downloads-src]: https://img.shields.io/npm/dm/@hebilicious/dom-snapshot-nuxt
[npm-downloads-href]: https://npmjs.com/package/@hebilicious/dom-snapshot-nuxt

🚀 Welcome to __Hebilicious Snapshot Dom Nuxt Module__!  

Inspired by [SvelteKit](https://kit.svelte.dev/docs/snapshots) same feature.

Ephemeral DOM state — like scroll positions on sidebars, the content of <input> elements and so on — is discarded when you navigate from one page to another.

For example, if the user fills out a form but clicks a link before submitting, then hits the browser's back button, the values they filled in will be lost. In cases where it's valuable to preserve that input, you can take a snapshot of DOM state, which can then be restored if the user navigates back.

## 📦 Installation

Install this module from NPM :

```bash
npm i @hebilicious/snapshot-dom-nuxt-module
```

Add it to your `nuxt.config.ts` file:

```ts
export default defineNuxtConfig({
  modules: [
    "@hebilicious/snapshot-dom-nuxt-module"
  ]
})
```

## 🚀 Usage

```vue
<script setup lang="ts">
const comment = ref("") // This will be restored on nav and refresh
const another = ref("") // This will be restored on nav
const no = ref("") // This won't be

useSnapshot([
  { capture: comment, restore: (v) => { comment.value = toValue(v) } },
  { capture: another, restore: (v) => { another.value = toValue(v) }, persist: false }
])
</script>

<template>
  <input v-model="comment" type="text">
  <input v-model="another" type="text">
  <input v-model="no" type="text">
</template>
```

- The restoration will work after a navigation and a hard reload, like hitting the refresh button or navigating to another site and coming back.
- The captured data must be serialized with `JSON.stringify`
- The captured data is kept in memory, so don't capture too much data.
- If the data is too large, the session storage won't work.

## 📦 Contributing

Contributions, issues and feature requests are welcome!

1. Fork this repo

2. Install `node` and `pnpm` _Use `corepack enable && corepack prepare pnpm@latest --activate` to install pnpm easily_

3. Use `pnpm i` at the mono-repo root.

4. Make modifications and follow conventional commits.

5. Open a PR 🚀🚀🚀
