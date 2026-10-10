# @nuxtjp/provider-auth

外部サービスの認証に必要な入力と進行状態を表示し、利用アプリへ開始要求を渡せます。

## 利用前の確認

実装済みの範囲、必要な依存関係、検証コマンドを以下の英語説明に併記しています。操作・配備・公開は、それぞれの権限と設定を確認してから実施してください。

## 使い方

リポジトリ内のサンプル・スキーマ・実装を確認し、用途に必要な入力を明示して利用します。下記のGetting startedに、現行設定に対応する検証コマンドを示しています。

検証結果は実行した範囲だけを示します。未実装の機能、未設定の接続、配備環境の確認を合格扱いにしないでください。

## English

Present the choices and progress of an external-service sign-in without embedding provider credentials in the UI module.

## What you can do

- Render validated provider declarations and public inputs.
- Emit an explicit start event to the application.

## Current scope

The same-origin application server owns sessions, callbacks, placement and credential custody.

The `./core` export works without a Nuxt application. The Nuxt peer is optional for this standalone use; using the UI module requires an explicitly installed Nuxt host and Vue. An optional peer does not certify the host dependency graph.

## Getting started

Use `pnpm@10.29.3` and the Node.js version declared in `engines` in `package.json`. Run from this repository:

```sh
pnpm install --frozen-lockfile --ignore-scripts --config.auto-install-peers=false
pnpm run typecheck
pnpm test
pnpm run build
```

## Public input validation

Import `isProviderAuthDescriptor` from `@nuxtjp/provider-auth/core` before rendering external JSON. The guard checks every declared field and bounded nested inputs and placements. Undeclared fields are rejected; credentials belong in external custody. Types live in `src/types` and executable ESM and declarations are generated together in `dist`.

## Integration example

```vue
<NuxtJpProviderAuthPanel :descriptor="descriptor" v-model="values"
  :pending="pending" :error-message="error" @start="start" />
```

## Documentation and source

[Usage guide](docs/getting-started.md)

[Implementation and public interfaces](src) · [Verification cases](test) · [Contributing](CONTRIBUTING.md) · [Security reporting](SECURITY.md) · [License](LICENSE) · [Attribution notices](NOTICE)

## Host dependency security

A Nuxt application must audit its complete dependency graph. Nuxt's transitive dependencies currently require the reviewed root-level overrides and backports distributed in `@nuxtjp/local-runtime@0.1.4`. This module does not silently install Nuxt or apply dependency patches. For a Nuxt host, configure the application explicitly:

```sh
pnpm add -D @nuxtjp/local-runtime@0.1.4
node node_modules/@nuxtjp/local-runtime/security/apply.mjs --project-root . --apply
pnpm install --no-frozen-lockfile
pnpm install --frozen-lockfile
node node_modules/@nuxtjp/local-runtime/security/dependency-security.check.cjs
pnpm audit --json
```

Commit the generated root configuration, patches and lockfile. The braces and node-forge upstream advisories remain in version-only reports until upstream releases fixed versions; verify the actual installed backports. Any other advisory blocks host validation. npm-only Nuxt hosts are not covered by this pnpm backport procedure. Standalone core installation and a complete Nuxt application are separate verification scopes.
