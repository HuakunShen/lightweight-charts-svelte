<script lang="ts">
	import { Chart, LineSeries, ColorType, type UTCTimestamp } from '../../lib/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';
	import { mode } from 'mode-watcher';

	// Theme-aware chart options for yield curve
	const chartOptions = $derived({
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
		yieldCurve: { baseResolution: 1, minimumTimeRange: 10, startTimeRange: 3 },
		handleScroll: false,
		handleScale: false
	});

	// Yield curve data
	const curveData = [
		{ time: 1 as UTCTimestamp, value: 5.378 },
		{ time: 2 as UTCTimestamp, value: 5.372 },
		{ time: 3 as UTCTimestamp, value: 5.271 },
		{ time: 6 as UTCTimestamp, value: 5.094 },
		{ time: 12 as UTCTimestamp, value: 4.739 },
		{ time: 24 as UTCTimestamp, value: 4.237 },
		{ time: 36 as UTCTimestamp, value: 4.036 },
		{ time: 60 as UTCTimestamp, value: 3.887 },
		{ time: 84 as UTCTimestamp, value: 3.921 },
		{ time: 120 as UTCTimestamp, value: 4.007 },
		{ time: 240 as UTCTimestamp, value: 4.366 },
		{ time: 360 as UTCTimestamp, value: 4.29 }
	];

	// Chart reference for manual control
	let chart: Chart;
</script>

<svelte:head>
	<title>Yield Curve Example - Svelte Lightweight Charts</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<Card class="mb-6">
		<CardHeader>
			<CardTitle class="text-3xl">Yield Curve Chart Example</CardTitle>
			<CardDescription>
				Yield curve charts show the relationship between interest rates and different time periods.
				This example demonstrates a special chart type for financial yield curve visualization.
			</CardDescription>
		</CardHeader>
		<CardContent>
		<Chart
			bind:this={chart}
			width={900}
			height={500}
			options={chartOptions}
			yieldCurve={true}
			class="border border-border rounded mb-4"
		>
			<LineSeries data={curveData} color="#2962FF" title="Yield Curve" />
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
				<h3 class="font-medium mb-2">About Yield Curves</h3>
				<ul class="text-sm space-y-1">
					<li>• Shows interest rates across different maturity periods</li>
					<li>• X-axis represents time to maturity (months)</li>
					<li>• Y-axis represents yield/interest rate percentage</li>
					<li>• Normal curve slopes upward (longer terms = higher yields)</li>
					<li>• Inverted curves can signal economic conditions</li>
					<li>• Uses specialized chart configuration for yield data</li>
				</ul>
			</div>
		</AlertDescription>
	</Alert>
</div>
