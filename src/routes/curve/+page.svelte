<script lang="ts">
	import { Chart, LineSeries, ColorType, type UTCTimestamp } from '../../lib/index.js';

	// Chart options for yield curve
	const chartOptions = {
		layout: { textColor: 'white', background: { type: ColorType.Solid, color: 'black' } },
		yieldCurve: { baseResolution: 1, minimumTimeRange: 10, startTimeRange: 3 },
		handleScroll: false,
		handleScale: false
	};

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
	<h1 class="text-3xl font-bold text-gray-800 mb-2">Yield Curve Chart Example</h1>
	<p class="text-gray-600 mb-6">
		Yield curve charts show the relationship between interest rates and different time periods.
		This example demonstrates a special chart type for financial yield curve visualization.
	</p>

	<div class="bg-white rounded-lg shadow-lg p-6 mb-6">
		<Chart
			bind:this={chart}
			width={900}
			height={500}
			options={chartOptions}
			yieldCurve={true}
			class="border border-gray-200 rounded mb-4"
		>
			<LineSeries data={curveData} color="#2962FF" title="Yield Curve" />
		</Chart>

		<div class="flex flex-wrap gap-2">
			<button
				class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
				on:click={() => chart?.timeScale()?.fitContent()}
			>
				Fit Content
			</button>
			<button
				class="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition-colors"
				on:click={() => chart?.priceScale()?.applyOptions({ autoScale: true })}
			>
				Auto Scale
			</button>
		</div>
	</div>

	<div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
		<h3 class="font-medium text-purple-800 mb-2">About Yield Curves</h3>
		<ul class="text-sm text-purple-700 space-y-1">
			<li>• Shows interest rates across different maturity periods</li>
			<li>• X-axis represents time to maturity (months)</li>
			<li>• Y-axis represents yield/interest rate percentage</li>
			<li>• Normal curve slopes upward (longer terms = higher yields)</li>
			<li>• Inverted curves can signal economic conditions</li>
			<li>• Uses specialized chart configuration for yield data</li>
		</ul>
	</div>
</div>
