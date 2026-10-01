export function isProviderAuthDescriptor(value) {
  const item = value
  return Boolean(item && item.schema === 'nuxtjp://provider-auth/descriptor/v1'
    && /^[a-z][a-z0-9-]{0,63}$/.test(item.providerId)
    && typeof item.title === 'string' && item.title.length <= 128
    && Array.isArray(item.inputs) && item.inputs.length <= 16
    && Array.isArray(item.placements) && item.placements.length <= 8
    && item.secretPolicy === 'external-custody-only')
}
