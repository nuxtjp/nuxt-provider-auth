import { cp, rm } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// Remove only this package's generated output before producing executable ESM and declarations.
const root = fileURLToPath(new URL('../', import.meta.url))
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true })
execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.build.json'], {
  cwd: root, stdio: 'inherit',
})
await cp(new URL('../src/runtime/app/', import.meta.url), new URL('../dist/runtime/app/', import.meta.url), {
  recursive: true,
})
