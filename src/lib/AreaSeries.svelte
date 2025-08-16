<script lang="ts">
	import BaseSeries from './BaseSeries.svelte';
	import type { AreaSeriesProps, AreaSeriesOptions, AreaStyleOptions, DeepPartial } from './types.js';

	// Props - destructure style options from the AreaSeriesProps
	let {
		data,
		reactive = true,
		visible = true,
		title,
		children,
		// Area style options
		topColor,
		bottomColor,
		lineColor,
		lineStyle,
		lineWidth,
		lineType,
		lineVisible,
		crosshairMarkerVisible,
		crosshairMarkerRadius,
		crosshairMarkerBorderColor,
		crosshairMarkerBorderWidth,
		crosshairMarkerBackgroundColor,
		pointMarkersVisible,
		pointMarkersRadius,
		lastPriceAnimation,
		invertFilledArea,
		...restOptions
	}: AreaSeriesProps & { children?: any } = $props();

	// Combine all style options - filter out undefined values
	const seriesOptions = $derived((): DeepPartial<AreaSeriesOptions> => {
		const options: DeepPartial<AreaStyleOptions> = {};
		if (topColor !== undefined) options.topColor = topColor;
		if (bottomColor !== undefined) options.bottomColor = bottomColor;
		if (lineColor !== undefined) options.lineColor = lineColor;
		if (lineStyle !== undefined) options.lineStyle = lineStyle;
		if (lineWidth !== undefined) options.lineWidth = lineWidth;
		if (lineType !== undefined) options.lineType = lineType;
		if (lineVisible !== undefined) options.lineVisible = lineVisible;
		if (crosshairMarkerVisible !== undefined) options.crosshairMarkerVisible = crosshairMarkerVisible;
		if (crosshairMarkerRadius !== undefined) options.crosshairMarkerRadius = crosshairMarkerRadius;
		if (crosshairMarkerBorderColor !== undefined) options.crosshairMarkerBorderColor = crosshairMarkerBorderColor;
		if (crosshairMarkerBorderWidth !== undefined) options.crosshairMarkerBorderWidth = crosshairMarkerBorderWidth;
		if (crosshairMarkerBackgroundColor !== undefined) options.crosshairMarkerBackgroundColor = crosshairMarkerBackgroundColor;
		if (pointMarkersVisible !== undefined) options.pointMarkersVisible = pointMarkersVisible;
		if (pointMarkersRadius !== undefined) options.pointMarkersRadius = pointMarkersRadius;
		if (lastPriceAnimation !== undefined) options.lastPriceAnimation = lastPriceAnimation;
		if (invertFilledArea !== undefined) options.invertFilledArea = invertFilledArea;
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

	export function applyOptions(options: DeepPartial<AreaSeriesOptions>) {
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
	seriesType="Area"
	seriesOptions={seriesOptions()}
>
	{@render children?.()}
</BaseSeries>