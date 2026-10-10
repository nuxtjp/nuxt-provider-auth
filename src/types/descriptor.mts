/** Public projections contain display metadata, never provider credentials. */
export interface ProviderAuthInput {
  id: string
  label: string
  description: string
  required: boolean
  maxLength: number
}

export interface ProviderAuthPlacement {
  id: string
  label: string
  description: string
  available: boolean
  reason: string | null
}

export interface ProviderAuthDescriptor {
  schema: 'nuxtjp://provider-auth/descriptor/v1'
  providerId: string
  providerLabel: string
  title: string
  summary: string
  status: 'unconfigured' | 'pending' | 'verification-required' | 'connected' | 'unavailable'
  statusLabel: string
  selectedPlacementId: string | null
  inputs: ProviderAuthInput[]
  placements: ProviderAuthPlacement[]
  secretPolicy: 'external-custody-only'
  actionLabel: string
}
