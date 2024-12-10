// components/StockTable.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Add this
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Register here
  Title,
  Tooltip,
  Legend
);

interface StockData {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  history: number[]; // Historical prices for graph
}

const StockTable: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const companies = [
    "AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NFLX", "NVDA", "META", "INTC", "ADBE", 
    "AMD", "ORCL", "IBM", "CRM", "PYPL", "CSCO", "UBER", "SQ", "SPOT", "SHOP"
  ];

  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);

      const responses = await Promise.all(
        companies.map((symbol) =>
          axios.get(`https://finnhub.io/api/v1/quote`, {
            params: {
              symbol,
              token:"ct29ph1r01qiurr3q7m0ct29ph1r01qiurr3q7mg",
            },
          })
        )
      );

      const updatedStocks: StockData[] = responses.map((response, index) => ({
        symbol: companies[index],
        price: response.data.c,
        change: response.data.d,
        percentChange: response.data.dp,
        history: generateRandomHistory(response.data.c), // Replace with real historical data if available
      }));

      setStocks(updatedStocks);
    } catch (err) {
      setError("Failed to fetch stock data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const generateRandomHistory = (currentPrice: number): number[] => {
    // Simulate historical data for the graph
    const history = [];
    for (let i = 0; i < 10; i++) {
      history.push(currentPrice + (Math.random() - 0.5) * 2);
    }
    return history;
  };

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 10000); // Fetch updates every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Live Stock Tracker</h1>
      {loading && <p className="text-center text-gray-600">Loading stock data...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Symbol</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Price</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Change</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">% Change</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Trend</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr
                key={stock.symbol}
                className="hover:bg-gray-50 transition-colors border-t border-gray-200"
              >
                <td className="px-4 py-2">{stock.symbol}</td>
                <td className="px-4 py-2">${stock.price.toFixed(2)}</td>
                <td
                  className={`px-4 py-2 ${
                    stock.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}
                </td>
                <td
                  className={`px-4 py-2 ${
                    stock.percentChange >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stock.percentChange.toFixed(2)}%
                </td>
                <td className="px-4 py-2">
                  <div className="w-32 h-16">
                    <Line
                      data={{
                        labels: Array(stock.history.length).fill(""),
                        datasets: [
                          {
                            data: stock.history,
                            borderColor: "rgb(75, 192, 192)",
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: { display: false },
                        },
                        scales: {
                          x: { display: false },
                          y: { display: false },
                        },
                        elements: {
                          line: { tension: 0.3 },
                        },
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
