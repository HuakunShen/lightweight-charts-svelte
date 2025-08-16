// Export all Svelte components
export { default as Chart } from './Chart.svelte';
export { default as LineSeries } from './LineSeries.svelte';
export { default as AreaSeries } from './AreaSeries.svelte';
export { default as BarSeries } from './BarSeries.svelte';
export { default as CandlestickSeries } from './CandlestickSeries.svelte';
export { default as HistogramSeries } from './HistogramSeries.svelte';
export { default as BaselineSeries } from './BaselineSeries.svelte';
export { default as PriceLine } from './PriceLine.svelte';

// Export types (re-export from types.ts)
export type {
	// Component prop types
	ChartProps,
	LineSeriesProps,
	AreaSeriesProps,
	BarSeriesProps,
	CandlestickSeriesProps,
	HistogramSeriesProps,
	BaselineSeriesProps,
	PriceLineProps,
	BaseSeriesProps,

	// Utility types
	SeriesDataTypeMap,
	StyleOptionsOf,
	SeriesPropsOf,

	// Re-exported lightweight-charts types
	ChartOptions,
	DeepPartial,
	IChartApi,
	ISeriesApi,
	IPaneApi,
	IYieldCurveChartApi,
	Time,
	UTCTimestamp,
	LineData,
	AreaData,
	BarData,
	CandlestickData,
	HistogramData,
	BaselineData,
	SingleValueData,
	OhlcData,
	WhitespaceData,
	SeriesOptions,
	LineSeriesOptions,
	AreaSeriesOptions,
	BarSeriesOptions,
	CandlestickSeriesOptions,
	HistogramSeriesOptions,
	BaselineSeriesOptions,
	SeriesOptionsMap,
	SeriesType,
	LineStyleOptions,
	AreaStyleOptions,
	BarStyleOptions,
	CandlestickStyleOptions,
	HistogramStyleOptions,
	BaselineStyleOptions,
	CreatePriceLineOptions,
	IPriceLine,
	LineStyle,
	LineType,
	PriceScaleMode,
	CrosshairMode,
	LastPriceAnimationMode,
	MouseEventParams
} from './types.js';

// Export context utilities for advanced usage
export { getChartContext, getSeriesContext } from './context.js';

// Re-export useful functions from lightweight-charts
export {
	createChart,
	createYieldCurveChart,
	version,
	isBusinessDay,
	isUTCTimestamp,
	ColorType
} from 'lightweight-charts';
