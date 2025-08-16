<script lang="ts">
	import BaseSeries from './BaseSeries.svelte';
	import type { HistogramSeriesProps, HistogramSeriesOptions, HistogramStyleOptions, DeepPartial } from './types.js';

	// Props - destructure style options from the HistogramSeriesProps
	let {
		data,
		reactive = true,
		visible = true,
		title,
		children,
		// Histogram style options
		color,
		base,
		...restOptions
	}: HistogramSeriesProps & { children?: any } = $props();

	// Combine all style options - filter out undefined values
	const seriesOptions = $derived((): DeepPartial<HistogramSeriesOptions> => {
		const options: DeepPartial<HistogramStyleOptions> = {};
		if (color !== undefined) options.color = color;
		if (base !== undefined) options.base = base;
		return { ...options, ...restOptions };
	});

	// Reference to the base series
	let baseSeries: BaseSeries;

	// Expose public API
	export function getSeries() {
		return baseSeries?.getSeries() ?? null;
	}

	export function setData(newData: any[]) {
		baseSeries?.setData(newData);
	}

	export function update(dataItem: any) {
		baseSeries?.update(dataItem);
	}

	export function applyOptions(options: DeepPartial<HistogramSeriesOptions>) {
		baseSeries?.applyOptions(options);
	}

	export function priceScale() {
		return baseSeries?.priceScale() ?? null;
	}
</script>

<BaseSeries
	bind:this={baseSeries}
	{data}
	{reactive}
	{visible}
	{title}
	seriesType="Histogram"
	seriesOptions={seriesOptions()}
>
	{@render children?.()}
</BaseSeries>