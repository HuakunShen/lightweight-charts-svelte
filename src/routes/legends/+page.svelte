<script lang="ts">
	import { Chart, LineSeries, AreaSeries, ColorType, type LineData, type AreaData, type UTCTimestamp } from '../../lib/index.js';
	import { generateFibonacciData, generatePowersOf2Data } from '../../lib/data-generators.js';
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';

	// Theme-aware chart options
	const chartOptions = $derived({
		layout: { 
			textColor: mode.current === 'dark' ? 'white' : 'black', 
			background: { 
				type: ColorType.Solid, 
				color: mode.current === 'dark' ? '#0a0a0a' : 'white' 
			} 
		},
		width: 900,
		height: 500,
		rightPriceScale: {
			borderColor: mode.current === 'dark' ? '#374151' : '#D1D4DC',
		},
		timeScale: {
			borderColor: mode.current === 'dark' ? '#374151' : '#D1D4DC',
		},
		grid: {
			horzLines: {
				color: mode.current === 'dark' ? '#1f2937' : '#F0F3FA',
			},
			vertLines: {
				color: mode.current === 'dark' ? '#1f2937' : '#F0F3FA',
			},
		},
	});

	// Generate data using library functions
	const lineData: LineData[] = generateFibonacciData({ count: 50, interval: 86400 });
	const areaData: AreaData[] = generatePowersOf2Data({ count: 30, interval: 86400 });

	// Chart reference
	let chart: Chart;
	let legendElement: HTMLElement;

	// Store series references
	let lineSeries: any;
	let areaSeries: any;

	onMount(() => {
		if (chart && legendElement) {
			const chartApi = chart.getChart();
			
			// Subscribe to crosshair move events to update legend
			chartApi?.subscribeCrosshairMove((param: any) => {
				if (!param.time) {
					legendElement.innerHTML = 'Fibonacci: <strong>--</strong> | Powers of 2: <strong>--</strong>';
					return;
				}

				let fibValue = '--';
				let powValue = '--';

				// Get data for each series using stored references
				if (lineSeries && param.seriesData.has(lineSeries)) {
					const fibData = param.seriesData.get(lineSeries);
					if (fibData && fibData.value !== undefined) {
						fibValue = fibData.value.toFixed(0);
					}
				}

				if (areaSeries && param.seriesData.has(areaSeries)) {
					const powData = param.seriesData.get(areaSeries);
					if (powData && powData.value !== undefined) {
						powValue = powData.value.toFixed(0);
					}
				}

				legendElement.innerHTML = `Fibonacci: <strong>${fibValue}</strong> | Powers of 2: <strong>${powValue}</strong>`;
			});
		}
	});
</script>

<svelte:head>
	<title>Chart Legends Example - Svelte Lightweight Charts</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-2">Chart Legends Example</h1>
	<p class="mb-6">
		Interactive legends that update based on crosshair position. Move your cursor over the chart to see the legend values change.
	</p>

	<Card class="mb-6">
		<CardContent class="p-6">
			<div class="relative">
				<!-- Legend container positioned over the chart -->
				<div 
					bind:this={legendElement}
					class="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm px-3 py-2 rounded shadow-sm border text-sm font-medium"
				>
					Fibonacci: <strong>--</strong> | Powers of 2: <strong>--</strong>
				</div>
				
				<Chart 
					bind:this={chart} 
					width={900} 
					height={500} 
					options={chartOptions} 
					class="border border-gray-200 rounded"
				>
				<LineSeries 
					bind:this={lineSeries}
					data={lineData} 
					color="#2962FF"
					lineWidth={2}
					title="Fibonacci Series" 
				/>
				<AreaSeries 
					bind:this={areaSeries}
					data={areaData} 
					topColor="rgba(171, 71, 188, 0.4)"
					bottomColor="rgba(171, 71, 188, 0.0)"
					lineColor="rgba(171, 71, 188, 1.0)"
					lineWidth={2}
					title="Powers of 2" 
				/>
				</Chart>
			</div>

			<div class="flex flex-wrap gap-2 mt-4">
				<Button
					variant="default"
					onclick={() => chart?.timeScale()?.fitContent()}
				>
					Fit Content
				</Button>
				<Button
					variant="secondary"
					onclick={() => chart?.timeScale()?.scrollToRealTime()}
				>
					Scroll to Latest
				</Button>
			</div>
		</CardContent>
	</Card>

	<div class="grid md:grid-cols-2 gap-6">
		<Alert>
			<AlertDescription>
				<h3 class="font-medium mb-2">Legend Implementation</h3>
				<ul class="text-sm space-y-1">
					<li>• Custom HTML element positioned over chart</li>
					<li>• Updates dynamically via crosshair move events</li>
					<li>• Shows current values for all series</li>
					<li>• Formatted with proper styling and layout</li>
				</ul>
			</AlertDescription>
		</Alert>
		
		<Alert>
			<AlertDescription>
				<h3 class="font-medium mb-2">Features</h3>
				<ul class="text-sm space-y-1">
					<li>• Real-time value updates on hover</li>
					<li>• Multi-series support</li>
					<li>• Custom positioning and styling</li>
					<li>• Responsive and accessible design</li>
				</ul>
			</AlertDescription>
		</Alert>
	</div>
</div>