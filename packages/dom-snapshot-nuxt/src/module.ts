import { addImports, addPlugin, createResolver, defineNuxtModule, useLogger } from "@nuxt/kit"

const NAME = "dom-snapshot-nuxt"

export default defineNuxtModule({
  meta: {
    name: NAME
  },
  setup(userOptions) {
    const logger = useLogger(NAME)
    const { resolve } = createResolver(import.meta.url)

    logger.info(`Adding ${NAME} module...`, userOptions)

    // 1. Add composables
    addImports([{ name: "useSnapshot", from: resolve("./runtime/composables/useSnapshot") }])

    // 2. Add plugin
    addPlugin(resolve("./runtime/plugin"))

    logger.success(`Added ${NAME} module successfully.`)
  }
})
