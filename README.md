# Svelte Lightweight Charts

[![npm version](https://badge.fury.io/js/lightweight-charts-svelte.svg)](https://www.npmjs.com/package/lightweight-charts-svelte)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-orange.svg)](https://svelte.dev/)

A modern, type-safe Svelte component library for [TradingView's Lightweight Charts v5](https://github.com/tradingview/lightweight-charts). Build beautiful, interactive financial charts with declarative components that feel natural to Svelte developers.

## Features

- 🎯 **Type-Safe**: Built with TypeScript for excellent developer experience
- ⚡ **Reactive**: Leverages Svelte 5's reactivity system for automatic updates
- 🧩 **Declarative**: Simple, intuitive component API
- 📊 **All Series Types**: Line, Area, Bar, Candlestick, Histogram, and Baseline
- 🔲 **Multiple Panes**: Support for multiple chart panes
- 🎨 **Customizable**: Extensive styling and theming options
- 📱 **Responsive**: Works seamlessly across different screen sizes
- 🔧 **Full API Access**: Direct access to underlying Lightweight Charts API

## Installation

```bash
npm install lightweight-charts-svelte
```

## Quick Start

```svelte
<script>
  import { Chart, LineSeries } from 'lightweight-charts-svelte';
  
  const data = [
    { time: '2023-01-01', value: 100 },
    { time: '2023-01-02', value: 105 },
    { time: '2023-01-03', value: 98 }
  ];
</script>

<Chart width={800} height={400}>
  <LineSeries {data} color="#2962FF" title="Price" />
</Chart>
```

## Chart Types

### Line Series

```svelte
<Chart width={800} height={400}>
  <LineSeries 
    {data} 
    color="#2962FF" 
    lineWidth={2}
    title="Price Line" 
  />
</Chart>
```

### Area Series

```svelte
<Chart width={800} height={400}>
  <AreaSeries 
    {data} 
    lineColor="#2962FF"
    topColor="#2962FF"
    bottomColor="rgba(41, 98, 255, 0.28)"
    title="Price Area" 
  />
</Chart>
```

### Candlestick Series

```svelte
<script>
  const candlestickData = [
    { time: '2023-01-01', open: 100, high: 105, low: 95, close: 102 },
    { time: '2023-01-02', open: 102, high: 108, low: 100, close: 106 }
  ];
</script>

<Chart width={800} height={400}>
  <CandlestickSeries 
    data={candlestickData}
    upColor="#26a69a"
    downColor="#ef5350"
    borderVisible={false}
    wickUpColor="#26a69a"
    wickDownColor="#ef5350"
    title="OHLC Data" 
  />
</Chart>
```

### Bar Series

```svelte
<Chart width={800} height={400}>
  <BarSeries 
    data={candlestickData}
    upColor="#26a69a"
    downColor="#ef5350"
    title="OHLC Bars" 
  />
</Chart>
```

### Histogram Series

```svelte
<script>
  const volumeData = [
    { time: '2023-01-01', value: 50000, color: '#26a69a' },
    { time: '2023-01-02', value: 75000, color: '#ef5350' }
  ];
</script>

<Chart width={800} height={400}>
  <HistogramSeries 
    data={volumeData}
    title="Volume" 
  />
</Chart>
```

### Baseline Series

```svelte
<Chart width={800} height={400}>
  <BaselineSeries 
    {data}
    baseValue={100}
    topLineColor="#26a69a"
    bottomLineColor="#ef5350"
    topFillColor1="rgba(38, 166, 154, 0.28)"
    topFillColor2="rgba(38, 166, 154, 0.05)"
    bottomFillColor1="rgba(239, 83, 80, 0.28)"
    bottomFillColor2="rgba(239, 83, 80, 0.05)"
    title="Baseline" 
  />
</Chart>
```

## Advanced Features

### Chart Reference and API Access

```svelte
<script>
  let chart: Chart;
  
  function fitContent() {
    chart?.timeScale()?.fitContent();
  }
  
  function scrollToLatest() {
    chart?.timeScale()?.scrollToRealTime();
  }
</script>

<Chart bind:this={chart} width={800} height={400}>
  <LineSeries {data} />
</Chart>

<button on:click={fitContent}>Fit Content</button>
<button on:click={scrollToLatest}>Scroll to Latest</button>
```

### Price Lines

```svelte
<Chart width={800} height={400}>
  <LineSeries {data}>
    <PriceLine 
      price={averagePrice} 
      color="#ff6b6b" 
      lineWidth={2}
      lineStyle={LineStyle.Dashed}
      axisLabelVisible={true}
      title="Average Price" 
    />
  </LineSeries>
</Chart>
```

### Multiple Panes

```svelte
<Chart width={800} height={600}>
  <!-- Price chart in main pane (0) -->
  <CandlestickSeries 
    data={priceData}
    paneIndex={0}
    title="Price" 
  />
  
  <!-- Volume chart in second pane (1) -->
  <HistogramSeries 
    data={volumeData}
    paneIndex={1}
    title="Volume" 
  />
  
  <!-- RSI indicator in third pane (2) -->
  <LineSeries 
    data={rsiData}
    paneIndex={2}
    color="#ff6b6b"
    title="RSI" 
  />
</Chart>
```

### Combined Chart Types

```svelte
<Chart width={800} height={500}>
  <!-- Background area series -->
  <AreaSeries
    data={areaData}
    lineColor="#2962FF"
    topColor="#2962FF"
    bottomColor="rgba(41, 98, 255, 0.28)"
    title="Area Background"
  />
  
  <!-- Overlaid candlestick series -->
  <CandlestickSeries
    data={candlestickData}
    upColor="#26a69a"
    downColor="#ef5350"
    title="Price Action"
  />
</Chart>
```

### Theme Support

```svelte
<script>
  import { ColorType } from 'lightweight-charts-svelte';
  
  const darkTheme = {
    layout: {
      textColor: 'white',
      background: {
        type: ColorType.Solid,
        color: '#0a0a0a'
      }
    },
    grid: {
      horzLines: { color: '#1f2937' },
      vertLines: { color: '#1f2937' }
    },
    rightPriceScale: {
      borderColor: '#374151'
    },
    timeScale: {
      borderColor: '#374151'
    }
  };
</script>

<Chart width={800} height={400} options={darkTheme}>
  <LineSeries {data} />
</Chart>
```

### Interactive Legends

```svelte
<script>
  let chart: Chart;
  let legendElement: HTMLElement;
  let lineSeries: LineSeries;
  
  onMount(() => {
    if (chart && legendElement) {
      const chartApi = chart.getChart();
      
      chartApi?.subscribeCrosshairMove((param) => {
        if (!param.time) {
          legendElement.innerHTML = 'Price: <strong>--</strong>';
          return;
        }
        
        let value = '--';
        if (lineSeries && param.seriesData.has(lineSeries.getSeries())) {
          const data = param.seriesData.get(lineSeries.getSeries());
          if (data?.value !== undefined) {
            value = data.value.toFixed(2);
          }
        }
        
        legendElement.innerHTML = `Price: <strong>${value}</strong>`;
      });
    }
  });
</script>

<div class="relative">
  <div bind:this={legendElement} class="absolute top-4 left-4 z-10 bg-white p-2 rounded shadow">
    Price: <strong>--</strong>
  </div>
  
  <Chart bind:this={chart} width={800} height={400}>
    <LineSeries bind:this={lineSeries} {data} />
  </Chart>
</div>
```

### Yield Curve Charts

```svelte
<script>
  const yieldData = [
    { time: 1, value: 5.378 },
    { time: 2, value: 5.372 },
    { time: 3, value: 5.271 },
    { time: 6, value: 5.094 },
    { time: 12, value: 4.739 },
    { time: 24, value: 4.237 },
    { time: 36, value: 4.036 },
    { time: 60, value: 3.887 },
    { time: 120, value: 4.007 },
    { time: 240, value: 4.366 },
    { time: 360, value: 4.29 }
  ];
</script>

<Chart 
  width={800} 
  height={400} 
  yieldCurve={true}
  options={{
    handleScroll: false,
    handleScale: false
  }}
>
  <LineSeries data={yieldData} color="#2962FF" title="Yield Curve" />
</Chart>
```

## Data Generation Utilities

The library includes helpful data generation functions for testing and demos:

```svelte
<script>
  import { 
    generateOHLCData, 
    generateVolumeData, 
    generateRSIData,
    generateMovingAverageData,
    generateLineData,
    generateAreaData
  } from 'lightweight-charts-svelte';
  
  // Generate 365 days of OHLC data starting at $100
  const priceData = generateOHLCData({ days: 365, startPrice: 100 });
  
  // Generate correlated volume data
  const volumeData = generateVolumeData({ days: 365, baseVolume: 50000 });
  
  // Generate RSI indicator data
  const rsiData = generateRSIData({ days: 365 });
  
  // Generate moving average from price data
  const lineData = priceData.map(d => ({ time: d.time, value: d.close }));
  const ma20Data = generateMovingAverageData(lineData, 20);
</script>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type { 
  ChartOptions, 
  LineData, 
  CandlestickData, 
  HistogramData,
  UTCTimestamp 
} from 'lightweight-charts-svelte';

const data: LineData[] = [
  { time: '2023-01-01' as UTCTimestamp, value: 100 },
  { time: '2023-01-02' as UTCTimestamp, value: 105 }
];

const chartOptions: DeepPartial<ChartOptions> = {
  layout: {
    textColor: '#333',
    background: { type: ColorType.Solid, color: 'white' }
  }
};
```

## API Reference

### Chart Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `800` | Chart width in pixels |
| `height` | `number` | `400` | Chart height in pixels |
| `options` | `DeepPartial<ChartOptions>` | `{}` | Chart configuration options |
| `yieldCurve` | `boolean` | `false` | Enable yield curve mode |
| `class` | `string` | `''` | CSS class for styling |

### Series Components

All series components support:

| Prop | Type | Description |
|------|------|-------------|
| `data` | `SeriesData[]` | Chart data array |
| `title` | `string` | Series title for legend |
| `paneIndex` | `number` | Target pane index (0 = main) |
| `visible` | `boolean` | Series visibility |
| `priceScaleId` | `string` | Price scale identifier |

### Chart Methods

Access the underlying Lightweight Charts API:

```typescript
// Get the chart instance
const chartApi = chart.getChart();

// Time scale operations
chart.timeScale().fitContent();
chart.timeScale().scrollToRealTime();
chart.timeScale().setVisibleRange({ from: startTime, to: endTime });

// Price scale operations
chart.priceScale().applyOptions({ autoScale: true });

// Add/remove panes
const newPane = chart.addPane();
chart.removePane(paneIndex);
```

## Requirements

- Svelte 5+
- TypeScript (recommended)
- Modern browser with ES2020 support

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

## Support

For questions and support:
- 📖 [Documentation](https://github.com/your-repo/lightweight-charts-svelte)
- 🐛 [Issue Tracker](https://github.com/your-repo/lightweight-charts-svelte/issues)
- 💬 [Discussions](https://github.com/your-repo/lightweight-charts-svelte/discussions)
