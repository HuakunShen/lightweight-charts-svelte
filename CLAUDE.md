# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Svelte Component Library wrapper for TradingView's Lightweight Charts library. The project aims to provide a declarative, type-safe way to create financial charts in Svelte applications.

**Current State**: The library structure is set up but components are not yet implemented. Currently has demo pages using direct lightweight-charts API calls rather than Svelte components.

## Development Commands

### Core Development
- `npm run dev` - Start development server
- `npm run build` - Build the library and run prepack
- `npm run preview` - Preview the built application

### Code Quality
- `npm run check` - Run svelte-check for type checking
- `npm run check:watch` - Run type checking in watch mode
- `npm run lint` - Run prettier and eslint checks
- `npm run format` - Format code with prettier

### Testing
- `npm run test` - Run all tests (e2e + unit)
- `npm run test:unit` - Run vitest unit tests
- `npm run test:e2e` - Run playwright e2e tests

### Package Development
- `npm run prepack` - Sync, package, and lint for publishing
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook

## Architecture

### Library Structure
- `src/lib/index.ts` - Main library entry point (currently empty, needs component exports)
- `src/routes/` - Demo pages showing intended component usage patterns
- `package.json` exports `./dist/index.js` as the main Svelte component library

### Target Component API
Based on README examples, the library should provide:
```svelte
<Chart width={800} height={600}>
    <LineSeries {data} />
</Chart>
```

### Demo Pages Structure
- `/` - Area and candlestick series example
- `/bar` - Bar chart example  
- `/histogram` - Histogram series example
- `/curve` - Yield curve chart example

### Test Configuration
- **Unit Tests**: Vitest with browser environment using Playwright/Chromium for Svelte component testing
- **E2E Tests**: Playwright tests in `e2e/` directory
- Test files: `src/**/*.svelte.{test,spec}.{js,ts}` for component tests, `src/**/*.{test,spec}.{js,ts}` for regular unit tests

### Build System
- **SvelteKit** with `@sveltejs/package` for library packaging
- **Vite** as the build tool with TailwindCSS v4
- **TypeScript** with strict configuration
- **Storybook** for component documentation and testing

### Key Dependencies
- `lightweight-charts` - Core charting library (peer dependency)
- `svelte` v5 - Framework (peer dependency)
- `@tailwindcss/vite` - TailwindCSS v4 integration
- `vitest` + `@vitest/browser` - Testing with browser environment