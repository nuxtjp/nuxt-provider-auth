# @nuxtjp/provider-auth

A Nuxt 4 module for presenting external-service authentication. Consumers supply validated declarations, placement candidates, public inputs, and state as props, then handle the explicit start event.

The module provides presentation. The consumer's same-origin server owns authentication sessions, callbacks, placement decisions, and credential custody. Nuxt types are provided by the declared Nuxt schema peer dependency.

```vue
<NuxtJpProviderAuthPanel :descriptor="descriptor" v-model="values"
  :pending="pending" :error-message="error" @start="start" />
```
