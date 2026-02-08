# Dead Code Radar

Delete code with confidence.

Dead Code Radar is a static analysis tool for TypeScript projects that finds unreferenced exports and ranks them by confidence. It tells you *what* looks dead and *why* — without auto-deleting anything.

## Example Output

```
Dead Code Radar - 8 files scanned
1 issues found
  [50%] Export 'scan' (function) in index.ts is never referenced
    -> No references found to function scan declared at line 25
    -> Export is in an index.ts file (likely public API)
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Scan a project
node packages/cli/dist/index.js scan ./path/to/project --format pretty
```

## CLI Usage

```bash
deadcode-radar scan [path] [options]
```

| Option               | Description                          | Default  |
|----------------------|--------------------------------------|----------|
| `--format pretty`    | Human-readable output                | `json`   |
| `--format json`      | Structured JSON output               | `json`   |
| `--min-confidence N` | Only show findings above N% confidence | `0`    |

## How It Works

Dead Code Radar runs a six-stage pipeline:

1. **Discovery** -- Finds the nearest `tsconfig.json` and creates a TypeScript project
2. **Enumeration** -- Collects source files, filtering out tests, type definitions, and build artifacts
3. **Graph** -- Builds an exported symbol reference graph using the TypeScript language service
4. **Analysis** -- Identifies exports with zero references across the project
5. **Scoring** -- Adjusts confidence based on heuristics (e.g. entry point files get lower confidence)
6. **Reporting** -- Formats findings as pretty CLI output or structured JSON

Every finding includes a confidence score (0-100%) and a list of reasons explaining why it was flagged.

## What It Detects

- **Unreferenced exports** -- Functions, classes, variables, types, interfaces, and enums that are exported but never imported anywhere in the project

## Confidence Scoring

Not all unreferenced exports are dead code. Dead Code Radar adjusts confidence based on context:

| Signal                  | Confidence | Reason                            |
|-------------------------|------------|-----------------------------------|
| No references found     | 100%       | Definitively unused within project |
| Exported from index.ts  | 50%        | Likely a public API entry point    |

## Roadmap

- [ ] More analyzers (unused imports, unused local variables, unreachable code)
- [ ] Additional scoring heuristics (re-exports, framework conventions, decorator usage)
- [ ] `--min-confidence` filtering in CLI
- [ ] Solution-style tsconfig support (monorepos with project references)
- [ ] Watch mode for continuous feedback during development
- [ ] IDE integrations (VS Code extension)
- [ ] Ignore comments (`// @dead-code-radar-ignore`)
- [ ] HTML/markdown report export

## Project Structure

```
packages/
  core/       Analysis library - all detection logic lives here
  cli/        Thin CLI wrapper - parses args, calls core, prints output
test/
  fixtures/   Self-contained mini-projects used by tests
```

## Development

```bash
pnpm install          # Install dependencies (pnpm 9.15.0)
pnpm build            # Build all packages
pnpm test             # Run all tests
pnpm clean            # Remove dist/ folders
```

## License

MIT
