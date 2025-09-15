import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useResizeDetector } from 'react-resize-detector';

// Dados de exemplo para o gráfico (pode ser substituído por dados reais da API)
const exampleData = [
  { time: '2025-09-01', open: 100, high: 105, low: 98, close: 102 },
  { time: '2025-09-02', open: 102, high: 108, low: 100, close: 107 },
  { time: '2025-09-03', open: 107, high: 115, low: 105, close: 110 },
  { time: '2025-09-04', open: 110, high: 112, low: 106, close: 109 },
  { time: '2025-09-05', open: 109, high: 114, low: 107, close: 113 },
];

export const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { width, height, ref } = useResizeDetector();
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chartInstance = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300, // Altura padrão do gráfico
        layout: {
          background: { type: ColorType.Solid, color: '#131722' },
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: { color: '#333' },
          horzLines: { color: '#333' },
        },
      });

      const candlestickSeries = chartInstance.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderDownColor: '#ef5350',
        borderUpColor: '#26a69a',
        wickDownColor: '#ef5350',
        wickUpColor: '#26a69a',
      });

      candlestickSeries.setData(exampleData);
      setChart(chartInstance);
    }

    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (chart) {
      chart.applyOptions({ width: width, height: height });
    }
  }, [width, height, chart]);

  return <div ref={ref} style={{ height: '400px', width: '100%' }} />;
};

