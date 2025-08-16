<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { createChart, createYieldCurveChart } from 'lightweight-charts';
	import { createChartContext } from './context.js';
	import type { ChartProps, IChartApi, IYieldCurveChartApi } from './types.js';

	// Props
	let {
		width = 800,
		height = 600,
		options = {},
		yieldCurve = false,
		class: className = '',
		style = '',
		children
	}: ChartProps & { children?: any } = $props();

	// Chart container element
	let container: HTMLDivElement;
	
	// Chart instance - use $state for Svelte 5 reactivity
	let chart = $state<IChartApi | IYieldCurveChartApi | null>(null);
	
	// Create chart context
	const chartContext = createChartContext();
	
	// Mount chart when component is created and we're in browser
	onMount(() => {
		if (!browser || !container) return;
		
		try {
			// Create chart instance
			if (yieldCurve) {
				chart = createYieldCurveChart(container, options);
			} else {
				chart = createChart(container, options);
			}
			
			// Update context with chart instance - cast to IChartApi for context compatibility
			chartContext.chart = chart as IChartApi;
		} catch (error) {
			console.error('Failed to create chart:', error);
		}
	});
	
	// Cleanup chart on destroy
	onDestroy(() => {
		if (chart) {
			chart.remove();
			chart = null;
			chartContext.chart = null;
		}
	});
	
	// Reactive updates to chart options
	$effect(() => {
		if (chart && options) {
			chart.applyOptions(options);
		}
	});
	
	// Reactive updates to chart size
	$effect(() => {
		if (chart && container) {
			chart.resize(width, height);
		}
	});
	
	// Public API - expose chart instance methods
	export function getChart(): IChartApi | IYieldCurveChartApi | null {
		return chart;
	}
	
	export function timeScale() {
		return chart?.timeScale() ?? null;
	}
	
	export function priceScale(id?: string) {
		if (!chart) return null;
		return chart.priceScale(id || 'right');
	}
	
	export function resize(newWidth?: number, newHeight?: number) {
		if (chart) {
			chart.resize(newWidth || width, newHeight || height);
		}
	}
	
	export function remove() {
		if (chart) {
			chart.remove();
			chart = null;
			chartContext.chart = null;
		}
	}
	
	// Pane management methods
	export function addPane(preserveEmptyPane?: boolean) {
		return chart?.addPane(preserveEmptyPane) ?? null;
	}
	
	export function panes() {
		return chart?.panes() ?? [];
	}
	
	export function removePane(index: number) {
		if (chart) {
			chart.removePane(index);
		}
	}
</script>

<div
	bind:this={container}
	class="chart-container {className}"
	{style}
	style:width="{width}px"
	style:height="{height}px"
>
	{#if browser && chart}
		{@render children?.()}
	{/if}
</div>

<style>
	.chart-container {
		position: relative;
		overflow: hidden;
	}
</style>