<script lang="ts">
	import { Chart, CandlestickSeries, HistogramSeries, LineSeries, ColorType, type UTCTimestamp, type CandlestickData, type HistogramData, type LineData } from '../../lib/index.js';

	// Chart options with time scale configuration
	const chartOptions = {
		layout: { 
			textColor: 'white', 
			background: { type: ColorType.Solid, color: 'black' } 
		},
		timeScale: {
			rightOffset: 12,
			barSpacing: 8,
			fixLeftEdge: false,
			lockVisibleTimeRangeOnResize: true,
			rightBarStaysOnScroll: true,
			borderVisible: true,
			borderColor: '#485c7b',
			visible: true,
			timeVisible: true,
			secondsVisible: false
		}
	};

	// Generate extended price data for time scale demonstration
	const generatePriceData = (): CandlestickData[] => {
		const data: CandlestickData[] = [];
		let price = 100;
		const startTime = 1640995200; // Jan 1, 2022
		
		for (let i = 0; i < 100; i++) {
			const change = (Math.random() - 0.5) * 4;
			const open = price;
			const close = price + change;
			const high = Math.max(open, close) + Math.random() * 2;
			const low = Math.min(open, close) - Math.random() * 2;
			
			data.push({
				time: (startTime + i * 86400) as UTCTimestamp, // Daily data
				open,
				high,
				low,
				close
			});
			
			price = close;
		}
		
		return data;
	};

	// Generate volume data
	const generateVolumeData = (): HistogramData[] => {
		return generatePriceData().map((item, index) => ({
			time: item.time,
			value: Math.floor(Math.random() * 100000) + 20000,
			color: index % 2 === 0 ? '#26a69a' : '#ef5350'
		}));
	};

	// Generate moving average data
	const generateMovingAverage = (priceData: CandlestickData[], period: number): LineData[] => {
		const ma: LineData[] = [];
		
		for (let i = period - 1; i < priceData.length; i++) {
			let sum = 0;
			for (let j = 0; j < period; j++) {
				sum += priceData[i - j].close;
			}
			ma.push({
				time: priceData[i].time,
				value: sum / period
			});
		}
		
		return ma;
	};

	const priceData = generatePriceData();
	const volumeData = generateVolumeData();
	const ma20Data = generateMovingAverage(priceData, 20);

	// Chart reference
	let chart: Chart;

	// Time scale state
	let barSpacing = $state(8);
	let rightOffset = $state(12);
	let timeVisible = $state(true);
	let secondsVisible = $state(false);

	// Time scale controls
	function updateBarSpacing(value: number) {
		barSpacing = value;
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().applyOptions({ barSpacing });
		}
	}

	function updateRightOffset(value: number) {
		rightOffset = value;
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().applyOptions({ rightOffset });
		}
	}

	function updateTimeVisible() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().applyOptions({ timeVisible });
		}
	}

	function updateSecondsVisible() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().applyOptions({ secondsVisible });
		}
	}

	// Reactive statements to update chart when state changes
	$effect(() => {
		if (chart) {
			updateTimeVisible();
		}
	});

	$effect(() => {
		if (chart) {
			updateSecondsVisible();
		}
	});

	function fitContent() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().fitContent();
		}
	}

	function scrollToPosition(position: 'start' | 'middle' | 'end') {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			const timeScale = chartInstance.timeScale();
			const visibleRange = timeScale.getVisibleLogicalRange();
			
			if (visibleRange) {
				const rangeSize = visibleRange.to - visibleRange.from;
				let newFrom: number, newTo: number;
				
				switch (position) {
					case 'start':
						newFrom = 0;
						newTo = rangeSize;
						break;
					case 'middle':
						const middle = (priceData.length - 1) / 2;
						newFrom = middle - rangeSize / 2;
						newTo = middle + rangeSize / 2;
						break;
					case 'end':
						newFrom = priceData.length - 1 - rangeSize;
						newTo = priceData.length - 1;
						break;
				}
				
				timeScale.setVisibleLogicalRange({ from: newFrom, to: newTo });
			}
		}
	}

	function setVisibleTimeRange(days: number) {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			const timeScale = chartInstance.timeScale();
			const endTime = priceData[priceData.length - 1].time as number;
			const startTime = endTime - (days * 86400);
			
			timeScale.setVisibleRange({
				from: startTime as UTCTimestamp,
				to: endTime as UTCTimestamp
			});
		}
	}

	function zoomTo(factor: number) {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			const timeScale = chartInstance.timeScale();
			const visibleRange = timeScale.getVisibleLogicalRange();
			
			if (visibleRange) {
				const center = (visibleRange.from + visibleRange.to) / 2;
				const newRangeSize = (visibleRange.to - visibleRange.from) * factor;
				
				timeScale.setVisibleLogicalRange({
					from: center - newRangeSize / 2,
					to: center + newRangeSize / 2
				});
			}
		}
	}

	function resetTimeScale() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().resetTimeScale();
		}
	}

	function scrollToRealTime() {
		const chartInstance = chart.getChart();
		if (chartInstance) {
			chartInstance.timeScale().scrollToRealTime();
		}
	}
</script>

<svelte:head>
	<title>Time Scale Examples - Svelte Lightweight Charts</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold text-gray-800 mb-2">Time Scale Examples</h1>
	<p class="text-gray-600 mb-6">
		This example demonstrates time scale management including navigation, zooming, spacing controls, 
		and various time-related configuration options.
	</p>

	<div class="bg-white rounded-lg shadow-lg p-6 mb-6">
		<Chart 
			bind:this={chart} 
			width={900} 
			height={600} 
			options={chartOptions} 
			class="border border-gray-200 rounded mb-4"
		>
			<!-- Price data in main pane -->
			<CandlestickSeries 
				data={priceData}
				upColor="#26a69a"
				downColor="#ef5350"
				borderVisible={false}
				wickUpColor="#26a69a"
				wickDownColor="#ef5350"
				title="Price (OHLC)"
				paneIndex={0}
			/>
			
			<!-- Moving average overlay -->
			<LineSeries 
				data={ma20Data}
				color="#2962FF"
				lineWidth={2}
				title="MA(20)"
				paneIndex={0}
			/>
			
			<!-- Volume in separate pane -->
			<HistogramSeries 
				data={volumeData}
				title="Volume"
				paneIndex={1}
			/>
		</Chart>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
		<!-- Spacing and Offset Controls -->
		<div class="bg-white rounded-lg shadow p-6">
			<h3 class="text-lg font-semibold text-gray-800 mb-4">Spacing & Offset</h3>
			<div class="space-y-4">
				<div>
					<label for="bar-spacing" class="block text-sm font-medium text-gray-700 mb-2">
						Bar Spacing: {barSpacing}px
					</label>
					<input
						id="bar-spacing"
						type="range"
						min="1"
						max="20"
						bind:value={barSpacing}
						on:input={(e) => updateBarSpacing(Number((e.target as HTMLInputElement).value))}
						class="w-full"
					>
				</div>
				<div>
					<label for="right-offset" class="block text-sm font-medium text-gray-700 mb-2">
						Right Offset: {rightOffset}
					</label>
					<input
						id="right-offset"
						type="range"
						min="0"
						max="50"
						bind:value={rightOffset}
						on:input={(e) => updateRightOffset(Number((e.target as HTMLInputElement).value))}
						class="w-full"
					>
				</div>
				<div class="space-y-2">
					<label class="flex items-center space-x-2">
						<input
							type="checkbox"
							bind:checked={timeVisible}
							class="form-checkbox h-4 w-4 text-blue-600"
						>
						<span class="text-gray-700">Show Time</span>
					</label>
					<label class="flex items-center space-x-2">
						<input
							type="checkbox"
							bind:checked={secondsVisible}
							class="form-checkbox h-4 w-4 text-blue-600"
						>
						<span class="text-gray-700">Show Seconds</span>
					</label>
				</div>
			</div>
		</div>

		<!-- Navigation Controls -->
		<div class="bg-white rounded-lg shadow p-6">
			<h3 class="text-lg font-semibold text-gray-800 mb-4">Navigation</h3>
			<div class="space-y-2">
				<button
					class="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={() => scrollToPosition('start')}
				>
					Go to Start
				</button>
				<button
					class="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={() => scrollToPosition('middle')}
				>
					Go to Middle
				</button>
				<button
					class="w-full bg-purple-500 hover:bg-purple-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={() => scrollToPosition('end')}
				>
					Go to End
				</button>
				<button
					class="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={scrollToRealTime}
				>
					Scroll to Real Time
				</button>
			</div>
		</div>

		<!-- Zoom Controls -->
		<div class="bg-white rounded-lg shadow p-6">
			<h3 class="text-lg font-semibold text-gray-800 mb-4">Zoom Controls</h3>
			<div class="space-y-2">
				<button
					class="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={() => zoomTo(0.5)}
				>
					Zoom In (2x)
				</button>
				<button
					class="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={() => zoomTo(2)}
				>
					Zoom Out (0.5x)
				</button>
				<button
					class="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={fitContent}
				>
					Fit All Content
				</button>
				<button
					class="w-full bg-gray-500 hover:bg-gray-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={resetTimeScale}
				>
					Reset Time Scale
				</button>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
		<!-- Time Range Controls -->
		<div class="bg-white rounded-lg shadow p-6">
			<h3 class="text-lg font-semibold text-gray-800 mb-4">Visible Time Range</h3>
			<div class="grid grid-cols-2 gap-2">
				<button
					class="bg-cyan-500 hover:bg-cyan-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={() => setVisibleTimeRange(7)}
				>
					Last 7 Days
				</button>
				<button
					class="bg-cyan-500 hover:bg-cyan-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={() => setVisibleTimeRange(30)}
				>
					Last 30 Days
				</button>
				<button
					class="bg-cyan-500 hover:bg-cyan-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={() => setVisibleTimeRange(60)}
				>
					Last 60 Days
				</button>
				<button
					class="bg-cyan-500 hover:bg-cyan-600 text-white text-sm py-2 px-3 rounded transition-colors"
					on:click={() => setVisibleTimeRange(90)}
				>
					Last 90 Days
				</button>
			</div>
		</div>

		<!-- Time Scale Info -->
		<div class="bg-gray-50 rounded-lg p-6">
			<h3 class="text-lg font-semibold text-gray-800 mb-4">Time Scale Info</h3>
			<div class="space-y-2 text-sm">
				<div class="flex justify-between">
					<span class="text-gray-600">Data Points:</span>
					<span class="font-mono">{priceData.length}</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-600">Bar Spacing:</span>
					<span class="font-mono">{barSpacing}px</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-600">Right Offset:</span>
					<span class="font-mono">{rightOffset}</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-600">Time Visible:</span>
					<span class="font-mono">{timeVisible ? 'Yes' : 'No'}</span>
				</div>
			</div>
		</div>
	</div>

	<div class="bg-green-50 border border-green-200 rounded-lg p-4">
		<h3 class="font-medium text-green-800 mb-2">About Time Scale</h3>
		<ul class="text-sm text-green-700 space-y-1">
			<li>• <strong>Bar Spacing:</strong> Controls horizontal spacing between data points</li>
			<li>• <strong>Right Offset:</strong> Adds margin on the right side for future data</li>
			<li>• <strong>Visible Range:</strong> Can be set by time values or logical indices</li>
			<li>• <strong>Navigation:</strong> Programmatically scroll to different chart positions</li>
			<li>• <strong>Zoom:</strong> Dynamically adjust the visible data range</li>
			<li>• <strong>Real Time:</strong> Scroll to the latest data point automatically</li>
			<li>• <strong>Fit Content:</strong> Automatically adjust to show all data</li>
		</ul>
	</div>
</div>