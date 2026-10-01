<script setup lang="ts">
import { computed } from 'vue'
import type { ProviderAuthDescriptor } from '../../core'

const props = defineProps<{ descriptor: ProviderAuthDescriptor, modelValue: Record<string, string>,
  pending?: boolean, errorMessage?: string | null }>()
const emit = defineEmits<{ 'update:modelValue': [value: Record<string, string>],
  start: [], 'select-placement': [id: string] }>()
function update(id: string, value: string) {
  emit('update:modelValue', { ...props.modelValue, [id]: value })
}
const canStart = computed(() => Boolean(props.descriptor.selectedPlacementId)
  && props.descriptor.inputs.every(input => !input.required || props.modelValue[input.id]?.trim()))
</script>

<template>
  <section class="nuxtjp-provider-auth" :aria-label="descriptor.title">
    <header><div><p class="nuxtjp-provider-auth__eyebrow">{{ descriptor.providerLabel }}</p>
      <h2>{{ descriptor.title }}</h2></div>
      <span class="nuxtjp-provider-auth__status">{{ descriptor.statusLabel }}</span></header>
    <p>{{ descriptor.summary }}</p>
    <fieldset><legend>認証ツールの配置</legend>
      <label v-for="placement in descriptor.placements" :key="placement.id">
        <input type="radio" name="provider-auth-placement" :value="placement.id"
          :checked="descriptor.selectedPlacementId === placement.id"
          :disabled="!placement.available || pending"
          @change="emit('select-placement', placement.id)">
        <span><strong>{{ placement.label }}</strong><small>{{ placement.description }}</small>
          <small v-if="placement.reason">{{ placement.reason }}</small></span>
      </label>
    </fieldset>
    <div class="nuxtjp-provider-auth__inputs">
      <label v-for="input in descriptor.inputs" :key="input.id">
        <span>{{ input.label }}</span><small>{{ input.description }}</small>
        <input :value="modelValue[input.id] ?? ''" :maxlength="input.maxLength"
          :required="input.required" autocomplete="off" :disabled="pending"
          @input="update(input.id, ($event.target as HTMLInputElement).value)">
      </label>
    </div>
    <p class="nuxtjp-provider-auth__policy">秘密情報はこの画面へ入力せず、外部custodyで保管します。</p>
    <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
    <button type="button" :disabled="pending || !canStart" @click="emit('start')">
      {{ pending ? '開始しています…' : descriptor.actionLabel }}
    </button>
  </section>
</template>

<style scoped>
.nuxtjp-provider-auth{display:grid;gap:1rem}.nuxtjp-provider-auth header{display:flex;gap:1rem;
justify-content:space-between;align-items:start}.nuxtjp-provider-auth h2{font-size:1.125rem;font-weight:650}
.nuxtjp-provider-auth__eyebrow,.nuxtjp-provider-auth small{display:block;font-size:.75rem;opacity:.72}
.nuxtjp-provider-auth__status{border:1px solid currentColor;border-radius:999px;padding:.25rem .6rem}
.nuxtjp-provider-auth fieldset,.nuxtjp-provider-auth__inputs{display:grid;gap:.75rem}
.nuxtjp-provider-auth label{display:grid;grid-template-columns:auto 1fr;gap:.65rem;align-items:start}
.nuxtjp-provider-auth__inputs label{grid-template-columns:1fr}.nuxtjp-provider-auth input[type=text],
.nuxtjp-provider-auth__inputs input{border:1px solid #888;border-radius:.4rem;padding:.65rem;width:100%}
.nuxtjp-provider-auth button{justify-self:start;border-radius:.45rem;padding:.65rem 1rem;background:#111;color:#fff}
.nuxtjp-provider-auth button:disabled{opacity:.5}.nuxtjp-provider-auth__policy{font-size:.85rem;opacity:.78}
</style>
