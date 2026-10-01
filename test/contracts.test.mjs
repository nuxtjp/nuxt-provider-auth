import { readFile } from 'node:fs/promises'
import test from 'node:test'
import assert from 'node:assert/strict'
import { isProviderAuthDescriptor } from '../src/runtime/core/index.mjs'

const valid = {
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
