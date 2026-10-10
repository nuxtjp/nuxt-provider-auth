import type { ProviderAuthDescriptor } from '../../types/descriptor.mjs'
import { isInput, isPlacement, isRecord, text, identifier, exactKeys } from './validation.mjs'
export type * from '../../types/descriptor.mjs'

/** Narrow untrusted JSON only after checking every public field and nested entry. */
export function isProviderAuthDescriptor(value: unknown): value is ProviderAuthDescriptor {
  if (!isRecord(value) || !exactKeys(value, [
    'schema', 'providerId', 'providerLabel', 'title', 'summary', 'status', 'statusLabel',
    'selectedPlacementId', 'inputs', 'placements', 'secretPolicy', 'actionLabel',
  ])) return false
  return value.schema === 'nuxtjp://provider-auth/descriptor/v1'
    && identifier(value.providerId) && text(value.providerLabel, 128)
    && text(value.title, 128) && text(value.summary, 4096) && text(value.statusLabel, 128)
    && typeof value.status === 'string'
    && ['unconfigured', 'pending', 'verification-required', 'connected', 'unavailable'].includes(value.status)
    && (value.selectedPlacementId === null || identifier(value.selectedPlacementId))
    && Array.isArray(value.inputs) && value.inputs.length <= 16 && value.inputs.every(isInput)
    && Array.isArray(value.placements) && value.placements.length <= 8 && value.placements.every(isPlacement)
    && value.secretPolicy === 'external-custody-only' && text(value.actionLabel, 128)
}
