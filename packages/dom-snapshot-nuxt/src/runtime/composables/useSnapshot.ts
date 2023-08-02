import { watchDebounced } from "@vueuse/core"
import { toValue } from "vue"
import type { Snapshot } from "../utils"
import { NUXT_SNAPSHOT_KEY, noRestore } from "../utils"
import { useRoute, useState } from "#imports"

export function useSnapshot(snaps: Snapshot[]) {
  if (process.server) return
  const snapshots = useState(NUXT_SNAPSHOT_KEY, () => new Map())
  const { path } = useRoute()

  // Restore snapshot when setup is called.
  const values = snapshots.value.get(path)
  if (values) {
    for (const [i, snap] of snaps.entries()) {
      if (values[i].capture !== noRestore)
        snap.restore(values[i].capture)
    }
  }

  // Save snapshot when capture is updated.
  watchDebounced(snaps.map(s => s.capture), () => {
    const s = snaps.map(({ capture, persist = true }) => ({ capture: toValue(capture), persist }))
    snapshots.value.set(path, s)
  },
  { debounce: 500, maxWait: 1000 })

  return snapshots
}
