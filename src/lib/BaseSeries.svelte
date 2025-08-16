<script lang="ts">
	import { onDestroy } from 'svelte';
	import { 
		AreaSeries, 
		BarSeries, 
		BaselineSeries, 
		CandlestickSeries, 
		HistogramSeries, 
		LineSeries 
	} from 'lightweight-charts';
	import { getChartContext, createSeriesContext, generateSeriesId } from './context.js';
	import type { 
		ISeriesApi, 
		SeriesType, 
		BaseSeriesProps, 
		DeepPartial, 
		LineSeriesOptions,
		AreaSeriesOptions,
		BarSeriesOptions,
		CandlestickSeriesOptions,
		HistogramSeriesOptions,
		BaselineSeriesOptions
	} from './types.js';

	// Union type for all series options
	type AnySeriesOptions = 
		| LineSeriesOptions 
		| AreaSeriesOptions 
		| BarSeriesOptions 
		| CandlestickSeriesOptions 
		| HistogramSeriesOptions 
		| BaselineSeriesOptions;

	// Generic props interface
	interface BaseSeriesComponentProps<TData> extends BaseSeriesProps<TData> {
		seriesType: SeriesType;
		seriesOptions?: DeepPartial<AnySeriesOptions>;
		title?: string;
		children?: any;
	}

	// Props
	let {
		data,
		reactive = true,
		visible = true,
		paneIndex,
		priceScaleId,
		seriesType,
		seriesOptions = {},
		title,
		children
	}: BaseSeriesComponentProps<any> = $props();

	// Get chart context
	const chartContext = getChartContext();
	
	// Generate unique series ID
	const seriesId = generateSeriesId();
	
	// Series instance - use $state for Svelte 5 reactivity
	let series = $state<ISeriesApi<SeriesType> | null>(null);
	
	// Track if series has been initialized
	let initialized = false;
	
	// Create series when chart is available
	$effect(() => {
		if (chartContext.chart && !series && !initialized) {
			try {
				// Combine series options with title, visibility, and price scale
				const finalOptions = {
					...seriesOptions,
					...(title && { title }),
					...(visible !== undefined && { visible }),
					...(priceScaleId && { priceScaleId })
				};
				
				// Create series based on type using correct API
				let seriesDefinition;
				if (seriesType === 'Line') {
					seriesDefinition = LineSeries;
				} else if (seriesType === 'Area') {
					seriesDefinition = AreaSeries;
				} else if (seriesType === 'Bar') {
					seriesDefinition = BarSeries;
				} else if (seriesType === 'Candlestick') {
					seriesDefinition = CandlestickSeries;
				} else if (seriesType === 'Histogram') {
					seriesDefinition = HistogramSeries;
				} else if (seriesType === 'Baseline') {
					seriesDefinition = BaselineSeries;
				}
				
				if (seriesDefinition) {
					series = chartContext.chart.addSeries(seriesDefinition, finalOptions, paneIndex);
					
					// Register series with chart context
					chartContext.registerSeries(seriesId, series);
					
					// Create series context for child components
					createSeriesContext(series, seriesId);
					
					// Set initial data
					if (data && data.length > 0) {
						series.setData(data);
					}
					
					initialized = true;
				}
			} catch (error) {
				console.error(`Failed to create ${seriesType} series:`, error);
			}
		}
	});
	
	// Reactive data updates
	$effect(() => {
		if (series && data && reactive && initialized) {
			series.setData(data);
		}
	});
	
	// Reactive options updates
	$effect(() => {
		if (series && seriesOptions && initialized) {
			const finalOptions = {
				...seriesOptions,
				...(title && { title }),
				...(visible !== undefined && { visible })
			};
			series.applyOptions(finalOptions);
		}
	});
	
	// Reactive visibility updates
	$effect(() => {
		if (series && initialized && visible !== undefined) {
			series.applyOptions({ visible });
		}
	});
	
	// Cleanup on destroy
	onDestroy(() => {
		if (series && chartContext.chart) {
			try {
				chartContext.chart.removeSeries(series);
				chartContext.unregisterSeries(seriesId);
			} catch (error) {
				console.error(`Failed to remove ${seriesType} series:`, error);
			}
		}
	});
	
	// Public API
	export function getSeries(): ISeriesApi<SeriesType> | null {
		return series;
	}
	
	export function setData(newData: any[]) {
		if (series) {
			series.setData(newData);
		}
	}
	
	export function update(dataItem: any) {
		if (series) {
			series.update(dataItem);
		}
	}
	
	export function applyOptions(options: DeepPartial<AnySeriesOptions>) {
		if (series) {
			series.applyOptions(options);
		}
	}
	
	export function priceScale() {
		return series?.priceScale() ?? null;
	}
	
	export function moveToPane(newPaneIndex: number) {
		if (series) {
			series.moveToPane(newPaneIndex);
		}
	}
	
	export function getPane() {
		return series?.getPane() ?? null;
	}
</script>

{#if series}
	{@render children?.()}
{/if}