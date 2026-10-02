# Using @nuxtjp/provider-auth

Present the choices and progress of an external-service sign-in without embedding provider credentials in the UI module.

## Before you start

The same-origin application server owns sessions, callbacks, placement and credential custody.

## First steps

Run from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm test
```

## How to assess the result

- Render validated provider declarations and public inputs.
- Emit an explicit start event to the application.

A passing source-level check establishes only what that check observes. Keep missing configuration, unavailable services and unverified deployment paths visible.

## Continue reading

[Repository overview](../README.md)
