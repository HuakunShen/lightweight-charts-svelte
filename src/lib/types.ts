import type { 
	AreaData, 
	AreaStyleOptions, 
	BarData, 
	BarStyleOptions, 
	BaselineData,
	BaselineStyleOptions,
	CandlestickData, 
	CandlestickStyleOptions, 
	ChartOptions, 
	CreatePriceLineOptions,
	DeepPartial, 
	HistogramData,
	HistogramStyleOptions,
	IChartApi,
	ISeriesApi,
	IPriceLine,
	IPaneApi,
	IYieldCurveChartApi,
	LineData, 
	LineStyleOptions,
	MouseEventParams,
	SeriesOptions,
	SeriesType,
	SingleValueData,
	OhlcData,
	WhitespaceData,
	Time,
	UTCTimestamp,
	LineStyle,
	LineType,
	PriceScaleMode,
	ColorType,
	CrosshairMode,
	LastPriceAnimationMode,
	LineSeriesOptions,
	AreaSeriesOptions,
	BarSeriesOptions,
	CandlestickSeriesOptions,
	HistogramSeriesOptions,
	BaselineSeriesOptions,
	SeriesOptionsMap
} from 'lightweight-charts';

// Re-export key types from lightweight-charts
export type {
	// Chart types
	ChartOptions,
	DeepPartial,
	IChartApi,
	ISeriesApi,
	IPaneApi,
	IYieldCurveChartApi,
	Time,
	UTCTimestamp,
	
	// Series data types
	LineData,
	AreaData,
	BarData,
	CandlestickData,
	HistogramData,
	BaselineData,
	SingleValueData,
	OhlcData,
	WhitespaceData,
	
	// Series options types
	SeriesOptions,
	LineSeriesOptions,
	AreaSeriesOptions,
	BarSeriesOptions,
	CandlestickSeriesOptions,
	HistogramSeriesOptions,
	BaselineSeriesOptions,
	SeriesOptionsMap,
	SeriesType,
	
	// Style options
	LineStyleOptions,
	AreaStyleOptions,
	BarStyleOptions,
	CandlestickStyleOptions,
	HistogramStyleOptions,
	BaselineStyleOptions,
	
	// Price line
	CreatePriceLineOptions,
	IPriceLine,
	
	// Enums and constants
	LineStyle,
	LineType,
	PriceScaleMode,
	ColorType,
	CrosshairMode,
	LastPriceAnimationMode,
	
	// Event types
	MouseEventParams,
} from 'lightweight-charts';

// Component-specific types

/**
 * Props for the Chart component
 */
export interface ChartProps {
	/** Chart width in pixels */
	width?: number;
	/** Chart height in pixels */
	height?: number;
	/** Chart configuration options */
	options?: DeepPartial<ChartOptions>;
	/** Whether to create a yield curve chart instead of regular chart */
	yieldCurve?: boolean;
	/** CSS classes to apply to the chart container */
	class?: string;
	/** Inline styles for the chart container */
	style?: string;
}

/**
 * Base props shared by all series components
 */
export interface BaseSeriesProps<TData> {
	/** Series data array */
	data: TData[];
	/** Whether to reactively update the series when data changes */
	reactive?: boolean;
	/** Whether this series is visible */
	visible?: boolean;
	/** Index of the pane where the series should be created (0 = main pane) */
	paneIndex?: number;
	/** Price scale ID ('left', 'right', or custom scale ID) */
	priceScaleId?: string;
}

/**
 * Props for LineSeries component
 */
export interface LineSeriesProps extends BaseSeriesProps<LineData>, 
	Omit<DeepPartial<LineStyleOptions>, 'title' | 'visible'> {
	/** Series title for the legend */
	title?: string;
}

/**
 * Props for AreaSeries component  
 */
export interface AreaSeriesProps extends BaseSeriesProps<AreaData>,
	Omit<DeepPartial<AreaStyleOptions>, 'title' | 'visible'> {
	/** Series title for the legend */
	title?: string;
}

/**
 * Props for BarSeries component
 */
export interface BarSeriesProps extends BaseSeriesProps<BarData>,
	Omit<DeepPartial<BarStyleOptions>, 'title' | 'visible'> {
	/** Series title for the legend */
	title?: string;
}

/**
 * Props for CandlestickSeries component
 */
export interface CandlestickSeriesProps extends BaseSeriesProps<CandlestickData>,
	Omit<DeepPartial<CandlestickStyleOptions>, 'title' | 'visible'> {
	/** Series title for the legend */
	title?: string;
}

/**
 * Props for HistogramSeries component
 */
export interface HistogramSeriesProps extends BaseSeriesProps<HistogramData>,
	Omit<DeepPartial<HistogramStyleOptions>, 'title' | 'visible'> {
	/** Series title for the legend */
	title?: string;
}

/**
 * Props for BaselineSeries component
 */
export interface BaselineSeriesProps extends BaseSeriesProps<BaselineData>,
	Omit<DeepPartial<BaselineStyleOptions>, 'title' | 'visible'> {
	/** Series title for the legend */
	title?: string;
}

/**
 * Props for PriceLine component
 */
export interface PriceLineProps extends Omit<DeepPartial<CreatePriceLineOptions>, 'price'> {
	/** Price value for the line */
	price: number;
}

/**
 * Utility type to extract data type from series type
 */
export type SeriesDataTypeMap = {
	Line: LineData;
	Area: AreaData;
	Bar: BarData;
	Candlestick: CandlestickData;
	Histogram: HistogramData;
	Baseline: BaselineData;
};

/**
 * Utility type to extract style options from series options
 */
export type StyleOptionsOf<T extends SeriesType> = T extends 'Line' ? LineStyleOptions :
	T extends 'Area' ? AreaStyleOptions :
	T extends 'Bar' ? BarStyleOptions :
	T extends 'Candlestick' ? CandlestickStyleOptions :
	T extends 'Histogram' ? HistogramStyleOptions :
	T extends 'Baseline' ? BaselineStyleOptions :
	never;

/**
 * Utility type to create component props from series type
 */
export type SeriesPropsOf<T extends SeriesType> = T extends 'Line' ? LineSeriesProps :
	T extends 'Area' ? AreaSeriesProps :
	T extends 'Bar' ? BarSeriesProps :
	T extends 'Candlestick' ? CandlestickSeriesProps :
	T extends 'Histogram' ? HistogramSeriesProps :
	T extends 'Baseline' ? BaselineSeriesProps :
	never;