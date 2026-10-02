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

Package distribution is not activated by this documentation. Use the checked-in source and the declared dependency versions; published availability must be verified separately.

## Getting started

Use `pnpm@10.29.3` and the Node.js version declared in `engines` in `package.json`. Run from this repository:

```sh
pnpm install --frozen-lockfile
pnpm test
```

## Integration example

```vue
<NuxtJpProviderAuthPanel :descriptor="descriptor" v-model="values"
  :pending="pending" :error-message="error" @start="start" />
```

## Documentation and source

[Usage guide](docs/getting-started.md)

[Implementation and public interfaces](src) · [Verification cases](test) · [Contributing](CONTRIBUTING.md) · [Security reporting](SECURITY.md) · [License](LICENSE) · [Attribution notices](NOTICE)
