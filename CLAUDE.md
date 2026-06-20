# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-component npm library: a React checkbox wrapper that adds first-class
support for the `indeterminate` (third) state. Published to npm as
`react-three-state-checkbox`. The entire public surface is `src/Checkbox.tsx`
(re-exported by `src/index.ts`); everything else is build, test, and tooling.

## Commands

```bash
npm run build      # rm -rf ./lib && tsc  → emits lib/ (the published artifact)
npm run lint       # eslint ./src
npm test           # Playwright component tests + coverage
npm run test:ui    # same, in Playwright UI mode
```

Run a single test (the `npm test` script wipes coverage first, so call Playwright directly):

```bash
npx playwright test --config=playwright-ct.config.mjs -g "forwards object ref"
```

Update visual snapshots after an intentional rendering change:

```bash
npx playwright test --config=playwright-ct.config.mjs --update-snapshots
```

### Shell note (Windows)

`build` and `test` scripts use `rm -rf`, which is POSIX-only. On this Windows
machine they fail under cmd/PowerShell — run them through the Bash tool (Git
Bash) instead. Plain `eslint`/`tsc`/`npx playwright` invocations work in any shell.

## Architecture

`Checkbox.tsx` is a controlled wrapper over a native `<input type="checkbox">`:

- `indeterminate` is not a real HTML attribute — it can only be set via the DOM
  property. The component does this through a **callback ref** that assigns
  `input.indeterminate` on every render, then forwards the same node to any
  caller-supplied ref (function or object form).
- `readOnly` is derived from whether `onChange` is supplied; `type` and
  `readOnly` are locked and cannot be overridden by callers. All other native
  `<input>` props pass straight through via `...rest`.
- `CheckboxProps` extends `ComponentPropsWithoutRef<'input'>` with the native
  `type`/`checked`/`onChange`/`readOnly` omitted and re-declared.

## Testing

Playwright **component testing** (`@playwright/experimental-ct-react`), not a
DOM-mock runner — real Chromium. Notable pieces:

- Coverage is collected via `vite-plugin-istanbul` instrumentation; a custom
  fixture (`tests/fixtures.ts`) dumps `window.__coverage__` to `.nyc_output/`
  after each test, and `playwright/teardown.ts` turns that into
  `coverage/lcov.info`. CI uploads only the React 19 / Node 24 run to Codecov.
- Tests include `toHaveScreenshot` visual assertions — snapshots live under
  `tests/*-snapshots/` and are per-platform, so regenerate them on the same OS
  CI uses (Linux) or expect pixel diffs.
- Ref-forwarding behavior is exercised through `tests/stories/` fixtures
  (`FunctionRefCheckbox`, `ObjectRefCheckbox`).

CI matrix: **React 18 + 19 × Node 22 + 24** (`.github/workflows/ci.yml`). The
React 18 jobs reinstall `react@18`/`react-dom@18` over the React 19 devDeps.

## Gotchas (learned the hard way)

### Do not drop `forwardRef` — React 18 is still supported

`peerDependencies` is `react: "18 || 19"`. Under React 19 `forwardRef` looks
redundant (ref-as-prop), and `@eslint-react/no-forward-ref` warns about it — but
removing it **breaks ref forwarding under React 18**, which only the React 18 CI
jobs catch (a green local React 19 run masks it). `forwardRef` is intentionally
kept and the warning is suppressed with a justifying comment in `Checkbox.tsx`.
General rule: before "modernizing," check the whole peer/CI matrix, and prefer
suppressing a lint false-positive over a refactor that narrows version support.

### npm lockfile — keep CI and local on npm 11

CI pins npm 11 in every job (`npm install -g npm@11` after `setup-node`) so it
matches local dev. This matters because npm 10 and npm 11 resolve peer deps
differently: npm 10 wants a nested `optional`/`peer` `typescript` entry under
`@jchiam/eslint-config` (its eslint-react plugins peer-require typescript
`^4.9.5 || ^5.3.3`, unsatisfiable by the root `typescript@6.x`) that npm 11
omits. Mixing the two makes `npm ci` fail with
`EUSAGE ... Missing: typescript@<v> from lock file`. Don't downgrade CI's npm
without regenerating the lock to match.

When updating dependencies, **update the lock in place** with npm 11:

```bash
npm install --package-lock-only
```

Do **not** `rm package-lock.json` and rebuild from scratch with this local
npm 11 — that drops `resolved`/`integrity` from hundreds of entries, producing
a degraded, non-reproducible lock. In-place updates preserve integrity hashes.
