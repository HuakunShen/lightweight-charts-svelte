<script lang="ts">
	import { BarSeries, ColorType, createChart, type ChartOptions } from 'lightweight-charts';
	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	onMount(() => {
		const chartOptions: ChartOptions = {
			layout: { textColor: 'white', background: { type: ColorType.Solid, color: 'black' } }
		};
		const chart = createChart(container, chartOptions);
		const barSeries = chart.addSeries(BarSeries, { upColor: '#26a69a', downColor: '#ef5350' });

		const data = [
			{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
			{ open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
			{ open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
			{ open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
			{ open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
			{ open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
			{ open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
			{ open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
			{ open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
			{ open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
			{ open: 10.96, high: 11.9, low: 10.8, close: 11.5, time: 1643291876 },
			{ open: 11.5, high: 12.0, low: 11.3, close: 11.8, time: 1643378276 },
			{ open: 11.8, high: 12.2, low: 11.7, close: 12.0, time: 1643464676 },
			{ open: 12.0, high: 12.5, low: 11.9, close: 12.3, time: 1643551076 },
			{ open: 12.3, high: 12.8, low: 12.1, close: 12.6, time: 1643637476 },
			{ open: 12.6, high: 13.0, low: 12.5, close: 12.9, time: 1643723876 },
			{ open: 12.9, high: 13.5, low: 12.7, close: 13.2, time: 1643810276 },
			{ open: 13.2, high: 13.7, low: 13.0, close: 13.5, time: 1643896676 },
			{ open: 13.5, high: 14.0, low: 13.3, close: 13.8, time: 1643983076 },
			{ open: 13.8, high: 14.2, low: 13.6, close: 14.0, time: 1644069476 }
		];

		barSeries.setData(data);

		chart.timeScale().fitContent();
	});
</script>

<div bind:this={container}></div>
