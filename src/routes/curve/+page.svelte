<script lang="ts">
	import { browser } from '$app/environment';
	import { createYieldCurveChart, LineSeries } from 'lightweight-charts';
	import * as ltcharts from 'lightweight-charts';
	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	onMount(() => {
		const chartOptions = {
			layout: { textColor: 'white', background: { type: 'solid', color: 'black' } },
			yieldCurve: { baseResolution: 1, minimumTimeRange: 10, startTimeRange: 3 },
			handleScroll: false,
			handleScale: false
		};

		const chart = createYieldCurveChart(container, chartOptions);
		const lineSeries = chart.addSeries(LineSeries, { color: '#2962FF' });

		const curve = [
			{ time: 1, value: 5.378 },
			{ time: 2, value: 5.372 },
			{ time: 3, value: 5.271 },
			{ time: 6, value: 5.094 },
			{ time: 12, value: 4.739 },
			{ time: 24, value: 4.237 },
			{ time: 36, value: 4.036 },
			{ time: 60, value: 3.887 },
			{ time: 84, value: 3.921 },
			{ time: 120, value: 4.007 },
			{ time: 240, value: 4.366 },
			{ time: 360, value: 4.29 }
		];

		lineSeries.setData(curve);

		chart.timeScale().fitContent();
	});
</script>

<div id="container" bind:this={container} class="h-96 w-full"></div>
