import type { ProviderAuthInput, ProviderAuthPlacement } from '../../types/descriptor.mjs'

/** The boundary accepts object-shaped JSON without relying on coercion. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
export function text(value: unknown, limit: number): value is string {
  return typeof value === 'string' && value.length <= limit
}
export function identifier(value: unknown): value is string {
  return typeof value === 'string' && /^[a-z][a-z0-9-]{0,63}$/.test(value)
}
/** Reject undeclared fields rather than forwarding secret-bearing extensions. */
export function exactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  return Object.keys(value).length === keys.length
    && keys.every(key => Object.hasOwn(value, key))
}
export function isInput(value: unknown): value is ProviderAuthInput {
  return isRecord(value) && exactKeys(value, ['id', 'label', 'description', 'required', 'maxLength'])
    && identifier(value.id) && text(value.label, 128) && text(value.description, 4096)
    && typeof value.required === 'boolean' && typeof value.maxLength === 'number'
    && Number.isSafeInteger(value.maxLength) && value.maxLength > 0 && value.maxLength <= 4096
}
export function isPlacement(value: unknown): value is ProviderAuthPlacement {
  return isRecord(value) && exactKeys(value, ['id', 'label', 'description', 'available', 'reason'])
    && identifier(value.id) && text(value.label, 128) && text(value.description, 4096)
    && typeof value.available === 'boolean' && (value.reason === null || text(value.reason, 4096))
}
