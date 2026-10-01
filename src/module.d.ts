import type { NuxtModule } from '@nuxt/schema'

export interface ModuleOptions { componentPrefix: string }

declare const module: NuxtModule<ModuleOptions>
export default module
export * from './runtime/core/index'
