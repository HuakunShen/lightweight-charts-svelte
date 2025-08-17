import type { AreaData, BarData, HistogramData, LineData, UTCTimestamp } from 'lightweight-charts';

/**
 * Generate realistic OHLC (candlestick/bar) data with trends and volatility
 */
export function generateOHLCData(options: {
	days?: number;
	startPrice?: number;
	startTime?: number;
	volatility?: number;
	trendStrength?: number;
}): BarData[] {
	const {
		days = 365,
		startPrice = 100,
		startTime = 1640995200, // Jan 1, 2022
		volatility = 0.025, // 2.5% daily volatility
		trendStrength = 0.002
	} = options;

	const data: BarData[] = [];
	let currentPrice = startPrice;

	for (let i = 0; i < days; i++) {
		const timestamp = (startTime + i * 86400) as UTCTimestamp;
		
		// Generate realistic OHLC data with daily volatility
		const trend = (Math.random() - 0.5) * trendStrength;
		
		// Add weekly patterns (lower volatility on weekends)
		const date = new Date(timestamp * 1000);
		const dayOfWeek = date.getDay();
		const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.5 : 1;
		
		const adjustedVolatility = volatility * weekendMultiplier;
		
		const open = currentPrice * (1 + (Math.random() - 0.5) * adjustedVolatility * 0.3);
		const close = open * (1 + trend + (Math.random() - 0.5) * adjustedVolatility);
		const high = Math.max(open, close) * (1 + Math.random() * adjustedVolatility * 0.4);
		const low = Math.min(open, close) * (1 - Math.random() * adjustedVolatility * 0.4);
		
		data.push({
			time: timestamp,
			open: Number(open.toFixed(2)),
			high: Number(high.toFixed(2)),
			low: Number(low.toFixed(2)),
			close: Number(close.toFixed(2))
		});
		
		currentPrice = close;
	}
	
	return data;
}

/**
 * Generate area chart data based on OHLC data (uses close prices)
 */
export function generateAreaData(options: {
	days?: number;
	startPrice?: number;
	startTime?: number;
	volatility?: number;
	trendStrength?: number;
}): AreaData[] {
	const ohlcData = generateOHLCData(options);
	return ohlcData.map(bar => ({
		time: bar.time,
		value: bar.close
	}));
}

/**
 * Generate line chart data (alias for area data)
 */
export function generateLineData(options: {
	days?: number;
	startPrice?: number;
	startTime?: number;
	volatility?: number;
	trendStrength?: number;
}): LineData[] {
	return generateAreaData(options);
}

/**
 * Generate volume histogram data correlated with price movements
 */
export function generateVolumeData(options: {
	days?: number;
	startTime?: number;
	baseVolume?: number;
	volatilityMultiplier?: number;
}): HistogramData[] {
	const {
		days = 365,
		startTime = 1640995200,
		baseVolume = 1000000,
		volatilityMultiplier = 2
	} = options;

	const data: HistogramData[] = [];

	for (let i = 0; i < days; i++) {
		const timestamp = (startTime + i * 86400) as UTCTimestamp;
		
		// Higher volume on weekdays, lower on weekends
		const date = new Date(timestamp * 1000);
		const dayOfWeek = date.getDay();
		const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.3 : 1;
		
		// Random volume with some correlation to volatility
		const volatilityFactor = 1 + (Math.random() - 0.5) * volatilityMultiplier;
		const volume = Math.floor(baseVolume * weekendMultiplier * volatilityFactor);
		
		data.push({
			time: timestamp,
			value: volume,
			color: volume > baseVolume ? '#26a69a' : '#ef5350'
		});
	}
	
	return data;
}

/**
 * Generate RSI (Relative Strength Index) data
 */
export function generateRSIData(options: {
	days?: number;
	startTime?: number;
}): LineData[] {
	const {
		days = 365,
		startTime = 1640995200
	} = options;

	const data: LineData[] = [];
	let rsi = 50; // Start at neutral

	for (let i = 0; i < days; i++) {
		const timestamp = (startTime + i * 86400) as UTCTimestamp;
		
		// RSI oscillates between 0 and 100 with mean reversion
		const meanReversion = (50 - rsi) * 0.1;
		const randomChange = (Math.random() - 0.5) * 10;
		rsi = Math.max(0, Math.min(100, rsi + meanReversion + randomChange));
		
		data.push({
			time: timestamp,
			value: Number(rsi.toFixed(2))
		});
	}
	
	return data;
}

/**
 * Generate moving average data based on price data
 */
export function generateMovingAverageData(priceData: LineData[], period: number = 20): LineData[] {
	const data: LineData[] = [];
	
	for (let i = period - 1; i < priceData.length; i++) {
		const sum = priceData.slice(i - period + 1, i + 1)
			.reduce((acc, item) => acc + item.value, 0);
		const average = sum / period;
		
		data.push({
			time: priceData[i].time,
			value: Number(average.toFixed(2))
		});
	}
	
	return data;
}

/**
 * Generate Fibonacci sequence data
 */
export function generateFibonacciData(options: {
	count?: number;
	startTime?: number;
	interval?: number;
}): LineData[] {
	const {
		count = 20,
		startTime = 1640995200,
		interval = 86400 // Daily
	} = options;

	const data: LineData[] = [];
	let a = 0, b = 1;
	
	for (let i = 0; i < count; i++) {
		const timestamp = (startTime + i * interval) as UTCTimestamp;
		
		data.push({
			time: timestamp,
			value: i === 0 ? 0 : i === 1 ? 1 : a + b
		});
		
		if (i > 1) {
			const temp = a + b;
			a = b;
			b = temp;
		}
	}
	
	return data;
}

/**
 * Generate Powers of 2 sequence data
 */
export function generatePowersOf2Data(options: {
	count?: number;
	startTime?: number;
	interval?: number;
}): LineData[] {
	const {
		count = 15,
		startTime = 1640995200,
		interval = 86400
	} = options;

	const data: LineData[] = [];
	
	for (let i = 0; i < count; i++) {
		const timestamp = (startTime + i * interval) as UTCTimestamp;
		
		data.push({
			time: timestamp,
			value: Math.pow(2, i)
		});
	}
	
	return data;
}