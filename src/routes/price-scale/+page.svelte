<script lang="ts">
	import { Chart, LineSeries, AreaSeries, HistogramSeries, ColorType, type UTCTimestamp, type LineData, type AreaData, type HistogramData } from '../../lib/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	// Chart options
	const chartOptions = {
		layout: { 
			textColor: 'white', 
			background: { type: ColorType.Solid, color: 'black' } 
		},
		leftPriceScale: {
			visible: true,
			borderColor: '#485c7b'
		},
		rightPriceScale: {
			visible: true,
			borderColor: '#485c7b'
		},
		overlayPriceScales: {
			scaleMargins: {
				top: 0.1,
				bottom: 0.1,
			}
		}
	};

	// Price data for main series (right scale)
	const priceData: LineData[] = [
		{ time: 1642427876 as UTCTimestamp, value: 100 },
		{ time: 1642514276 as UTCTimestamp, value: 103 },
		{ time: 1642600676 as UTCTimestamp, value: 107 },
		{ time: 1642687076 as UTCTimestamp, value: 108 },
		{ time: 1642773476 as UTCTimestamp, value: 115 },
		{ time: 1642859876 as UTCTimestamp, value: 117 },
		{ time: 1642946276 as UTCTimestamp, value: 122 },
		{ time: 1643032676 as UTCTimestamp, value: 124 },
		{ time: 1643119076 as UTCTimestamp, value: 128 },
		{ time: 1643205476 as UTCTimestamp, value: 131 }
	];

	// Volume data for left scale
	const volumeData: HistogramData[] = [
		{ time: 1642427876 as UTCTimestamp, value: 500000, color: '#26a69a' },
		{ time: 1642514276 as UTCTimestamp, value: 750000, color: '#26a69a' },
		{ time: 1642600676 as UTCTimestamp, value: 420000, color: '#ef5350' },
		{ time: 1642687076 as UTCTimestamp, value: 680000, color: '#26a69a' },
		{ time: 1642773476 as UTCTimestamp, value: 890000, color: '#26a69a' },
		{ time: 1642859876 as UTCTimestamp, value: 550000, color: '#26a69a' },
		{ time: 1642946276 as UTCTimestamp, value: 930000, color: '#26a69a' },
		{ time: 1643032676 as UTCTimestamp, value: 710000, color: '#ef5350' },
		{ time: 1643119076 as UTCTimestamp, value: 840000, color: '#26a69a' },
		{ time: 1643205476 as UTCTimestamp, value: 670000, color: '#26a69a' }
	];

	// RSI data for overlay scale
	const rsiData: AreaData[] = [
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

	// Chart reference
	let chart: Chart;

	// Series references for scale manipulation
	let priceSeriesRef: LineSeries;
	let volumeSeriesRef: HistogramSeries;
	let rsiSeriesRef: AreaSeries;

	// Scale visibility state
	let leftScaleVisible = $state(true);
	let rightScaleVisible = $state(true);

	// Price scale controls
	function updateLeftScale() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.priceScale('left').applyOptions({ visible: leftScaleVisible });
		}
	}

	function updateRightScale() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.priceScale('right').applyOptions({ visible: rightScaleVisible });
		}
	}

	// Reactive statements to update chart when state changes
	$effect(() => {
		if (chart) {
			updateLeftScale();
		}
	});

	$effect(() => {
		if (chart) {
			updateRightScale();
		}
	});

	function setPriceScaleMode(mode: string) {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.priceScale('right').applyOptions({ mode: mode as any });
		}
	}

	function autoScalePrice() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.priceScale('right').applyOptions({ autoScale: true });
		}
	}

	function setScaleMargins(top: number, bottom: number) {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.priceScale('right').applyOptions({ 
				scaleMargins: { top: top / 100, bottom: bottom / 100 }
			});
		}
	}

	function invertScale() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.priceScale('right').applyOptions({ invertScale: true });
		}
	}

	function resetScale() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.priceScale('right').applyOptions({ 
				mode: 'Normal' as any,
				autoScale: true,
				invertScale: false,
				scaleMargins: { top: 0.1, bottom: 0.1 }
			});
		}
	}
</script>

<svelte:head>
	<title>Price Scale Examples - Svelte Lightweight Charts</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-2">Price Scale Examples</h1>
	<p class="mb-6">
		This example demonstrates price scale management including multiple scales, different modes, 
		and various configuration options for controlling price axis behavior.
	</p>

	<Card class="mb-6">
		<CardContent class="p-6">
			<Chart 
				bind:this={chart} 
				width={900} 
				height={500} 
				options={chartOptions} 
				class="border border-gray-200 rounded mb-4"
			>
			<!-- Price series on right scale -->
			<LineSeries 
				bind:this={priceSeriesRef}
				data={priceData}
				color="#2962FF"
				lineWidth={2}
				title="Price (Right Scale)"
			/>
			
			<!-- Volume on left scale -->
			<HistogramSeries 
				bind:this={volumeSeriesRef}
				data={volumeData}
				color="#26a69a"
				title="Volume (Left Scale)"
				priceScaleId="left"
			/>
			
			<!-- RSI on overlay scale -->
			<AreaSeries 
				bind:this={rsiSeriesRef}
				data={rsiData}
				lineColor="#ff6b6b"
				topColor="rgba(255, 107, 107, 0.2)"
				bottomColor="rgba(255, 107, 107, 0.05)"
				title="RSI (Overlay Scale)"
				priceScaleId="rsi-scale"
			/>
			</Chart>
		</CardContent>
	</Card>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
		<!-- Scale Visibility Controls -->
		<Card>
			<CardHeader>
				<CardTitle>Scale Visibility</CardTitle>
			</CardHeader>
			<CardContent class="space-y-3">
				<div class="flex items-center space-x-2">
					<Checkbox
						id="left-scale"
						bind:checked={leftScaleVisible}
					/>
					<Label for="left-scale">Left Price Scale (Volume)</Label>
				</div>
				<div class="flex items-center space-x-2">
					<Checkbox
						id="right-scale"
						bind:checked={rightScaleVisible}
					/>
					<Label for="right-scale">Right Price Scale (Price)</Label>
				</div>
			</CardContent>
		</Card>

		<!-- Scale Mode Controls -->
		<Card>
			<CardHeader>
				<CardTitle>Price Scale Mode</CardTitle>
			</CardHeader>
			<CardContent class="space-y-2">
				<Button
					class="w-full"
					variant="default"
					onclick={() => setPriceScaleMode('Normal')}
				>
					Normal Scale
				</Button>
				<Button
					class="w-full"
					variant="secondary"
					onclick={() => setPriceScaleMode('Logarithmic')}
				>
					Logarithmic Scale
				</Button>
				<Button
					class="w-full"
					variant="outline"
					onclick={() => setPriceScaleMode('Percentage')}
				>
					Percentage Scale
				</Button>
				<Button
					class="w-full"
					variant="destructive"
					onclick={() => setPriceScaleMode('IndexedTo100')}
				>
					Indexed to 100
				</Button>
			</CardContent>
		</Card>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
		<!-- Scale Margins -->
		<Card>
			<CardHeader>
				<CardTitle>Scale Margins</CardTitle>
			</CardHeader>
			<CardContent class="space-y-3">
				<Button
					class="w-full"
					variant="outline"
					onclick={() => setScaleMargins(5, 5)}
				>
					5% Margins
				</Button>
				<Button
					class="w-full"
					variant="outline"
					onclick={() => setScaleMargins(20, 20)}
				>
					20% Margins
				</Button>
				<Button
					class="w-full"
					variant="outline"
					onclick={() => setScaleMargins(30, 10)}
				>
					30% Top, 10% Bottom
				</Button>
			</CardContent>
		</Card>

		<!-- Scale Actions -->
		<Card>
			<CardHeader>
				<CardTitle>Scale Actions</CardTitle>
			</CardHeader>
			<CardContent class="space-y-3">
				<Button
					class="w-full"
					variant="secondary"
					onclick={autoScalePrice}
				>
					Auto Scale
				</Button>
				<Button
					class="w-full"
					variant="destructive"
					onclick={invertScale}
				>
					Invert Scale
				</Button>
				<Button
					class="w-full"
					variant="outline"
					onclick={resetScale}
				>
					Reset Scale
				</Button>
			</CardContent>
		</Card>

		<!-- General Controls -->
		<Card>
			<CardHeader>
				<CardTitle>General</CardTitle>
			</CardHeader>
			<CardContent class="space-y-3">
				<Button
					class="w-full"
					variant="default"
					onclick={() => chart?.timeScale()?.fitContent()}
				>
					Fit Content
				</Button>
				<Button
					class="w-full"
					variant="secondary"
					onclick={() => chart?.timeScale()?.scrollToRealTime()}
				>
					Scroll to Latest
				</Button>
			</CardContent>
		</Card>
	</div>

	<Alert>
		<AlertDescription>
			<h3 class="font-medium mb-2">About Price Scales</h3>
			<ul class="text-sm space-y-1">
				<li>• <strong>Left/Right Scales:</strong> Default predefined scales for different data types</li>
				<li>• <strong>Overlay Scales:</strong> Custom scales created automatically when using unique priceScaleId</li>
				<li>• <strong>Scale Modes:</strong> Normal, Logarithmic, Percentage, and IndexedTo100 for different analysis needs</li>
				<li>• <strong>Scale Margins:</strong> Control spacing at top/bottom of the scale</li>
				<li>• <strong>Auto Scale:</strong> Automatically adjusts scale to fit visible data</li>
				<li>• <strong>Invert Scale:</strong> Flips the scale direction (useful for certain financial instruments)</li>
			</ul>
		</AlertDescription>
	</Alert>
</div>