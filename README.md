# @nuxtjp/provider-auth

[日本語](https://github.com/nuxtjp/nuxt-provider-auth/blob/main/README.ja.md)

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

A Nuxt application must audit its complete dependency graph. Nuxt's transitive dependencies currently require the reviewed root-level overrides and backports distributed in `@nuxtjp/local-runtime`. This module does not silently install Nuxt or apply dependency patches. For a Nuxt host, configure the application explicitly:

```sh
pnpm add -D @nuxtjp/local-runtime
node node_modules/@nuxtjp/local-runtime/security/apply.mjs --project-root . --apply
pnpm install --no-frozen-lockfile
pnpm install --frozen-lockfile
node node_modules/@nuxtjp/local-runtime/security/dependency-security.check.cjs
pnpm audit --json
```

Commit the generated root configuration, patches and lockfile. The braces and node-forge upstream advisories remain in version-only reports until upstream releases fixed versions; verify the actual installed backports. Any other advisory blocks host validation. npm-only Nuxt hosts are not covered by this pnpm backport procedure. Standalone core installation and a complete Nuxt application are separate verification scopes.

[OSS responsibility and source completion](docs/oss-source-contract.md) defines the supported package boundary and required acceptance. It does not declare unexecuted source, distribution or production checks complete.

Dependency updates: [repository policy](docs/dependency-updates.md).
Registry releases: [version tags and GitHub OIDC](docs/registry-release.md).
