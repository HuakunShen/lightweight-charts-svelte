import { getContext, setContext } from 'svelte';
import type { IChartApi, ISeriesApi, SeriesType } from './types.js';

/**
 * Chart context interface
 */
export interface ChartContext {
	/** The chart API instance */
	chart: IChartApi | null;
	/** Register a series with the chart context */
	registerSeries: (id: string, series: ISeriesApi<SeriesType>) => void;
	/** Unregister a series from the chart context */
	unregisterSeries: (id: string) => void;
	/** Get a registered series by ID */
	getSeries: (id: string) => ISeriesApi<SeriesType> | undefined;
	/** Get all registered series */
	getAllSeries: () => Map<string, ISeriesApi<SeriesType>>;
}

/**
 * Series context interface for nested components like PriceLine
 */
export interface SeriesContext {
	/** The series API instance */
	series: ISeriesApi<SeriesType> | null;
	/** The series ID within the chart context */
	seriesId: string;
}

// Context keys
const CHART_CONTEXT_KEY = Symbol('chart-context');
const SERIES_CONTEXT_KEY = Symbol('series-context');

/**
 * Create and set chart context
 */
export function createChartContext(): ChartContext {
	const seriesMap = new Map<string, ISeriesApi<SeriesType>>();
	
	const context: ChartContext = {
		chart: null,
		registerSeries: (id: string, series: ISeriesApi<SeriesType>) => {
			seriesMap.set(id, series);
		},
		unregisterSeries: (id: string) => {
			seriesMap.delete(id);
		},
		getSeries: (id: string) => {
			return seriesMap.get(id);
		},
		getAllSeries: () => {
			return new Map(seriesMap);
		}
	};
	
	setContext(CHART_CONTEXT_KEY, context);
	return context;
}

/**
 * Get the chart context
 */
export function getChartContext(): ChartContext {
	const context = getContext<ChartContext>(CHART_CONTEXT_KEY);
	if (!context) {
		throw new Error('Chart context not found. Make sure this component is used within a Chart component.');
	}
	return context;
}

/**
 * Create and set series context
 */
export function createSeriesContext(series: ISeriesApi<SeriesType>, seriesId: string): SeriesContext {
	const context: SeriesContext = {
		series,
		seriesId
	};
	
	setContext(SERIES_CONTEXT_KEY, context);
	return context;
}

/**
 * Get the series context
 */
export function getSeriesContext(): SeriesContext {
	const context = getContext<SeriesContext>(SERIES_CONTEXT_KEY);
	if (!context) {
		throw new Error('Series context not found. Make sure this component is used within a series component.');
	}
	return context;
}

/**
 * Generate a unique ID for series components
 */
let seriesIdCounter = 0;
export function generateSeriesId(): string {
	return `series-${++seriesIdCounter}`;
}