<script lang="ts">
	import {
		Chart,
		CandlestickSeries,
		ColorType,
		type CandlestickData,
		type UTCTimestamp
	} from '../../lib/index.js';
	import {
		createSeriesMarkers,
		type SeriesMarker,
		type ISeriesMarkersPluginApi,
		type Time
	} from 'lightweight-charts';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';

	// Chart options
	const chartOptions = {
		layout: { textColor: 'black', background: { type: ColorType.Solid, color: 'white' } },
		width: 900,
		height: 500,
		rightPriceScale: {
			borderColor: '#D1D4DC'
		},
		timeScale: {
			borderColor: '#D1D4DC'
		},
		grid: {
			horzLines: {
				color: '#F0F3FA'
			},
			vertLines: {
				color: '#F0F3FA'
			}
		}
	};

	// Generate extensive random candlestick data (1 year of hourly data)
	function generateRandomData(): CandlestickData[] {
		const startDate = new Date('2023-01-01T00:00:00');
		const endDate = new Date('2024-01-01T00:00:00');
		const oneHour = 60 * 60 * 1000; // milliseconds in an hour
		const totalHours = Math.floor((endDate.getTime() - startDate.getTime()) / oneHour);

		const generatedData: CandlestickData[] = [];
		let currentPrice = 100; // Starting price

		console.log(`Generating ${totalHours} hours of data (${Math.floor(totalHours / 24)} days)`);

		for (let i = 0; i < totalHours; i++) {
			const currentDate = new Date(startDate.getTime() + i * oneHour);
			const timestamp = Math.floor(currentDate.getTime() / 1000) as UTCTimestamp;

			// Generate realistic OHLC data with hourly volatility
			const volatility = 0.003; // 0.3% hourly volatility
			const trend = (Math.random() - 0.5) * 0.0001; // Small random trend

			// Add some daily and weekly patterns
			const hour = currentDate.getHours();
			const dayOfWeek = currentDate.getDay();

			// Higher volatility during market hours (9-16)
			const timeMultiplier = hour >= 9 && hour <= 16 ? 1.5 : 0.8;
			// Lower volatility on weekends
			const dayMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.5 : 1;

			const adjustedVolatility = volatility * timeMultiplier * dayMultiplier;

			const open = currentPrice * (1 + (Math.random() - 0.5) * adjustedVolatility * 0.5);
			const close = open * (1 + trend + (Math.random() - 0.5) * adjustedVolatility);
			const high = Math.max(open, close) * (1 + Math.random() * adjustedVolatility * 0.5);
			const low = Math.min(open, close) * (1 - Math.random() * adjustedVolatility * 0.5);

			generatedData.push({
				time: timestamp,
				open: Number(open.toFixed(2)),
				high: Number(high.toFixed(2)),
				low: Number(low.toFixed(2)),
				close: Number(close.toFixed(2))
			});

			currentPrice = close; // Update current price for next iteration

			// Log progress every 10,000 data points
			if (i > 0 && i % 10000 === 0) {
				console.log(
					`Generated ${i} / ${totalHours} data points (${Math.floor((i / totalHours) * 100)}%)`
				);
			}
		}

		console.log(`Data generation complete: ${generatedData.length} data points`);
		return generatedData;
	}

	const data: CandlestickData[] = generateRandomData();

	// Chart and series references
	let chart: Chart;
	let candlestickSeries: CandlestickSeries;
	let seriesMarkers: ISeriesMarkersPluginApi<Time> | null = null;

	// Marker types for performance testing
	const markerTypes = [
		{
			name: 'Buy Signals',
			color: '#2196F3',
			shape: 'arrowUp' as const,
			position: 'belowBar' as const
		},
		{
			name: 'Sell Signals',
			color: '#e91e63',
			shape: 'arrowDown' as const,
			position: 'aboveBar' as const
		},
		{ name: 'Events', color: '#ff9800', shape: 'circle' as const, position: 'aboveBar' as const },
		{ name: 'Alerts', color: '#9c27b0', shape: 'square' as const, position: 'inBar' as const },
		{ name: 'Warnings', color: '#f44336', shape: 'circle' as const, position: 'belowBar' as const }
	];

	// Track total markers added
	let totalMarkersAdded = $state(0);

	// Function to create initial demo markers
	function createSeriesMarkersData() {
		if (!candlestickSeries) return;

		// Create a few demo markers
		const markers: SeriesMarker<Time>[] = [
			{
				time: data[data.length - 100].time,
				position: 'aboveBar' as const,
				color: '#f68410',
				shape: 'circle' as const,
				text: 'Demo'
			},
			{
				time: data[data.length - 75].time,
				position: 'belowBar' as const,
				color: '#2196F3',
				shape: 'arrowUp' as const,
				text: 'Buy Signal'
			},
			{
				time: data[data.length - 50].time,
				position: 'aboveBar' as const,
				color: '#e91e63',
				shape: 'arrowDown' as const,
				text: 'Sell Signal'
			}
		].sort((a, b) => {
			// Sort markers by time
			const timeA = typeof a.time === 'number' ? a.time : new Date(a.time as string).getTime() / 1000;
			const timeB = typeof b.time === 'number' ? b.time : new Date(b.time as string).getTime() / 1000;
			return timeA - timeB;
		});

		// Apply markers using the new v5 API
		const seriesApi = candlestickSeries.getSeries();

		if (seriesApi) {
			// Create or update the markers primitive
			if (!seriesMarkers) {
				seriesMarkers = createSeriesMarkers(seriesApi, markers);
				totalMarkersAdded = markers.length;
			} else {
				seriesMarkers.setMarkers(markers);
				totalMarkersAdded = markers.length;
			}
		}
	}


	// Function to add bulk markers of a specific type
	function addBulkMarkers(markerTypeIndex: number) {
		if (!seriesMarkers) return;

		const markerType = markerTypes[markerTypeIndex];
		const currentMarkers = seriesMarkers.markers();
		
		// Get timestamps already used by existing markers to avoid conflicts
		const existingTimestamps = new Set(currentMarkers.map(m => m.time));
		const newMarkers = generateRandomMarkersAvoidingExisting(markerType, existingTimestamps);

		// Add new markers to existing ones and sort by time
		const allMarkers = [...currentMarkers, ...newMarkers].sort((a, b) => {
			// Convert timestamps to numbers for comparison
			const timeA = typeof a.time === 'number' ? a.time : new Date(a.time as string).getTime() / 1000;
			const timeB = typeof b.time === 'number' ? b.time : new Date(b.time as string).getTime() / 1000;
			return timeA - timeB;
		});
		
		seriesMarkers.setMarkers(allMarkers);

		totalMarkersAdded += newMarkers.length;
		console.log(
			`Added ${newMarkers.length} ${markerType.name}. Total markers: ${totalMarkersAdded}`
		);
	}
	
	// Generate markers while avoiding existing timestamps
	function generateRandomMarkersAvoidingExisting(
		markerType: (typeof markerTypes)[0],
		existingTimestamps: Set<Time>,
		count: number = 200
	): SeriesMarker<Time>[] {
		const markers: SeriesMarker<Time>[] = [];
		const usedTimestamps = new Set<Time>(existingTimestamps);

		for (let i = 0; i < count; i++) {
			let attempts = 0;
			let dataPoint;
			
			// Try to find a unique timestamp (avoid duplicates with existing and new markers)
			do {
				const randomIndex = Math.floor(Math.random() * data.length);
				dataPoint = data[randomIndex];
				attempts++;
			} while (usedTimestamps.has(dataPoint.time) && attempts < 100);
			
			// Add to used timestamps to avoid duplicates within this batch
			usedTimestamps.add(dataPoint.time);

			markers.push({
				time: dataPoint.time,
				position: markerType.position,
				color: markerType.color,
				shape: markerType.shape,
				text: `${markerType.name.split(' ')[0]} ${i + 1}`
			});
		}

		return markers;
	}

	// Effect to create markers when series is ready
	$effect(() => {
		if (candlestickSeries) {
			createSeriesMarkersData();
		}
	});

	// Handle adding custom marker
	function addCustomMarker() {
		if (!seriesMarkers) return;

		const currentMarkers = seriesMarkers.markers();

		// Add a new custom marker at the latest data point
		const newMarker: SeriesMarker<Time> = {
			time: data[data.length - 1].time,
			position: 'aboveBar' as const,
			color: '#ff9800',
			shape: 'circle' as const,
			text: 'NEW'
		};

		// Sort all markers by time before setting
		const allMarkers = [...currentMarkers, newMarker].sort((a, b) => {
			const timeA = typeof a.time === 'number' ? a.time : new Date(a.time as string).getTime() / 1000;
			const timeB = typeof b.time === 'number' ? b.time : new Date(b.time as string).getTime() / 1000;
			return timeA - timeB;
		});

		seriesMarkers.setMarkers(allMarkers);
		totalMarkersAdded = allMarkers.length;
	}

	// Handle clearing all markers
	function clearMarkers() {
		if (seriesMarkers) {
			seriesMarkers.setMarkers([]);
			totalMarkersAdded = 0;
		}
	}

	// Handle resetting to default markers
	function resetMarkers() {
		createSeriesMarkersData();
	}
</script>

<svelte:head>
	<title>Series Markers Example - Svelte Lightweight Charts</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-2 text-3xl font-bold">Series Markers Example</h1>
	<p class="mb-6">
		Interactive markers that display buy/sell signals and important events on the chart. Test marker
		performance by adding bulk markers of different types. Currently showing <strong
			>{totalMarkersAdded}</strong
		>
		markers on <strong>{data.length}</strong> data points.
	</p>

	<Card class="mb-6">
		<CardContent class="p-6">
			<Chart
				bind:this={chart}
				width={900}
				height={500}
				options={chartOptions}
				class="mb-4 rounded border border-gray-200"
			>
			<CandlestickSeries
				bind:this={candlestickSeries}
				{data}
				upColor="#26a69a"
				downColor="#ef5350"
				borderUpColor="#26a69a"
				borderDownColor="#ef5350"
				wickUpColor="#26a69a"
				wickDownColor="#ef5350"
				title="OHLC with Markers"
			/>
			</Chart>

			<div class="space-y-4">
				<!-- Chart Controls -->
				<div class="flex flex-wrap gap-2">
					<Button
						variant="default"
						onclick={() => chart?.timeScale()?.fitContent()}
					>
						Fit Content
					</Button>
					<Button
						variant="secondary"
						onclick={() => chart?.timeScale()?.scrollToRealTime()}
					>
						Scroll to Latest
					</Button>
					<Button
						variant="outline"
						onclick={addCustomMarker}
					>
						Add Custom Marker
					</Button>
					<Button
						variant="outline"
						onclick={resetMarkers}
					>
						Reset to Demo
					</Button>
					<Button
						variant="destructive"
						onclick={clearMarkers}
					>
						Clear All Markers
					</Button>
				</div>

				<!-- Bulk Marker Controls -->
				<Card>
					<CardHeader>
						<CardTitle>Performance Testing - Add 200 Markers Per Click</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="flex flex-wrap gap-2 mb-3">
							{#each markerTypes as markerType, index}
								<Button
									variant="outline"
									style="background-color: {markerType.color}; color: white; border-color: {markerType.color}"
									onclick={() => addBulkMarkers(index)}
								>
									Add {markerType.name}
								</Button>
							{/each}
						</div>
						<p class="text-sm text-muted-foreground">
							Each button adds 200 random markers of that type. Watch performance as you add thousands
							of markers!
						</p>
					</CardContent>
				</Card>
			</div>
		</CardContent>
	</Card>

	<div class="grid gap-6 md:grid-cols-3">
		<Alert>
			<AlertDescription>
				<h3 class="mb-2 font-medium">Marker Types</h3>
				<ul class="space-y-1 text-sm">
					<li>
						• <span class="mr-1 inline-block h-3 w-3 rounded-full bg-blue-500"></span> Circle markers for
						events
					</li>
					<li>
						• <span
							class="mr-1 inline-block h-0 w-0 border-r-2 border-b-3 border-l-2 border-transparent border-b-blue-500"
						></span> Arrow up for buy signals
					</li>
					<li>
						• <span
							class="mr-1 inline-block h-0 w-0 border-t-3 border-r-2 border-l-2 border-transparent border-t-red-500"
						></span> Arrow down for sell signals
					</li>
					<li>• Custom colors and text labels</li>
				</ul>
			</AlertDescription>
		</Alert>

		<Alert>
			<AlertDescription>
				<h3 class="mb-2 font-medium">Positioning</h3>
				<ul class="space-y-1 text-sm">
					<li>• <strong>aboveBar:</strong> Marker above the bar</li>
					<li>• <strong>belowBar:</strong> Marker below the bar</li>
					<li>• <strong>inBar:</strong> Marker inside the bar</li>
					<li>• Automatic collision detection</li>
				</ul>
			</AlertDescription>
		</Alert>

		<Alert>
			<AlertDescription>
				<h3 class="mb-2 font-medium">Features</h3>
				<ul class="space-y-1 text-sm">
					<li>• Dynamic marker creation</li>
					<li>• Signal detection algorithms</li>
					<li>• Interactive marker management</li>
					<li>• Customizable appearance</li>
				</ul>
			</AlertDescription>
		</Alert>
	</div>
</div>
