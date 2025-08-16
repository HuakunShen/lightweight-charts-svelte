<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getSeriesContext } from './context.js';
	import type { PriceLineProps, IPriceLine } from './types.js';

	// Props
	let {
		price,
		color,
		lineStyle,
		lineWidth,
		lineVisible,
		axisLabelVisible,
		title,
		axisLabelColor,
		axisLabelTextColor,
		...restOptions
	}: PriceLineProps = $props();

	// Get series context
	const seriesContext = getSeriesContext();
	
	// Price line instance
	let priceLine: IPriceLine | null = null;
	
	// Track if price line has been initialized
	let initialized = false;
	
	// Create price line when series is available
	$effect(() => {
		if (seriesContext.series && !priceLine && !initialized) {
			try {
				// Combine all options, ensuring price is always included
				const priceLineOptions = {
					price, // Required field
					...(color !== undefined && { color }),
					...(lineStyle !== undefined && { lineStyle }),
					...(lineWidth !== undefined && { lineWidth }),
					...(lineVisible !== undefined && { lineVisible }),
					...(axisLabelVisible !== undefined && { axisLabelVisible }),
					...(title !== undefined && { title }),
					...(axisLabelColor !== undefined && { axisLabelColor }),
					...(axisLabelTextColor !== undefined && { axisLabelTextColor }),
					...restOptions
				};
				
				priceLine = seriesContext.series.createPriceLine(priceLineOptions);
				initialized = true;
			} catch (error) {
				console.error('Failed to create price line:', error);
			}
		}
	});
	
	// Reactive price updates
	$effect(() => {
		if (priceLine && initialized) {
			priceLine.applyOptions({ price });
		}
	});
	
	// Reactive options updates
	$effect(() => {
		if (priceLine && initialized) {
			const options = {
				color,
				lineStyle,
				lineWidth,
				lineVisible,
				axisLabelVisible,
				title,
				axisLabelColor,
				axisLabelTextColor,
				...restOptions
			};
			
			// Remove undefined values
			const cleanOptions = Object.fromEntries(
				Object.entries(options).filter(([_, value]) => value !== undefined)
			);
			
			if (Object.keys(cleanOptions).length > 0) {
				priceLine.applyOptions(cleanOptions);
			}
		}
	});
	
	// Cleanup on destroy
	onDestroy(() => {
		if (priceLine && seriesContext.series) {
			try {
				seriesContext.series.removePriceLine(priceLine);
			} catch (error) {
				console.error('Failed to remove price line:', error);
			}
		}
	});
	
	// Public API
	export function getPriceLine(): IPriceLine | null {
		return priceLine;
	}
	
	export function applyOptions(options: any) {
		if (priceLine) {
			priceLine.applyOptions(options);
		}
	}
</script>