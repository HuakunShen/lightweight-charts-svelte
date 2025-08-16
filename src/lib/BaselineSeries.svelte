<script lang="ts">
	import BaseSeries from './BaseSeries.svelte';
	import type { BaselineSeriesProps, BaselineSeriesOptions, BaselineStyleOptions, DeepPartial } from './types.js';

	// Props - destructure style options from the BaselineSeriesProps
	let {
		data,
		reactive = true,
		visible = true,
		title,
		children,
		// Baseline style options
		baseValue,
		topLineColor,
		topFillColor1,
		topFillColor2,
		bottomLineColor,
		bottomFillColor1,
		bottomFillColor2,
		lineWidth,
		lineStyle,
		lineType,
		crosshairMarkerVisible,
		crosshairMarkerRadius,
		crosshairMarkerBorderColor,
		crosshairMarkerBorderWidth,
		crosshairMarkerBackgroundColor,
		lastPriceAnimation,
		pointMarkersVisible,
		pointMarkersRadius,
		...restOptions
	}: BaselineSeriesProps & { 
		children?: any;
		topFillColor1?: string;
		topFillColor2?: string;
		bottomFillColor1?: string;
		bottomFillColor2?: string;
	} = $props();

	// Combine all style options - filter out undefined values
	const seriesOptions = $derived((): DeepPartial<BaselineSeriesOptions> => {
		const options: DeepPartial<BaselineStyleOptions> = {};
		if (baseValue !== undefined) options.baseValue = baseValue;
		if (topLineColor !== undefined) options.topLineColor = topLineColor;
		if (topFillColor1 !== undefined) options.topFillColor1 = topFillColor1;
		if (topFillColor2 !== undefined) options.topFillColor2 = topFillColor2;
		if (bottomLineColor !== undefined) options.bottomLineColor = bottomLineColor;
		if (bottomFillColor1 !== undefined) options.bottomFillColor1 = bottomFillColor1;
		if (bottomFillColor2 !== undefined) options.bottomFillColor2 = bottomFillColor2;
		if (lineWidth !== undefined) options.lineWidth = lineWidth;
		if (lineStyle !== undefined) options.lineStyle = lineStyle;
		if (lineType !== undefined) options.lineType = lineType;
		if (crosshairMarkerVisible !== undefined) options.crosshairMarkerVisible = crosshairMarkerVisible;
		if (crosshairMarkerRadius !== undefined) options.crosshairMarkerRadius = crosshairMarkerRadius;
		if (crosshairMarkerBorderColor !== undefined) options.crosshairMarkerBorderColor = crosshairMarkerBorderColor;
		if (crosshairMarkerBorderWidth !== undefined) options.crosshairMarkerBorderWidth = crosshairMarkerBorderWidth;
		if (crosshairMarkerBackgroundColor !== undefined) options.crosshairMarkerBackgroundColor = crosshairMarkerBackgroundColor;
		if (lastPriceAnimation !== undefined) options.lastPriceAnimation = lastPriceAnimation;
		if (pointMarkersVisible !== undefined) options.pointMarkersVisible = pointMarkersVisible;
		if (pointMarkersRadius !== undefined) options.pointMarkersRadius = pointMarkersRadius;
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

	export function applyOptions(options: DeepPartial<BaselineSeriesOptions>) {
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
	seriesType="Baseline"
	seriesOptions={seriesOptions()}
>
	{@render children?.()}
</BaseSeries>