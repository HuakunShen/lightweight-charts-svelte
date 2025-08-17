<script lang="ts">
	import { Chart, HistogramSeries, type ChartOptions, type DeepPartial, ColorType, type UTCTimestamp } from '../../lib/index.js';
	import { generateVolumeData } from '../../lib/data-generators.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';
	import { mode } from 'mode-watcher';

	// Theme-aware chart options
	const chartOptions: DeepPartial<ChartOptions> = $derived({
		layout: { 
			textColor: mode.current === 'dark' ? 'white' : 'black', 
			background: { 
				type: ColorType.Solid, 
				color: mode.current === 'dark' ? '#0a0a0a' : 'white' 
			} 
		},
		grid: {
			horzLines: {
				color: mode.current === 'dark' ? '#1f2937' : '#F0F3FA',
			},
			vertLines: {
				color: mode.current === 'dark' ? '#1f2937' : '#F0F3FA',
			},
		},
		rightPriceScale: {
			borderColor: mode.current === 'dark' ? '#374151' : '#D1D4DC',
		},
		timeScale: {
			borderColor: mode.current === 'dark' ? '#374151' : '#D1D4DC',
		},
	});

	// Generate histogram series data using library function
	const histogramData = generateVolumeData({ days: 365, baseVolume: 50000 });

	// Chart reference for manual control
	let chart: Chart;
</script>

<svelte:head>
	<title>Histogram Example - Svelte Lightweight Charts</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<Card class="mb-6">
		<CardHeader>
			<CardTitle class="text-3xl">Histogram Chart Example</CardTitle>
			<CardDescription>
				Histogram charts are ideal for displaying volume data, showing discrete values over time.
				Each bar can have a custom color to represent different data states.
			</CardDescription>
		</CardHeader>
		<CardContent>
		<Chart 
			bind:this={chart} 
			width={900} 
			height={500} 
			options={chartOptions} 
			class="border border-border rounded mb-4"
		>
			<HistogramSeries 
				data={histogramData} 
				color="#26a69a" 
				title="Volume Histogram" 
			/>
		</Chart>

			<div class="flex flex-wrap gap-2">
				<Button onclick={() => chart?.timeScale()?.fitContent()}>
					Fit Content
				</Button>
				<Button variant="secondary" onclick={() => chart?.priceScale()?.applyOptions({ autoScale: true })}>
					Auto Scale
				</Button>
			</div>
		</CardContent>
	</Card>

	<Alert>
		<AlertDescription>
			<div class="space-y-2">
				<h3 class="font-medium mb-2">About Histogram Charts</h3>
				<ul class="text-sm space-y-1">
					<li>• Perfect for displaying volume or indicator data</li>
					<li>• Each bar represents a single value at a point in time</li>
					<li>• Bars can have individual colors (red bars in this example indicate specific conditions)</li>
					<li>• Commonly used for trading volume, RSI, MACD histograms</li>
					<li>• Can be combined with other series types in multiple panes</li>
				</ul>
			</div>
		</AlertDescription>
	</Alert>
</div>
