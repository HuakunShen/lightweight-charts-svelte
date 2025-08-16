<script lang="ts">
	import { browser } from '$app/environment';
	import { createChart, HistogramSeries, BarSeries } from 'lightweight-charts';
	import * as ltcharts from 'lightweight-charts';
	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	onMount(() => {
		const chartOptions = {
			layout: { textColor: 'white', background: { type: 'solid', color: 'black' } }
		};
		const chart = createChart(container, chartOptions);
		const histogramSeries = chart.addSeries(HistogramSeries, { color: '#26a69a' });

		const data = [
			{ value: 1, time: 1642425322 },
			{ value: 8, time: 1642511722 },
			{ value: 10, time: 1642598122 },
			{ value: 20, time: 1642684522 },
			{ value: 3, time: 1642770922, color: 'red' },
			{ value: 43, time: 1642857322 },
			{ value: 41, time: 1642943722, color: 'red' },
			{ value: 43, time: 1643030122 },
			{ value: 56, time: 1643116522 },
			{ value: 46, time: 1643202922, color: 'red' }
		];

		histogramSeries.setData(data);

		chart.timeScale().fitContent();
	});
</script>

<div id="container" bind:this={container} class="h-96 w-full"></div>
