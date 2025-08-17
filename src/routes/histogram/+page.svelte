<script lang="ts">
	import { Chart, HistogramSeries, type ChartOptions, type DeepPartial, ColorType, type UTCTimestamp } from '../../lib/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';

	// Chart options
	const chartOptions: DeepPartial<ChartOptions> = {
		layout: { textColor: 'white', background: { type: ColorType.Solid, color: 'black' } }
	};

	// Histogram series data
	const histogramData = [
		{ value: 1, time: 1642425322 as UTCTimestamp },
		{ value: 8, time: 1642511722 as UTCTimestamp },
		{ value: 10, time: 1642598122 as UTCTimestamp },
		{ value: 20, time: 1642684522 as UTCTimestamp },
		{ value: 3, time: 1642770922 as UTCTimestamp, color: 'red' },
		{ value: 43, time: 1642857322 as UTCTimestamp },
		{ value: 41, time: 1642943722 as UTCTimestamp, color: 'red' },
		{ value: 43, time: 1643030122 as UTCTimestamp },
		{ value: 56, time: 1643116522 as UTCTimestamp },
		{ value: 46, time: 1643202922 as UTCTimestamp, color: 'red' }
	];

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
			class="border border-gray-200 rounded mb-4"
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
