# Svelte Lightweight Charts Implementation Plan

## Overview
This plan outlines the implementation of a modern Svelte 5 component library for TradingView's Lightweight Charts v5, providing a declarative, type-safe API that reuses all native types from the lightweight-charts library.

## Target API Design
Based on the old svelte-lightweight-charts library, our target API will be:

```svelte
<Chart width={800} height={600} {options}>
  <LineSeries {data} reactive={true} />
  <AreaSeries {data} lineColor="#2962FF" />
  <CandlestickSeries {data} upColor="#26a69a" downColor="#ef5350" />
  <PriceLine price={100} title="Target Price" />
</Chart>
```

With ref access:
```svelte
<script>
  let chart: Chart;
</script>

<Chart bind:this={chart}>
  <LineSeries {data} />
</Chart>
<button on:click={() => chart.timeScale().fitContent()}>Fit Content</button>
```

## Architecture

### Component Hierarchy
1. **Chart** (Root component)
   - Manages chart instance creation and lifecycle
   - Provides context for child components
   - Supports both regular and yield curve charts
   
2. **Series Components**
   - `LineSeries`
   - `AreaSeries` 
   - `BarSeries`
   - `CandlestickSeries`
   - `HistogramSeries`
   - `BaselineSeries`
   - `CustomSeries` (for advanced use cases)

3. **Chart Features**
   - `PriceLine`
   - `TimeScale` (configuration component)
   - `PriceScale` (configuration component)

### Key Design Principles

1. **Type Reuse**: Leverage all TypeScript types from `lightweight-charts` package
2. **Reactive Data**: Support reactive updates with `reactive={true}` prop
3. **SSR Safe**: Handle server-side rendering gracefully
4. **Context-Based**: Use Svelte context for parent-child communication
5. **Event Handling**: Provide access to chart and series events
6. **Ref Access**: Allow direct access to underlying chart/series APIs

## Implementation Steps

### Phase 1: Core Infrastructure
1. **Types and Utilities** (`src/lib/types.ts`)
   - Re-export types from `lightweight-charts`
   - Define component-specific prop types
   - Create utility types for reactive props

2. **Chart Context** (`src/lib/context.ts`)
   - Create Svelte context for chart instance
   - Handle chart lifecycle management
   - Provide series registration system

3. **Chart Component** (`src/lib/Chart.svelte`)
   - Main chart container component
   - Support both `createChart` and `createYieldCurveChart`
   - Handle width/height props and options
   - Provide chart instance via context and ref

### Phase 2: Series Components
4. **Base Series** (`src/lib/BaseSeries.svelte`)
   - Abstract base for all series components
   - Handle common series lifecycle (add/remove/update)
   - Manage reactive data updates
   - Handle series options

5. **Individual Series Components**
   - `LineSeries.svelte`
   - `AreaSeries.svelte`
   - `BarSeries.svelte`
   - `CandlestickSeries.svelte`
   - `HistogramSeries.svelte`
   - `BaselineSeries.svelte`

### Phase 3: Chart Features
6. **PriceLine Component** (`src/lib/PriceLine.svelte`)
   - Dynamic price line creation/removal
   - Reactive price and title updates
   - Must be nested within a series component

7. **Scale Components** (Optional/Advanced)
   - `TimeScale.svelte` for time scale configuration
   - `PriceScale.svelte` for price scale configuration

### Phase 4: Library Export
8. **Main Export** (`src/lib/index.ts`)
   - Export all components
   - Re-export useful types from lightweight-charts
   - Provide helper functions if needed

## Technical Implementation Details

### Chart Component Structure
```typescript
// Chart.svelte props
interface ChartProps {
  width?: number;
  height?: number;
  options?: DeepPartial<ChartOptions>;
  yieldCurve?: boolean; // Use createYieldCurveChart instead
}
```

### Series Component Structure
```typescript
// Example: LineSeries.svelte props
interface LineSeriesProps {
  data: LineData[];
  reactive?: boolean;
  // All LineSeriesOptions properties spread as individual props
  color?: string;
  lineStyle?: LineStyle;
  lineWidth?: number;
  // ... other options
}
```

### Context Structure
```typescript
interface ChartContext {
  chart: IChartApi | null;
  registerSeries: (series: ISeriesApi) => void;
  unregisterSeries: (series: ISeriesApi) => void;
}
```

### Data Flow
1. Chart component creates chart instance and provides context
2. Series components access context and register themselves
3. Reactive data updates trigger series.setData() or series.update()
4. Component cleanup handles series removal

## Type Strategy

### Direct Type Reuse
- Import and re-export types from 'lightweight-charts'
- Use `DeepPartial<ChartOptions>` for chart options
- Use specific series options types like `LineSeriesOptions`

### Component Props Types
```typescript
// Utility to extract style options from series options
type StyleOptionsOf<T> = T extends SeriesOptions<infer U> ? U : never;

// Example usage
type LineSeriesStyleProps = StyleOptionsOf<LineSeriesOptions>;
```

## Conversion Examples

### Current Implementation (src/routes/+page.svelte)
```javascript
const chart = createChart(container, chartOptions);
const areaSeries = chart.addSeries(AreaSeries, {
  lineColor: '#2962FF',
  topColor: '#2962FF',
  bottomColor: 'rgba(41, 98, 255, 0.28)'
});
areaSeries.setData(data);
```

### Target Implementation
```svelte
<Chart {options}>
  <AreaSeries 
    {data} 
    lineColor="#2962FF"
    topColor="#2962FF" 
    bottomColor="rgba(41, 98, 255, 0.28)"
  />
</Chart>
```

## Testing Strategy
1. Convert existing demo pages to use new components
2. Ensure all chart types work correctly
3. Test reactive data updates
4. Verify TypeScript type safety
5. Test SSR compatibility

## Future Enhancements
1. Plugin system support (watermarks, markers, etc.)
2. Custom series support
3. Advanced event handling
4. Performance optimizations
5. Storybook documentation

## Success Criteria
- [ ] All demo pages converted to use new components
- [ ] Full TypeScript support with imported types
- [ ] Reactive data updates working
- [ ] Clean, declarative API
- [ ] SSR safe implementation
- [ ] Complete test coverage
- [ ] Documentation and examples