<script lang="ts">
	import BaseSeries from './BaseSeries.svelte';
	import type { LineSeriesProps, LineSeriesOptions, LineStyleOptions, DeepPartial } from './types.js';

	// Props - destructure style options from the LineSeriesProps
	let {
		data,
		reactive = true,
		visible = true,
		title,
		children,
		// Line style options
		color,
		lineStyle,
		lineWidth,
		lineType,
		crosshairMarkerVisible,
		crosshairMarkerRadius,
		crosshairMarkerBorderColor,
		crosshairMarkerBorderWidth,
		crosshairMarkerBackgroundColor,
		lineVisible,
		pointMarkersVisible,
		pointMarkersRadius,
		lastPriceAnimation,
		...restOptions
	}: LineSeriesProps & { children?: any } = $props();

	// Combine all style options - filter out undefined values
	const seriesOptions = $derived((): DeepPartial<LineSeriesOptions> => {
		const options: DeepPartial<LineStyleOptions> = {};
		if (color !== undefined) options.color = color;
		if (lineStyle !== undefined) options.lineStyle = lineStyle;
		if (lineWidth !== undefined) options.lineWidth = lineWidth;
		if (lineType !== undefined) options.lineType = lineType;
		if (crosshairMarkerVisible !== undefined) options.crosshairMarkerVisible = crosshairMarkerVisible;
		if (crosshairMarkerRadius !== undefined) options.crosshairMarkerRadius = crosshairMarkerRadius;
		if (crosshairMarkerBorderColor !== undefined) options.crosshairMarkerBorderColor = crosshairMarkerBorderColor;
		if (crosshairMarkerBorderWidth !== undefined) options.crosshairMarkerBorderWidth = crosshairMarkerBorderWidth;
		if (crosshairMarkerBackgroundColor !== undefined) options.crosshairMarkerBackgroundColor = crosshairMarkerBackgroundColor;
		if (lineVisible !== undefined) options.lineVisible = lineVisible;
		if (pointMarkersVisible !== undefined) options.pointMarkersVisible = pointMarkersVisible;
		if (pointMarkersRadius !== undefined) options.pointMarkersRadius = pointMarkersRadius;
		if (lastPriceAnimation !== undefined) options.lastPriceAnimation = lastPriceAnimation;
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

	export function applyOptions(options: DeepPartial<LineSeriesOptions>) {
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
	seriesType="Line"
	seriesOptions={seriesOptions()}
>
	{@render children?.()}
</BaseSeries>