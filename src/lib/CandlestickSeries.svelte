<script lang="ts">
	import BaseSeries from './BaseSeries.svelte';
	import type { CandlestickSeriesProps, CandlestickSeriesOptions, CandlestickStyleOptions, DeepPartial } from './types.js';

	// Props - destructure style options from the CandlestickSeriesProps
	let {
		data,
		reactive = true,
		visible = true,
		title,
		children,
		// Candlestick style options
		upColor,
		downColor,
		wickUpColor,
		wickDownColor,
		borderVisible,
		borderColor,
		borderUpColor,
		borderDownColor,
		wickVisible,
		wickColor,
		...restOptions
	}: CandlestickSeriesProps & { children?: any } = $props();

	// Combine all style options - filter out undefined values
	const seriesOptions = $derived((): DeepPartial<CandlestickSeriesOptions> => {
		const options: DeepPartial<CandlestickStyleOptions> = {};
		if (upColor !== undefined) options.upColor = upColor;
		if (downColor !== undefined) options.downColor = downColor;
		if (wickUpColor !== undefined) options.wickUpColor = wickUpColor;
		if (wickDownColor !== undefined) options.wickDownColor = wickDownColor;
		if (borderVisible !== undefined) options.borderVisible = borderVisible;
		if (borderColor !== undefined) options.borderColor = borderColor;
		if (borderUpColor !== undefined) options.borderUpColor = borderUpColor;
		if (borderDownColor !== undefined) options.borderDownColor = borderDownColor;
		if (wickVisible !== undefined) options.wickVisible = wickVisible;
		if (wickColor !== undefined) options.wickColor = wickColor;
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

	export function applyOptions(options: DeepPartial<CandlestickSeriesOptions>) {
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
	seriesType="Candlestick"
	seriesOptions={seriesOptions()}
>
	{@render children?.()}
</BaseSeries>