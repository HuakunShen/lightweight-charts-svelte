<script lang="ts">
	import { Chart, AreaSeries, CandlestickSeries, ColorType } from '../lib/index.js';
	import { generateAreaData, generateOHLCData } from '../lib/data-generators.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { mode } from 'mode-watcher';

	// Theme-aware chart options
	const chartOptions = $derived({
		layout: { 
			textColor: mode.current === 'dark' ? 'white' : 'black', 
			background: { 
				type: ColorType.Solid, 
				color: mode.current === 'dark' ? '#0a0a0a' : 'white' 
			} 
		},
		grid: {
			horzLines: {
				color: mode.current === 'dark' ? '#1f2937' : '#F0F3FA',
			},
			vertLines: {
				color: mode.current === 'dark' ? '#1f2937' : '#F0F3FA',
			},
		},
		rightPriceScale: {
			borderColor: mode.current === 'dark' ? '#374151' : '#D1D4DC',
		},
		timeScale: {
			borderColor: mode.current === 'dark' ? '#374151' : '#D1D4DC',
		},
	});

	// Generate chart data using library functions
	const areaData = generateAreaData({ days: 365, startPrice: 30 });
	const candlestickData = generateOHLCData({ days: 365, startPrice: 100 });

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
				class="border border-border rounded mb-4"
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
