<script lang="ts">
	import { Chart, CandlestickSeries, HistogramSeries, LineSeries, ColorType, type UTCTimestamp, type CandlestickData, type HistogramData, type LineData } from '../../lib/index.js';
	import { generateOHLCData, generateVolumeData, generateMovingAverageData } from '../../lib/data-generators.js';
	import { Button } from '$lib/components/ui/button/index.js';
import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';
import { Label } from '$lib/components/ui/label/index.js';
import { Checkbox } from '$lib/components/ui/checkbox/index.js';
import { mode } from 'mode-watcher';


	// Theme-aware chart options with time scale configuration
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
			rightOffset: 12,
			barSpacing: 8,
			fixLeftEdge: false,
			lockVisibleTimeRangeOnResize: true,
			rightBarStaysOnScroll: true,
			borderVisible: true,
			borderColor: mode.current === 'dark' ? '#374151' : '#D1D4DC',
			visible: true,
			timeVisible: true,
			secondsVisible: false
		}
	});

	// Generate data using library functions
	const priceData = generateOHLCData({ days: 365, startPrice: 100 });
	const volumeData = generateVolumeData({ days: 365, baseVolume: 50000 });
	// Convert OHLC data to LineData for moving average calculation
	const priceLineData: LineData[] = priceData.map(item => ({ time: item.time, value: item.close }));
	const ma20Data = generateMovingAverageData(priceLineData, 20);

	// Chart reference
	let chart: Chart;

	// Time scale state
	let barSpacing = $state(8);
	let rightOffset = $state(12);
	let timeVisible = $state(true);
	let secondsVisible = $state(false);

	// Time scale controls
	function updateBarSpacing(value: number[]) {
		barSpacing = value[0];
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().applyOptions({ barSpacing });
		}
	}

	function updateRightOffset(value: number[]) {
		rightOffset = value[0];
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().applyOptions({ rightOffset });
		}
	}

	function updateTimeVisible(checked: boolean) {
		timeVisible = checked;
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().applyOptions({ timeVisible });
		}
	}

	function updateSecondsVisible(checked: boolean) {
		secondsVisible = checked;
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().applyOptions({ secondsVisible });
		}
	}

	// Reactive statements to update chart when state changes
	$effect(() => {
		if (chart) {
			updateTimeVisible(timeVisible);
		}
	});

	$effect(() => {
		if (chart) {
			updateSecondsVisible(secondsVisible);
		}
	});

	function fitContent() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().fitContent();
		}
	}

	function scrollToPosition(position: 'start' | 'middle' | 'end') {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			const timeScale = chartInstance.timeScale();
			const visibleRange = timeScale.getVisibleLogicalRange();
			
			if (visibleRange) {
				const rangeSize = visibleRange.to - visibleRange.from;
				let newFrom: number, newTo: number;
				
				switch (position) {
					case 'start':
						newFrom = 0;
						newTo = rangeSize;
						break;
					case 'middle':
						const middle = (priceData.length - 1) / 2;
						newFrom = middle - rangeSize / 2;
						newTo = middle + rangeSize / 2;
						break;
					case 'end':
						newFrom = priceData.length - 1 - rangeSize;
						newTo = priceData.length - 1;
						break;
				}
				
				timeScale.setVisibleLogicalRange({ from: newFrom, to: newTo });
			}
		}
	}

	function setVisibleTimeRange(days: number) {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			const timeScale = chartInstance.timeScale();
			const endTime = priceData[priceData.length - 1].time as number;
			const startTime = endTime - (days * 86400);
			
			timeScale.setVisibleRange({
				from: startTime as UTCTimestamp,
				to: endTime as UTCTimestamp
			});
		}
	}

	function zoomTo(factor: number) {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			const timeScale = chartInstance.timeScale();
			const visibleRange = timeScale.getVisibleLogicalRange();
			
			if (visibleRange) {
				const center = (visibleRange.from + visibleRange.to) / 2;
				const newRangeSize = (visibleRange.to - visibleRange.from) * factor;
				
				timeScale.setVisibleLogicalRange({
					from: center - newRangeSize / 2,
					to: center + newRangeSize / 2
				});
			}
		}
	}

	function resetTimeScale() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().resetTimeScale();
		}
	}

	function scrollToRealTime() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().scrollToRealTime();
		}
	}
</script>

<svelte:head>
	<title>Time Scale Examples - Svelte Lightweight Charts</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-2">Time Scale Examples</h1>
	<p class="mb-6">
		This example demonstrates time scale management including navigation, zooming, spacing controls, 
		and various time-related configuration options.
	</p>

	<Card class="mb-6">
		<CardContent class="p-6">
			<Chart 
				bind:this={chart} 
				width={900} 
				height={600} 
				options={chartOptions} 
				class="border border-border rounded mb-4"
			>
			<!-- Price data in main pane -->
			<CandlestickSeries 
				data={priceData}
				upColor="#26a69a"
				downColor="#ef5350"
				borderVisible={false}
				wickUpColor="#26a69a"
				wickDownColor="#ef5350"
				title="Price (OHLC)"
				paneIndex={0}
			/>
			
			<!-- Moving average overlay -->
			<LineSeries 
				data={ma20Data}
				color="#2962FF"
				lineWidth={2}
				title="MA(20)"
				paneIndex={0}
			/>
			
			<!-- Volume in separate pane -->
			<HistogramSeries 
				data={volumeData}
				title="Volume"
				paneIndex={1}
			/>
			</Chart>
		</CardContent>
	</Card>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
		<!-- Spacing and Offset Controls -->
		<Card>
			<CardHeader>
				<CardTitle>Spacing & Offset</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-4">
					<div>
						<Label for="bar-spacing" class="text-sm font-medium mb-2 block">
							Bar Spacing: {barSpacing}px
						</Label>
						<input
							id="bar-spacing"
							type="range"
							min="1"
							max="20"
							step="1"
							value={barSpacing}
							oninput={(e: Event) => updateBarSpacing([parseInt((e.target as HTMLInputElement).value)])}
							class="w-full"
						/>
					</div>
					<div>
						<Label for="right-offset" class="text-sm font-medium mb-2 block">
							Right Offset: {rightOffset}
						</Label>
						<input
							id="right-offset"
							type="range"
							min="0"
							max="50"
							step="1"
							value={rightOffset}
							oninput={(e: Event) => updateRightOffset([parseInt((e.target as HTMLInputElement).value)])}
							class="w-full"
						/>
					</div>
					<div class="space-y-3">
						<div class="flex items-center space-x-2">
							<Checkbox
							id="time-visible"
							checked={timeVisible}
							onCheckedChange={(checked) => updateTimeVisible(checked)}
						/>
							<Label for="time-visible">Show Time</Label>
						</div>
						<div class="flex items-center space-x-2">
							<Checkbox
							id="seconds-visible"
							checked={secondsVisible}
							onCheckedChange={(checked) => updateSecondsVisible(checked)}
						/>
							<Label for="seconds-visible">Show Seconds</Label>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>

		<!-- Navigation Controls -->
		<Card>
			<CardHeader>
				<CardTitle>Navigation</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-2">
					<Button
						variant="default"
						size="sm"
						class="w-full"
						onclick={() => scrollToPosition('start')}
					>
						Go to Start
					</Button>
					<Button
						variant="secondary"
						size="sm"
						class="w-full"
						onclick={() => scrollToPosition('middle')}
					>
						Go to Middle
					</Button>
					<Button
						variant="outline"
						size="sm"
						class="w-full"
						onclick={() => scrollToPosition('end')}
					>
						Go to End
					</Button>
					<Button
						variant="outline"
						size="sm"
						class="w-full"
						onclick={scrollToRealTime}
					>
						Scroll to Real Time
					</Button>
				</div>
			</CardContent>
		</Card>

		<!-- Zoom Controls -->
		<Card>
			<CardHeader>
				<CardTitle>Zoom Controls</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-2">
					<Button
						variant="default"
						size="sm"
						class="w-full"
						onclick={() => zoomTo(0.5)}
					>
						Zoom In (2x)
					</Button>
					<Button
						variant="default"
						size="sm"
						class="w-full"
						onclick={() => zoomTo(2)}
					>
						Zoom Out (0.5x)
					</Button>
					<Button
						variant="secondary"
						size="sm"
						class="w-full"
						onclick={fitContent}
					>
						Fit All Content
					</Button>
					<Button
						variant="outline"
						size="sm"
						class="w-full"
						onclick={resetTimeScale}
					>
						Reset Time Scale
					</Button>
				</div>
			</CardContent>
		</Card>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
		<!-- Time Range Controls -->
		<Card>
			<CardHeader>
				<CardTitle>Visible Time Range</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="grid grid-cols-2 gap-2">
					<Button
						variant="secondary"
						size="sm"
						onclick={() => setVisibleTimeRange(7)}
					>
						Last 7 Days
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onclick={() => setVisibleTimeRange(30)}
					>
						Last 30 Days
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onclick={() => setVisibleTimeRange(60)}
					>
						Last 60 Days
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onclick={() => setVisibleTimeRange(90)}
					>
						Last 90 Days
					</Button>
				</div>
			</CardContent>
		</Card>

		<!-- Time Scale Info -->
		<Card>
			<CardHeader>
				<CardTitle>Time Scale Info</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="text-muted-foreground">Data Points:</span>
						<span class="font-mono">{priceData.length}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-muted-foreground">Bar Spacing:</span>
						<span class="font-mono">{barSpacing}px</span>
					</div>
					<div class="flex justify-between">
						<span class="text-muted-foreground">Right Offset:</span>
						<span class="font-mono">{rightOffset}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-muted-foreground">Time Visible:</span>
						<span class="font-mono">{timeVisible ? 'Yes' : 'No'}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>

	<Alert>
		<AlertDescription>
			<h3 class="font-medium mb-2">About Time Scale</h3>
			<ul class="text-sm space-y-1">
				<li>• <strong>Bar Spacing:</strong> Controls horizontal spacing between data points</li>
				<li>• <strong>Right Offset:</strong> Adds margin on the right side for future data</li>
				<li>• <strong>Visible Range:</strong> Can be set by time values or logical indices</li>
				<li>• <strong>Navigation:</strong> Programmatically scroll to different chart positions</li>
				<li>• <strong>Zoom:</strong> Dynamically adjust the visible data range</li>
				<li>• <strong>Real Time:</strong> Scroll to the latest data point automatically</li>
				<li>• <strong>Fit Content:</strong> Automatically adjust to show all data</li>
			</ul>
		</AlertDescription>
	</Alert>
</div>