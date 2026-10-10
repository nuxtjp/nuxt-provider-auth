import type { ProviderAuthDescriptor } from '../src/types/descriptor.mjs'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import assert from 'node:assert/strict'
import { isProviderAuthDescriptor } from '../dist/runtime/core/index.mjs'

const valid: ProviderAuthDescriptor = {
  schema: 'nuxtjp://provider-auth/descriptor/v1',
  providerId: 'github',
  providerLabel: 'GitHub',
  title: 'GitHub認証',
  summary: 'summary',
  status: 'unconfigured',
  statusLabel: '未設定',
  selectedPlacementId: 'owner-local',
  inputs: [],
  placements: [],
  secretPolicy: 'external-custody-only',
  actionLabel: '認証を開始',
}

test('accepts one closed provider-neutral projection', () => {
  assert.equal(isProviderAuthDescriptor(valid), true)
})

test('rejects secret-bearing or invalid declarations', () => {
  assert.equal(isProviderAuthDescriptor({ ...valid, providerId: 'GitHub' }), false)
  assert.equal(isProviderAuthDescriptor({ ...valid, secretPolicy: 'browser' }), false)
})

test('the shared component never renders secret-bearing fields', async () => {
  const source = await readFile(new URL('../src/runtime/app/components/ProviderAuthPanel.vue', import.meta.url), 'utf8')
  assert.match(source, /秘密情報はこの画面へ入力せず/)
  assert.doesNotMatch(source, /type="password"/)
})


test('the type guard rejects malformed nested projections and undeclared credentials', () => {
  for (const value of [null, [], true, { ...valid, token: 'synthetic' },
    { ...valid, providerId: 123 }, { ...valid, providerLabel: undefined },
    { ...valid, status: 'unexpected' }, { ...valid, inputs: [null] },
    { ...valid, placements: [{ id: 'local' }] },
    { ...valid, inputs: [{ id: 'name', label: 'Name', description: '', required: true, maxLength: -1 }] },
  ]) assert.equal(isProviderAuthDescriptor(value), false)
})
