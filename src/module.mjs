import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@nuxtjp/provider-auth',
    configKey: 'nuxtJpProviderAuth',
    compatibility: { nuxt: '^4.5.0' },
  },
  defaults: { componentPrefix: 'NuxtJp' },
  setup(options) {
    const resolver = createResolver(import.meta.url)
    addComponent({
      name: `${options.componentPrefix}ProviderAuthPanel`,
      filePath: resolver.resolve('./runtime/app/components/ProviderAuthPanel.vue'),
    })
  },
})

export * from './runtime/core/index.mjs'
