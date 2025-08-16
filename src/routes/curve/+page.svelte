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

<Chart
	bind:this={chart}
	width={800}
	height={400}
	options={chartOptions}
	yieldCurve={true}
	class="w-full"
>
	<LineSeries data={curveData} color="#2962FF" title="Yield Curve" />
</Chart>

<div class="mt-4 space-x-2">
	<button
		class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		on:click={() => chart?.timeScale()?.fitContent()}
	>
		Fit Content
	</button>
</div>
