// pages/news/index.tsx

"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Search, Filter, Calendar } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  category: string;
  date: string;
  summary: string;
  imageUrl: string;
  readTime: string;
}

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample news data - replace with your actual data or API call
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Global Markets Rally as Tech Sector Leads Recovery",
      category: "Market Analysis",
      date: "2024-11-24",
      summary: "Major stock indices showed strong gains as technology companies reported better-than-expected earnings, driving market optimism.",
      imageUrl: "/images/market-rally.jpg",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "New Sustainable Investment Fund Launched",
      category: "Company News",
      date: "2024-11-23",
      summary: "Our firm introduces a new ESG-focused fund, targeting companies with strong environmental and social governance practices.",
      imageUrl: "/images/sustainable-investing.jpg",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Cryptocurrency Market Analysis: Latest Trends",
      category: "Crypto",
      date: "2024-11-22",
      summary: "Analysis of recent cryptocurrency market movements and their impact on traditional investment strategies.",
      imageUrl: "/images/crypto-trends.jpg",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Federal Reserve Updates Interest Rate Policy",
      category: "Economic Updates",
      date: "2024-11-21",
      summary: "Latest Federal Reserve announcement and its implications for investment strategies and market outlook.",
      imageUrl: "/images/federal-reserve.jpg",
      readTime: "7 min read"
    }
  ];

  const categories = [
    'all',
    'Market Analysis',
    'Company News',
    'Economic Updates',
    'Crypto',
    'Investment Strategies'
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Latest Investment News</h1>
          <p className="mt-2 text-gray-600">Stay updated with the latest market insights and company updates</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search news..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{article.category}</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Informed</h2>
          <p className="text-blue-100 mb-6">Subscribe to our newsletter for the latest investment insights and market updates</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;