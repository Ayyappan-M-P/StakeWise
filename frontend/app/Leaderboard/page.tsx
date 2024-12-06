// types.ts
"use client";

interface Trader {
  rank: number;
  name: string;
  avatar: string;
  profit: number;
  percentageGain: number;
  successRate: number;
  totalTrades: number;
  winStreak: number;
  status: 'up' | 'down' | 'neutral';
}

// utils.ts
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// components/LeaderboardPage.tsx
import { FC, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Search, ArrowUpDown } from 'lucide-react';

const traders: Trader[] = [
  {
    rank: 1,
    name: "Sarah Chen",
    avatar: "/sarah-chen.jpg",
    profit: 2450000,
    percentageGain: 28.5,
    successRate: 92,
    totalTrades: 145,
    winStreak: 15,
    status: 'up'
  },
  {
    rank: 2,
    name: "Michael Roberts",
    avatar: "/michael-roberts.jpg",
    profit: 1850000,
    percentageGain: 24.2,
    successRate: 88,
    totalTrades: 132,
    winStreak: 12,
    status: 'up'
  },
  {
    rank: 3,
    name: "David Kumar",
    avatar: "/david-kumar.jpg",
    profit: 1640000,
    percentageGain: 22.8,
    successRate: 85,
    totalTrades: 128,
    winStreak: 8,
    status: 'down'
  },
  {
    rank: 4,
    name: "Emma Thompson",
    avatar: "/emma-thompson.jpg",
    profit: 1520000,
    percentageGain: 21.5,
    successRate: 84,
    totalTrades: 115,
    winStreak: 10,
    status: 'up'
  },
  {
    rank: 5,
    name: "James Wilson",
    avatar: "/james-wilson.jpg",
    profit: 1380000,
    percentageGain: 19.8,
    successRate: 82,
    totalTrades: 108,
    winStreak: 6,
    status: 'neutral'
  }
];

const LeaderboardPage: FC = () => {
  const [sortField, setSortField] = useState<keyof Trader>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: Trader['status']) => {
    switch (status) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleSort = (field: keyof Trader) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedTraders = [...traders]
    .filter(trader => 
      trader.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return multiplier * (a[sortField] > b[sortField] ? 1 : -1);
    });

  return (
    <div className="min-h-screen bg-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-900 text-white p-6">
            <h1 className="text-3xl font-bold">Investment Leaderboard</h1>
            <p className="mt-2 text-blue-200">Top performing traders this month</p>
          </div>

          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-slate-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-20 w-5 h-5" />
              <input
                type="text"
                placeholder="Search traders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Trader
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('profit')}>
                    <div className="flex items-center">
                      Profit
                      <ArrowUpDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('percentageGain')}>
                    <div className="flex items-center">
                      Gain %
                      <ArrowUpDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('successRate')}>
                    <div className="flex items-center">
                      Success Rate
                      <ArrowUpDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedTraders.map((trader) => (
                  <tr key={trader.rank} className="hover:bg-gray-20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-lg font-bold ${
                        trader.rank <= 3 ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        #{trader.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src="/api/placeholder/40/40"
                          alt={trader.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{trader.name}</div>
                          <div className="text-sm text-gray-500">{trader.totalTrades} trades</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(trader.profit)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {trader.percentageGain.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {trader.winStreak} win streak
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${trader.successRate}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {trader.successRate}% success
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusIcon(trader.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performer</h3>
            <div className="flex items-center">
              <img
                src="/api/placeholder/48/48"
                alt={traders[0].name}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <div className="font-medium text-gray-900">{traders[0].name}</div>
                <div className="text-sm text-gray-500">
                  {formatCurrency(traders[0].profit)} ({traders[0].percentageGain}% gain)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Highest Success Rate</h3>
            <div className="text-3xl font-bold text-blue-600">
              {Math.max(...traders.map(t => t.successRate))}%
            </div>
            <div className="text-sm text-gray-500 mt-1">Average: 86%</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Trading Volume</h3>
            <div className="text-3xl font-bold text-blue-600">
              {formatCurrency(traders.reduce((acc, t) => acc + t.profit, 0))}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {traders.reduce((acc, t) => acc + t.totalTrades, 0)} total trades
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;