import type { MaybeRefOrGetter } from "@vueuse/core"

export const NUXT_SNAPSHOT_KEY = "__dom_snapshot_nuxt__" as const

export const noRestore = Symbol("noRestore")

export interface Snapshot<T = any> {
  capture: MaybeRefOrGetter<T>
  restore: (snap: T) => void
  persist?: boolean
}
