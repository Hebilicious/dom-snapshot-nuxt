import type { Snapshot } from "./utils"
import { NUXT_SNAPSHOT_KEY, noRestore } from "./utils"
import { defineNuxtPlugin, useState } from "#imports"

export default defineNuxtPlugin(async () => {
  if (process.server) return
  const snapshots = useState(NUXT_SNAPSHOT_KEY, () => new Map())

  if (snapshots.value.size === 0) {
    const saved = sessionStorage.getItem(NUXT_SNAPSHOT_KEY)
    if (saved) {
      const restored = JSON.parse(saved) as [string, Partial<Snapshot>[]][]
      // Do not restore snapshots with persist:false
      const map = restored.map(([k, v]) => [k, v.map(({ capture, persist }) =>
        ({ capture: persist ? capture : noRestore, persist }))] as [string, Partial<Snapshot>[]])
      snapshots.value = new Map(map)
    }
  }

  // Save snapshots on destroy
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      if (snapshots.value.size === 0) return
      sessionStorage.setItem(NUXT_SNAPSHOT_KEY, JSON.stringify([...snapshots.value]))
    }
  })
})
