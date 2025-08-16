<script lang="ts">
	import BaseSeries from './BaseSeries.svelte';
	import type { BarSeriesProps, BarSeriesOptions, BarStyleOptions, DeepPartial } from './types.js';

	// Props - destructure style options from the BarSeriesProps
	let {
		data,
		reactive = true,
		visible = true,
		title,
		children,
		// Bar style options
		upColor,
		downColor,
		openVisible,
		thinBars,
		...restOptions
	}: BarSeriesProps & { children?: any } = $props();

	// Combine all style options - filter out undefined values
	const seriesOptions = $derived((): DeepPartial<BarSeriesOptions> => {
		const options: DeepPartial<BarStyleOptions> = {};
		if (upColor !== undefined) options.upColor = upColor;
		if (downColor !== undefined) options.downColor = downColor;
		if (openVisible !== undefined) options.openVisible = openVisible;
		if (thinBars !== undefined) options.thinBars = thinBars;
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

	export function applyOptions(options: DeepPartial<BarSeriesOptions>) {
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
	seriesType="Bar"
	seriesOptions={seriesOptions()}
>
	{@render children?.()}
</BaseSeries>