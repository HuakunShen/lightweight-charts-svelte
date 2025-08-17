<script lang="ts">
	import { Chart, AreaSeries, CandlestickSeries, ColorType } from '../lib/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

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
	<meta
		name="description"
		content="Modern Svelte component library for TradingView Lightweight Charts v5"
	/>
</svelte:head>

<div class="container mx-auto px-6 py-8">
	<!-- Hero Section -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold md:text-5xl">Svelte Lightweight Charts</h1>
		<p class="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
			A modern, type-safe Svelte component library for TradingView's Lightweight Charts v5. Build
			beautiful, interactive financial charts with declarative components.
		</p>
		<div class="flex justify-center space-x-2">
			<Badge variant="secondary">Svelte 5</Badge>
			<Badge variant="secondary">TypeScript</Badge>
			<Badge variant="secondary">Lightweight Charts v5</Badge>
		</div>
	</div>

	<!-- Main Demo Chart -->
	<Card class="mb-8">
		<CardHeader>
			<CardTitle>Combined Chart Example</CardTitle>
			<CardDescription>
				This example demonstrates combining multiple series types in a single chart - an area series
				for background data and candlestick series for price action.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<Chart
				bind:this={chart}
				width={900}
				height={500}
				options={chartOptions}
				class="mb-4 rounded border"
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

			<Button onclick={() => chart?.timeScale()?.fitContent()}>
				Fit Content
			</Button>
		</CardContent>
	</Card>

	<!-- Features Grid -->
	<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		<Card>
			<CardContent class="pt-6">
				<div class="mb-3 text-2xl">🎯</div>
				<CardTitle class="mb-2">Type-Safe</CardTitle>
				<CardDescription>
					Built with TypeScript, providing full type safety and excellent developer experience with
					autocomplete and error checking.
				</CardDescription>
			</CardContent>
		</Card>

		<Card>
			<CardContent class="pt-6">
				<div class="mb-3 text-2xl">⚡</div>
				<CardTitle class="mb-2">Reactive</CardTitle>
				<CardDescription>
					Leverages Svelte 5's reactivity system for automatic updates when your data changes, with
					efficient re-rendering.
				</CardDescription>
			</CardContent>
		</Card>

		<Card>
			<CardContent class="pt-6">
				<div class="mb-3 text-2xl">🧩</div>
				<CardTitle class="mb-2">Declarative</CardTitle>
				<CardDescription>
					Simple, declarative component API that feels natural to Svelte developers while exposing the
					full power of Lightweight Charts.
				</CardDescription>
			</CardContent>
		</Card>

		<Card>
			<CardContent class="pt-6">
				<div class="mb-3 text-2xl">📊</div>
				<CardTitle class="mb-2">All Series Types</CardTitle>
				<CardDescription>
					Supports all chart types: Line, Area, Bar, Candlestick, Histogram, and Baseline series with
					full customization.
				</CardDescription>
			</CardContent>
		</Card>

		<Card>
			<CardContent class="pt-6">
				<div class="mb-3 text-2xl">🔲</div>
				<CardTitle class="mb-2">Multiple Panes</CardTitle>
				<CardDescription>
					Create charts with multiple panes to separate different data types like price, volume, and
					technical indicators.
				</CardDescription>
			</CardContent>
		</Card>

		<Card>
			<CardContent class="pt-6">
				<div class="mb-3 text-2xl">🎨</div>
				<CardTitle class="mb-2">Customizable</CardTitle>
				<CardDescription>
					Extensive styling options and theme support to match your application's design with custom
					colors and layouts.
				</CardDescription>
			</CardContent>
		</Card>
	</div>

	<!-- Quick Start Code Example -->
	<Card class="bg-gray-900 text-white">
		<CardHeader>
			<CardTitle class="text-white">Quick Start</CardTitle>
		</CardHeader>
		<CardContent>
			<pre class="overflow-x-auto text-sm"><code
					>&lt;script&gt;
  import &#123; Chart, LineSeries &#125; from 'svelte-lightweight-charts';
  
  const data = [
    &#123; time: '2023-01-01', value: 100 &#125;,
    &#123; time: '2023-01-02', value: 105 &#125;,
    &#123; time: '2023-01-03', value: 98 &#125;
  ];
&lt;/script&gt;

&lt;Chart width=&#123;800&#125; height=&#123;400&#125;&gt;
  &lt;LineSeries &#123;data&#125; color="#2962FF" title="Price" /&gt;
&lt;/Chart&gt;</code
				></pre>
		</CardContent>
	</Card>
</div>
