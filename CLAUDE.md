# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Svelte Component Library wrapper for TradingView's Lightweight Charts library. The project provides a declarative, type-safe way to create financial charts in Svelte 5 applications.

**Current State**: The library is fully implemented with:
- Complete Svelte 5 components for all chart and series types
- Full TypeScript support using native lightweight-charts types
- Reactive data updates and declarative API
- Working demo pages showcasing all features

## Component Architecture

The library follows a declarative component hierarchy:

```svelte
<Chart options={chartOptions}>
  <LineSeries data={lineData} color="#2962FF" />
  <AreaSeries data={areaData} topColor="#26a69a" />
  <CandlestickSeries data={candlestickData} upColor="#26a69a" downColor="#ef5350" />
  <PriceLine price={100} title="Target Price" />
</Chart>
```

### Available Components:
- **Chart**: Root chart container (supports both regular and yield curve charts)
- **Series Components**: LineSeries, AreaSeries, BarSeries, CandlestickSeries, HistogramSeries, BaselineSeries
- **PriceLine**: Dynamic price lines (nested within series)

### Key Features:
- **Fully Typed**: All props use native TypeScript types from lightweight-charts
- **Reactive**: Data updates automatically trigger chart redraws with `reactive={true}`
- **SSR Safe**: Components handle browser-only rendering correctly
- **Context-Based**: Chart and series communicate via Svelte contexts
- **Ref Access**: Direct access to underlying chart/series APIs via `bind:this={chart}`

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

## Implementation Notes

### Type Safety
The library avoids using `any` types and instead:
- Re-exports all native types from `lightweight-charts`
- Uses proper generic constraints for series options
- Filters undefined values from props before passing to underlying APIs
- Provides fully typed component APIs with intellisense support

### Svelte 5 Features
- Uses `$state()` for reactive chart/series instances
- Uses `$effect()` for reactive data and options updates
- Uses `$derived()` for computed series options
- Follows Svelte 5 component patterns with `$props()`

### Chart Context System
- `ChartContext` provides chart instance to child series
- `SeriesContext` provides series instance to nested components (like PriceLine)
- Automatic series registration/cleanup on mount/unmount

### Data Handling
- Supports both static and reactive data updates
- Automatic data validation and type checking
- Efficient updates only when data actually changes