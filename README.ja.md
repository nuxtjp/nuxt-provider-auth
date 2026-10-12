# @nuxtjp/provider-auth

[English](https://github.com/nuxtjp/nuxt-provider-auth/blob/main/README.md)

この日本語版は英語READMEの2026-10-12版に対応します。英語版の更新時には翻訳の対応日と差分も確認します。

外部サービスのサインインに必要な選択肢と進行状態を表示し、利用アプリへ開始要求を渡すモジュールです。providerの認証情報をUIへ埋め込みません。

## できることと責務

- 検証済みprovider宣言と公開入力を描画します。
- 明示的な開始eventをアプリへ渡します。

同一originのアプリserverがsession、callback、配置と認証情報の保管を担当します。`./core` exportはNuxtアプリなしで利用でき、Nuxt peerはこの単独利用では任意です。UIモジュールの利用にはNuxt hostとVueを明示導入します。任意peerの設定はhost全体の依存安全性を保証しません。

## 開発と検証

package.jsonのenginesに記載されたNode.jsとpnpm@10.29.3を使用し、このrepoから実行します。

```sh
pnpm install --frozen-lockfile --ignore-scripts --config.auto-install-peers=false
pnpm run typecheck
pnpm test
pnpm run build
```

## 入力検証と組込み

外部JSONの描画前に`@nuxtjp/provider-auth/core`から`isProviderAuthDescriptor`をimportします。宣言field、上限付きの入力・配置を検証し、未宣言fieldを拒否します。認証情報は外部の保管責務に置きます。型のsourceはsrc/types、実行ESMと型宣言の生成先はdistです。

```vue
<NuxtJpProviderAuthPanel :descriptor="descriptor" v-model="values"
  :pending="pending" :error-message="error" @start="start" />
```

## 文書と保守

[利用ガイド](https://github.com/nuxtjp/nuxt-provider-auth/blob/main/docs/getting-started.md)、[実装](https://github.com/nuxtjp/nuxt-provider-auth/tree/main/src)、[検証例](https://github.com/nuxtjp/nuxt-provider-auth/tree/main/test)、[貢献](https://github.com/nuxtjp/nuxt-provider-auth/blob/main/CONTRIBUTING.md)、[セキュリティ報告](https://github.com/nuxtjp/nuxt-provider-auth/blob/main/SECURITY.md)、[LICENSE](https://github.com/nuxtjp/nuxt-provider-auth/blob/main/LICENSE)、[NOTICE](https://github.com/nuxtjp/nuxt-provider-auth/blob/main/NOTICE)を参照してください。

## Nuxt hostの依存安全性

Nuxtアプリは依存グラフ全体を監査します。英語正本の現行手順では、@nuxtjp/local-runtime@0.1.4が提供するroot overrideとbackportを使用します。このモジュールはNuxtを暗黙導入せず、依存patchも自動適用しません。

```sh
pnpm add -D @nuxtjp/local-runtime@0.1.4
node node_modules/@nuxtjp/local-runtime/security/apply.mjs --project-root . --apply
pnpm install --no-frozen-lockfile
pnpm install --frozen-lockfile
node node_modules/@nuxtjp/local-runtime/security/dependency-security.check.cjs
pnpm audit --json
```

生成されたroot設定・patch・lockfileをcommitします。bracesとnode-forgeの上流advisoryは修正版が出るまでversion報告へ残るため、実際に導入したbackportを検証します。その他のadvisoryはhost検証を阻止します。このpnpm手順はnpmだけのNuxt hostを対象としません。core単独導入とNuxtアプリ全体は別の検証範囲です。
