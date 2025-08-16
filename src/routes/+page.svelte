<script lang="ts">
	import { Chart, AreaSeries, CandlestickSeries, ColorType } from '../lib/index.js';

	// Chart options
	const chartOptions = {
		layout: { textColor: 'white', background: { type: ColorType.Solid, color: 'black' } }
	};

	// Area series data
	const areaData = [
		{ time: '2018-12-22', value: 32.51 },
		{ time: '2018-12-23', value: 31.11 },
		{ time: '2018-12-24', value: 27.02 },
		{ time: '2018-12-25', value: 27.32 },
		{ time: '2018-12-26', value: 25.17 },
		{ time: '2018-12-27', value: 28.89 },
		{ time: '2018-12-28', value: 25.46 },
		{ time: '2018-12-29', value: 23.92 },
		{ time: '2018-12-30', value: 22.68 },
		{ time: '2018-12-31', value: 22.67 }
	];

	// Candlestick series data
	const candlestickData = [
		{ time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
		{ time: '2018-12-23', open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
		{ time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
		{ time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
		{ time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
		{ time: '2018-12-27', open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
		{ time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
		{ time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
		{ time: '2018-12-30', open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
		{ time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 }
	];

	// Chart reference for manual control
	let chart: Chart;
</script>

<svelte:head>
	<title>Svelte Lightweight Charts - Demo</title>
	<meta name="description" content="Modern Svelte component library for TradingView Lightweight Charts v5">
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- Hero Section -->
	<div class="text-center mb-12">
		<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
			Svelte Lightweight Charts
		</h1>
		<p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
			A modern, type-safe Svelte component library for TradingView's Lightweight Charts v5. 
			Build beautiful, interactive financial charts with declarative components.
		</p>
		<div class="flex justify-center space-x-4">
			<span class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Svelte 5</span>
			<span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">TypeScript</span>
			<span class="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Lightweight Charts v5</span>
		</div>
	</div>

	<!-- Main Demo Chart -->
	<div class="bg-white rounded-lg shadow-lg p-6 mb-8">
		<h2 class="text-2xl font-semibold text-gray-800 mb-4">Combined Chart Example</h2>
		<p class="text-gray-600 mb-6">
			This example demonstrates combining multiple series types in a single chart - an area series for background data 
			and candlestick series for price action.
		</p>
		
		<Chart 
			bind:this={chart} 
			width={900} 
			height={500} 
			options={chartOptions} 
			class="border border-gray-200 rounded mb-4"
		>
			<AreaSeries
				data={areaData}
				lineColor="#2962FF"
				topColor="#2962FF"
				bottomColor="rgba(41, 98, 255, 0.28)"
				title="Area Series"
			/>
			<CandlestickSeries
				data={candlestickData}
				upColor="#26a69a"
				downColor="#ef5350"
				borderVisible={false}
				wickUpColor="#26a69a"
				wickDownColor="#ef5350"
				title="Candlestick Series"
			/>
		</Chart>

		<button
			class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
			on:click={() => chart?.timeScale()?.fitContent()}
		>
			Fit Content
		</button>
	</div>

	<!-- Features Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
		<div class="bg-white rounded-lg shadow p-6">
			<div class="text-2xl mb-3">🎯</div>
			<h3 class="text-lg font-semibold text-gray-800 mb-2">Type-Safe</h3>
			<p class="text-gray-600 text-sm">
				Built with TypeScript, providing full type safety and excellent developer experience with autocomplete and error checking.
			</p>
		</div>
		
		<div class="bg-white rounded-lg shadow p-6">
			<div class="text-2xl mb-3">⚡</div>
			<h3 class="text-lg font-semibold text-gray-800 mb-2">Reactive</h3>
			<p class="text-gray-600 text-sm">
				Leverages Svelte 5's reactivity system for automatic updates when your data changes, with efficient re-rendering.
			</p>
		</div>
		
		<div class="bg-white rounded-lg shadow p-6">
			<div class="text-2xl mb-3">🧩</div>
			<h3 class="text-lg font-semibold text-gray-800 mb-2">Declarative</h3>
			<p class="text-gray-600 text-sm">
				Simple, declarative component API that feels natural to Svelte developers while exposing the full power of Lightweight Charts.
			</p>
		</div>
		
		<div class="bg-white rounded-lg shadow p-6">
			<div class="text-2xl mb-3">📊</div>
			<h3 class="text-lg font-semibold text-gray-800 mb-2">All Series Types</h3>
			<p class="text-gray-600 text-sm">
				Supports all chart types: Line, Area, Bar, Candlestick, Histogram, and Baseline series with full customization.
			</p>
		</div>
		
		<div class="bg-white rounded-lg shadow p-6">
			<div class="text-2xl mb-3">🔲</div>
			<h3 class="text-lg font-semibold text-gray-800 mb-2">Multiple Panes</h3>
			<p class="text-gray-600 text-sm">
				Create charts with multiple panes to separate different data types like price, volume, and technical indicators.
			</p>
		</div>
		
		<div class="bg-white rounded-lg shadow p-6">
			<div class="text-2xl mb-3">🎨</div>
			<h3 class="text-lg font-semibold text-gray-800 mb-2">Customizable</h3>
			<p class="text-gray-600 text-sm">
				Extensive styling options and theme support to match your application's design with custom colors and layouts.
			</p>
		</div>
	</div>

	<!-- Quick Start Code Example -->
	<div class="bg-gray-900 text-white rounded-lg p-6">
		<h3 class="text-xl font-semibold mb-4">Quick Start</h3>
		<pre class="text-sm overflow-x-auto"><code>&lt;script&gt;
  import &#123; Chart, LineSeries &#125; from 'svelte-lightweight-charts';
  
  const data = [
    &#123; time: '2023-01-01', value: 100 &#125;,
    &#123; time: '2023-01-02', value: 105 &#125;,
    &#123; time: '2023-01-03', value: 98 &#125;
  ];
&lt;/script&gt;

&lt;Chart width=&#123;800&#125; height=&#123;400&#125;&gt;
  &lt;LineSeries &#123;data&#125; color="#2962FF" title="Price" /&gt;
&lt;/Chart&gt;</code></pre>
	</div>
</div>
