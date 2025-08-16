<script lang="ts">
	import { Chart, HistogramSeries, type ChartOptions, type DeepPartial, ColorType, type UTCTimestamp } from '../../lib/index.js';

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

<Chart bind:this={chart} width={800} height={400} options={chartOptions} class="w-full">
	<HistogramSeries data={histogramData} color="#26a69a" title="Volume Histogram" />
</Chart>

<div class="mt-4 space-x-2">
	<button
		class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		on:click={() => chart?.timeScale()?.fitContent()}
	>
		Fit Content
	</button>
</div>
