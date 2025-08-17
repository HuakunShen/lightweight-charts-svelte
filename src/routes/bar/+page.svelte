<script lang="ts">
	import { Chart, BarSeries, ColorType, type BarData, type UTCTimestamp } from '../../lib/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';

	// Chart options
	const chartOptions = {
		layout: { textColor: 'white', background: { type: ColorType.Solid, color: 'black' } }
	};

	// Bar series data
	const barData: BarData[] = [
		{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 as UTCTimestamp },
		{ open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 as UTCTimestamp },
		{ open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 as UTCTimestamp },
		{ open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 as UTCTimestamp },
		{ open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 as UTCTimestamp },
		{ open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 as UTCTimestamp },
		{ open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 as UTCTimestamp },
		{ open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 as UTCTimestamp },
		{ open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 as UTCTimestamp },
		{ open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 as UTCTimestamp },
		{ open: 10.96, high: 11.9, low: 10.8, close: 11.5, time: 1643291876 as UTCTimestamp },
		{ open: 11.5, high: 12.0, low: 11.3, close: 11.8, time: 1643378276 as UTCTimestamp },
		{ open: 11.8, high: 12.2, low: 11.7, close: 12.0, time: 1643464676 as UTCTimestamp },
		{ open: 12.0, high: 12.5, low: 11.9, close: 12.3, time: 1643551076 as UTCTimestamp },
		{ open: 12.3, high: 12.8, low: 12.1, close: 12.6, time: 1643637476 as UTCTimestamp },
		{ open: 12.6, high: 13.0, low: 12.5, close: 12.9, time: 1643723876 as UTCTimestamp },
		{ open: 12.9, high: 13.5, low: 12.7, close: 13.2, time: 1643810276 as UTCTimestamp },
		{ open: 13.2, high: 13.7, low: 13.0, close: 13.5, time: 1643896676 as UTCTimestamp },
		{ open: 13.5, high: 14.0, low: 13.3, close: 13.8, time: 1643983076 as UTCTimestamp },
		{ open: 13.8, high: 14.2, low: 13.6, close: 14.0, time: 1644069476 as UTCTimestamp }
	];

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
			class="border border-gray-200 rounded mb-4"
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
