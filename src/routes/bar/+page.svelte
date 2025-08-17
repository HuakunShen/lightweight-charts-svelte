<script lang="ts">
	import { Chart, BarSeries, ColorType, type BarData, type UTCTimestamp } from '../../lib/index.js';
	import { generateOHLCData } from '../../lib/data-generators.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';
	import { mode } from 'mode-watcher';

	// Theme-aware chart options
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
	});

	// Generate bar series data using library function
	const barData: BarData[] = generateOHLCData({ days: 730, startPrice: 100 });

	// Chart reference for manual control
	let chart: Chart;
</script>

<svelte:head>
	<title>Bar Chart Example - Svelte Lightweight Charts</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<Card class="mb-6">
		<CardHeader>
			<CardTitle class="text-3xl">Bar Chart Example</CardTitle>
			<CardDescription>
				Bar charts display OHLC (Open, High, Low, Close) data as vertical bars. 
				Each bar shows the price range and direction for a given time period.
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
			<BarSeries 
				data={barData} 
				upColor="#26a69a" 
				downColor="#ef5350" 
				title="OHLC Bar Series" 
			/>
		</Chart>

			<div class="flex flex-wrap gap-2">
				<Button onclick={() => chart?.timeScale()?.fitContent()}>
					Fit Content
				</Button>
				<Button variant="secondary" onclick={() => chart?.timeScale()?.scrollToRealTime()}>
					Scroll to Latest
				</Button>
			</div>
		</CardContent>
	</Card>

	<Alert>
		<AlertDescription>
			<div class="space-y-2">
				<h3 class="font-medium mb-2">About Bar Charts</h3>
				<ul class="text-sm space-y-1">
					<li>• Each bar represents OHLC data for a time period</li>
					<li>• Green bars indicate closing price higher than opening price</li>
					<li>• Red bars indicate closing price lower than opening price</li>
					<li>• The vertical line shows the high-low range</li>
					<li>• Horizontal marks on the left show the opening price</li>
					<li>• Horizontal marks on the right show the closing price</li>
				</ul>
			</div>
		</AlertDescription>
	</Alert>
</div>
