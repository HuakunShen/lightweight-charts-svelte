<script lang="ts">
	import { Chart, CandlestickSeries, HistogramSeries, LineSeries, ColorType, type UTCTimestamp, type CandlestickData, type HistogramData, type LineData } from '../../lib/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';

	// Chart options
	const chartOptions = {
		layout: { 
			textColor: 'white', 
			background: { type: ColorType.Solid, color: 'black' },
			panes: {
				separatorColor: '#2962FF',
				separatorHoverColor: '#1976D2'
			}
		}
	};

	// Price data for main pane (pane 0)
	const priceData: CandlestickData[] = [
		{ time: 1642427876 as UTCTimestamp, open: 100, high: 108, low: 96, close: 103 },
		{ time: 1642514276 as UTCTimestamp, open: 103, high: 110, low: 98, close: 107 },
		{ time: 1642600676 as UTCTimestamp, open: 107, high: 112, low: 105, close: 108 },
		{ time: 1642687076 as UTCTimestamp, open: 108, high: 115, low: 103, close: 112 },
		{ time: 1642773476 as UTCTimestamp, open: 112, high: 118, low: 109, close: 115 },
		{ time: 1642859876 as UTCTimestamp, open: 115, high: 120, low: 112, close: 117 },
		{ time: 1642946276 as UTCTimestamp, open: 117, high: 125, low: 115, close: 122 },
		{ time: 1643032676 as UTCTimestamp, open: 122, high: 127, low: 119, close: 124 },
		{ time: 1643119076 as UTCTimestamp, open: 124, high: 130, low: 121, close: 128 },
		{ time: 1643205476 as UTCTimestamp, open: 128, high: 133, low: 125, close: 131 }
	];

	// Volume data for second pane (pane 1)
	const volumeData: HistogramData[] = [
		{ time: 1642427876 as UTCTimestamp, value: 50000, color: '#26a69a' },
		{ time: 1642514276 as UTCTimestamp, value: 75000, color: '#26a69a' },
		{ time: 1642600676 as UTCTimestamp, value: 42000, color: '#ef5350' },
		{ time: 1642687076 as UTCTimestamp, value: 68000, color: '#26a69a' },
		{ time: 1642773476 as UTCTimestamp, value: 89000, color: '#26a69a' },
		{ time: 1642859876 as UTCTimestamp, value: 55000, color: '#26a69a' },
		{ time: 1642946276 as UTCTimestamp, value: 93000, color: '#26a69a' },
		{ time: 1643032676 as UTCTimestamp, value: 71000, color: '#26a69a' },
		{ time: 1643119076 as UTCTimestamp, value: 84000, color: '#26a69a' },
		{ time: 1643205476 as UTCTimestamp, value: 67000, color: '#26a69a' }
	];

	// RSI data for third pane (pane 2)
	const rsiData: LineData[] = [
		{ time: 1642427876 as UTCTimestamp, value: 55 },
		{ time: 1642514276 as UTCTimestamp, value: 62 },
		{ time: 1642600676 as UTCTimestamp, value: 48 },
		{ time: 1642687076 as UTCTimestamp, value: 71 },
		{ time: 1642773476 as UTCTimestamp, value: 78 },
		{ time: 1642859876 as UTCTimestamp, value: 65 },
		{ time: 1642946276 as UTCTimestamp, value: 82 },
		{ time: 1643032676 as UTCTimestamp, value: 73 },
		{ time: 1643119076 as UTCTimestamp, value: 85 },
		{ time: 1643205476 as UTCTimestamp, value: 79 }
	];

	// Chart reference for manual control
	let chart: Chart;

	// Demo state
	let currentPanes = 3;
	let volumeSeriesRef: HistogramSeries;
	let rsiSeriesRef: LineSeries;

	function addNewPane() {
		if (chart) {
			const newPane = chart.addPane();
			if (newPane) {
				currentPanes = chart.panes().length;
			}
		}
	}

	function removeLastPane() {
		if (chart && currentPanes > 1) {
			chart.removePane(currentPanes - 1);
			currentPanes = chart.panes().length;
		}
	}

	function moveVolumeToPane(paneIndex: number) {
		if (volumeSeriesRef) {
			const series = volumeSeriesRef.getSeries();
			if (series) {
				series.moveToPane(paneIndex);
			}
		}
	}

	function moveRsiToPane(paneIndex: number) {
		if (rsiSeriesRef) {
			const series = rsiSeriesRef.getSeries();
			if (series) {
				series.moveToPane(paneIndex);
			}
		}
	}
</script>

<svelte:head>
	<title>Panes Example - Svelte Lightweight Charts</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-2">Multiple Panes Example</h1>
	<p class="mb-6">
		This example demonstrates how to use multiple panes to display different types of data separately.
		Price data is in the main pane, volume in the second pane, and RSI in the third pane.
	</p>

	<Card class="mb-6">
		<CardContent class="p-6">
			<Chart 
				bind:this={chart} 
				width={900} 
				height={600} 
				options={chartOptions} 
				class="border border-gray-200 rounded"
			>
			<!-- Main price chart in pane 0 -->
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
			
			<!-- Volume chart in pane 1 -->
			<HistogramSeries 
				bind:this={volumeSeriesRef}
				data={volumeData}
				title="Volume"
				paneIndex={1}
			/>
			
			<!-- RSI chart in pane 2 -->
			<LineSeries 
				bind:this={rsiSeriesRef}
				data={rsiData}
				color="#ff6b6b"
				lineWidth={2}
				title="RSI"
				paneIndex={2}
			/>
			</Chart>
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Pane Controls</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="space-y-4">
				<div class="flex flex-wrap gap-2">
					<Button
						variant="default"
						onclick={addNewPane}
					>
						Add New Pane
					</Button>
					<Button
						variant="destructive"
						onclick={removeLastPane}
						disabled={currentPanes <= 1}
					>
						Remove Last Pane
					</Button>
					<Button
						variant="outline"
						onclick={() => chart?.timeScale()?.fitContent()}
					>
						Fit Content
					</Button>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card>
						<CardHeader>
							<CardTitle class="text-base">Move Volume Series</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-x-2">
								<Button
									variant="secondary"
									size="sm"
									onclick={() => moveVolumeToPane(0)}
								>
									To Pane 0
								</Button>
								<Button
									variant="secondary"
									size="sm"
									onclick={() => moveVolumeToPane(1)}
								>
									To Pane 1
								</Button>
								<Button
									variant="secondary"
									size="sm"
									onclick={() => moveVolumeToPane(2)}
								>
									To Pane 2
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle class="text-base">Move RSI Series</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="space-x-2">
								<Button
									variant="outline"
									size="sm"
									onclick={() => moveRsiToPane(0)}
								>
									To Pane 0
								</Button>
								<Button
									variant="outline"
									size="sm"
									onclick={() => moveRsiToPane(1)}
								>
									To Pane 1
								</Button>
								<Button
									variant="outline"
									size="sm"
									onclick={() => moveRsiToPane(2)}
								>
									To Pane 2
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle class="text-base">Current Chart Info</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground">
							Total panes: <span class="font-mono bg-muted px-1 rounded">{currentPanes}</span>
						</p>
					</CardContent>
				</Card>
			</div>
		</CardContent>
	</Card>

	<Alert class="mt-6">
		<AlertDescription>
			<h3 class="font-medium mb-2">About Panes</h3>
			<ul class="text-sm space-y-1">
				<li>• Panes allow you to separate different types of data visually</li>
				<li>• Each pane can have its own price scale and formatting</li>
				<li>• Series can be moved between panes dynamically</li>
				<li>• Panes can be resized by dragging the separator between them</li>
				<li>• You can customize separator colors and disable resizing if needed</li>
			</ul>
		</AlertDescription>
	</Alert>
</div>