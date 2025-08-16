# Svelte Lightweight Charts

This is a Svelte Component Library of Lightweight Charts.

Sample Usage

```svelte
<Chart width={800} height={600}>
	<LineSeries {data} />
</Chart>
```

```svelte
<script>
	let chart: Chart;
</script>

<Chart width={400} height={300} bind:this={chart} />
<button on:click={() => chart.timeScale().fitContent()}>Fit Content</button>
```

```svelte
<Chart width={600} height={300}>
	<LineSeries {data}>
		<PriceLine title="minimum price" price={minimumPrice} />
		<PriceLine title="average price" price={avgPrice} />
		<PriceLine title="maximum price" price={maximumPrice} />
	</LineSeries>
</Chart>
```

## Requirements

- Fully Typed with TypeScript
- Follow the sample usage above
