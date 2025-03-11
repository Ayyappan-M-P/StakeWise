"use client";

// types.ts
interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
}

interface InvestmentStrategy {
  title: string;
  description: string;
  icon: string;
  returnRate: number;
  risk: 'Low' | 'Medium' | 'High';
}

interface Achievement {
  value: string;
  label: string;
  description: string;
}

// components/HomePage.tsx
import { FC, useState, useEffect } from 'react';
import { 
  TrendingUp, ChartBar, Shield, Users, Award, 
  ArrowRight, Globe, Briefcase, LineChart
} from 'lucide-react';
import Chatbot from '@/Components/InvestmentChatbot';

const marketData: MarketData[] = [
  { symbol: "TECH-F", name: "Technology Fund", price: 156.78, change: 2.34, volume: 1245678 },
  { symbol: "GREEN-E", name: "Green Energy", price: 89.45, change: -1.23, volume: 987654 },
  { symbol: "REAL-F", name: "Real Estate Fund", price: 234.56, change: 0.89, volume: 567890 },
  { symbol: "DIV-IN", name: "Dividend Income", price: 78.90, change: 1.45, volume: 789012 }
];

const strategies: InvestmentStrategy[] = [
  {
    title: "Growth Portfolio",
    description: "High-growth stocks and emerging market opportunities focused on capital appreciation",
    icon: "TrendingUp",
    returnRate: 22.5,
    risk: 'High'
  },
  {
    title: "Balanced Fund",
    description: "Mix of stocks and bonds providing steady growth with moderate risk",
    icon: "ChartBar",
    returnRate: 15.8,
    risk: 'Medium'
  },
  {
    title: "Income Generator",
    description: "Dividend-paying stocks and bonds focused on regular income",
    icon: "Briefcase",
    returnRate: 12.4,
    risk: 'Low'
  }
];

const achievements: Achievement[] = [
  { value: "$25B+", label: "Assets Under Management", description: "Trusted by investors worldwide" },
  { value: "250K+", label: "Active Investors", description: "Growing community of successful investors" },
  { value: "15+", label: "Years Experience", description: "Proven track record of success" },
  { value: "98%", label: "Client Satisfaction", description: "Based on annual client surveys" }
];

const HomePage: FC = () => {
  const [currentMarketIndex, setCurrentMarketIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMarketIndex((prev) => (prev + 1) % marketData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Invest in Your Future with Confidence
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Access institutional-grade investment strategies, personalized portfolio management, 
                and expert financial guidance all in one platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold 
                  hover:bg-blue-50 transition-colors flex items-center">
                  Start Investing <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold 
                  hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Live Market Update</h3>
                <div className="space-y-4">
                  {marketData.map((item, index) => (
                    <div key={item.symbol} className={`transform transition-all duration-500 ${
                      index === currentMarketIndex ? 'scale-105 bg-white/10' : ''
                    } rounded-lg p-4`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{item.symbol}</div>
                          <div className="text-sm text-blue-200">{item.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${item.price}</div>
                          <div className={`text-sm ${
                            item.change >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {item.change >= 0 ? '+' : ''}{item.change}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl 
                transition-shadow">
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  {achievement.value}
                </div>
                <div className="font-semibold text-gray-900 mb-2">
                  {achievement.label}
                </div>
                <div className="text-gray-600">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Strategies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Investment Strategies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our professionally managed investment strategies designed to meet 
              your financial goals and risk tolerance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategies.map((strategy, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden 
                hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center 
                    justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {strategy.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {strategy.description}
                  </p>
                  <div className="flex justify-between items-center border-t pt-4">
                    <div>
                      <div className="text-sm text-gray-500">Annual Return</div>
                      <div className="text-lg font-bold text-blue-600">
                        {strategy.returnRate}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Risk Level</div>
                      <div className={`text-lg font-bold ${
                        strategy.risk === 'High' ? 'text-red-600' :
                        strategy.risk === 'Medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {strategy.risk}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Platform
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center 
                    justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-black-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Secure & Regulated
                    </h3>
                    <p className="text-gray-600">
                      Your investments are protected by state-of-the-art security and 
                      regulatory compliance measures.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center 
                    justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Global Access
                    </h3>
                    <p className="text-gray-600">
                      Invest in opportunities worldwide with our diverse portfolio of 
                      international markets.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center 
                    justify-center flex-shrink-0">
                    <LineChart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Advanced Analytics
                    </h3>
                    <p className="text-gray-600">
                      Make informed decisions with our professional-grade market analysis 
                      and portfolio tracking tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:pl-12">
              <img 
                src="platform.jpeg"
                alt="Platform Features"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Investment Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful investors who have trusted us with their financial future. 
            Get started with as little as $500.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold 
              hover:bg-blue-50 transition-colors flex items-center">
              Open Account <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold 
              hover:bg-white/10 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
        <Chatbot />
      </section>
    </div>
  );
};

export default HomePage;



