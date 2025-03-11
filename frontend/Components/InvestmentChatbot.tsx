import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowUp, ArrowDown, Briefcase, TrendingUp, DollarSign, BarChart2, HelpCircle, PieChart, Star, AlertCircle, Award } from 'lucide-react';

type StockData = {
  date: string;
  value: number;
  volume?: number;
};

type ChatMessage = {
  type: 'question' | 'answer';
  content: string;
  stockData?: StockData[];
  stockSymbol?: string;
  stockName?: string;
  stockChange?: number;
  stockPrice?: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
};

const InvestmentChatbot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const predefinedQuestions = [
    "How do I start investing in stocks? 📈",
    "What is a good investment strategy for beginners? 💰",
    "Explain stock market indexes 📊",
    "How to analyze a company before investing? 🔍",
    "What are ETFs and mutual funds? 📂"
  ];

  // Generate more realistic stock data
  const generateDemoStockData = (trend: 'up' | 'down' | 'volatile'): StockData[] => {
    const data: StockData[] = [];
    let baseValue = 100;
    let volume = 0;
    
    for (let i = 0; i < 30; i++) {
      let change = 0;
      
      if (trend === 'up') {
        change = Math.random() * 3 - 0.5; // Mostly up
        volume = Math.floor(Math.random() * 1000000) + 2000000;
      } else if (trend === 'down') {
        change = Math.random() * 3 - 2.5; // Mostly down
        volume = Math.floor(Math.random() * 1500000) + 1500000;
      } else {
        change = Math.random() * 6 - 3; // Volatile
        volume = Math.floor(Math.random() * 2000000) + 1000000;
      }
      
      baseValue = Math.max(50, baseValue + change);
      
      const date = new Date();
      date.setDate(date.getDate() - (30 - i));
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: parseFloat(baseValue.toFixed(2)),
        volume: volume
      });
    }
    
    return data;
  };

  // Sentiment analysis based on content
  const analyzeSentiment = (content: string): 'positive' | 'negative' | 'neutral' => {
    const lowerContent = content.toLowerCase();
    const positiveWords = ['growth', 'increasing', 'profit', 'gain', 'bull', 'uptrend', 'opportunity'];
    const negativeWords = ['loss', 'risk', 'declining', 'falling', 'bear', 'downtrend', 'crisis'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (lowerContent.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (lowerContent.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  const getStockTrend = (question: string): 'up' | 'down' | 'volatile' => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('bull') || lowerQuestion.includes('growth') || lowerQuestion.includes('increasing')) {
      return 'up';
    } else if (lowerQuestion.includes('bear') || lowerQuestion.includes('declining') || lowerQuestion.includes('falling')) {
      return 'down';
    }
    return 'volatile';
  };

  const getStockSymbol = (question: string): string => {
    const commonStocks = {
      'apple': 'AAPL',
      'amazon': 'AMZN',
      'google': 'GOOGL',
      'microsoft': 'MSFT',
      'tesla': 'TSLA',
      'facebook': 'META',
      'meta': 'META',
      'netflix': 'NFLX'
    };
    
    const lowerQuestion = question.toLowerCase();
    
    for (const [company, symbol] of Object.entries(commonStocks)) {
      if (lowerQuestion.includes(company)) {
        return symbol;
      }
    }
    
    return 'DEMO';
  };

  const getStockName = (symbol: string): string => {
    const stockNames: {[key: string]: string} = {
      'AAPL': 'Apple Inc.',
      'AMZN': 'Amazon.com Inc.',
      'GOOGL': 'Alphabet Inc.',
      'MSFT': 'Microsoft Corporation',
      'TSLA': 'Tesla, Inc.',
      'META': 'Meta Platforms, Inc.',
      'NFLX': 'Netflix, Inc.',
      'DEMO': 'Demo Stock'
    };
    
    return stockNames[symbol] || 'Unknown Company';
  };

  async function generateAnswer(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!question.trim()) return;

    const currentQuestion = question;
    setQuestion(''); // Clear input immediately after sending

    // Add user question to chat history
    setChatHistory((prev) => [
      ...prev,
      { type: 'question', content: currentQuestion },
    ]);
    setGeneratingAnswer(true);

    // Determine if a stock graph should be included
    const includeStockData = currentQuestion.toLowerCase().includes('stock') || 
                             currentQuestion.toLowerCase().includes('price') ||
                             currentQuestion.toLowerCase().includes('performance');
    
    const stockSymbol = includeStockData ? getStockSymbol(currentQuestion) : undefined;
    const stockName = stockSymbol ? getStockName(stockSymbol) : undefined;
    const stockTrend = getStockTrend(currentQuestion);
    const stockData = includeStockData ? generateDemoStockData(stockTrend) : undefined;
    
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCvp4zeKA2jE9sS_DmLhvc_JTJUWezKEW0`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          contents: [
            {
              parts: [
                {
                  text: `You are InvestmentGuru, a specialized investment advisor chatbot with expertise in stocks, mutual funds, ETFs, and financial markets.
                  
                  When discussing investment topics, always include:
                  1. Clear explanations suitable for investors of all levels
                  2. Balanced perspectives on risks and rewards
                  3. Educational content that helps users understand the concepts
                  4. Actionable insights where appropriate
                  
                  For stock market questions:
                  - Explain key metrics like P/E ratio, market cap, dividend yield
                  - Discuss importance of fundamental and technical analysis
                  - Emphasize portfolio diversification and risk management
                  
                  For beginner questions:
                  - Start with fundamentals and basic terminology
                  - Suggest small, manageable steps to begin investing
                  - Highlight importance of long-term perspective
                  
                  Now, respond to this question about investments: "${currentQuestion}"
                  
                  Keep your response informative but conversational. Use simple language but include important financial concepts. Format with bullet points or numbered lists where appropriate for clarity.`
                }
              ]
            }
          ]
        },
      });

      // For demo purposes, we'll simulate a response since we don't have an actual API key
      let aiResponse = '';
      
      // If there's a valid API response, use it
      if (response?.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        aiResponse = response.data.candidates[0].content.parts[0].text;
      } else {
        // Otherwise, generate a demo response based on the question
        aiResponse = generateDemoResponse(currentQuestion);
      }

      // Create a random stock price and change percentage if stock data is included
      const stockPrice = stockData ? stockData[stockData.length - 1].value : undefined;
      const prevValue = stockData ? stockData[stockData.length - 2].value : 0;
      const stockChange = stockPrice && prevValue ? ((stockPrice - prevValue) / prevValue) * 100 : undefined;
      const sentiment = analyzeSentiment(aiResponse);

      setChatHistory((prev) => [
        ...prev,
        { 
          type: 'answer', 
          content: aiResponse, 
          stockData,
          stockSymbol,
          stockName,
          stockChange: stockChange ? parseFloat(stockChange.toFixed(2)) : undefined,
          stockPrice: stockPrice ? parseFloat(stockPrice.toFixed(2)) : undefined,
          sentiment
        },
      ]);
    } catch (error) {
      console.error('Error generating answer:', error);

      setChatHistory((prev) => [
        ...prev,
        { type: 'answer', content: 'Sorry, I encountered an issue while retrieving market information. Please try again in a moment.' },
      ]);
    } finally {
      setGeneratingAnswer(false);
    }
  }

  const generateDemoResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('start investing')) {
      return `# Getting Started with Stock Investing 🚀

Here's a simple roadmap for beginners:

1. **Set clear financial goals** 🎯
   - Determine what you're investing for (retirement, house, education)
   - Establish your time horizon and risk tolerance

2. **Build your knowledge foundation** 📚
   - Learn basic terminology (stocks, bonds, ETFs, mutual funds)
   - Understand how markets work and what influences prices

3. **Create a budget for investing** 💵
   - Only invest money you won't need in the short term
   - Start small and increase gradually as you learn

4. **Open a brokerage account** 🏦
   - Research brokers with low fees and good educational resources
   - Consider tax-advantaged accounts like IRAs for retirement

5. **Start with index funds or ETFs** 📊
   - These provide instant diversification across many companies
   - Lower risk than individual stocks for beginners

Remember that consistent investing over time is more important than timing the market perfectly! 🔄`;
    } else if (lowerQuestion.includes('strategy') || lowerQuestion.includes('beginner')) {
      return `# Investment Strategy for Beginners 💼

The best investment strategy for beginners is one that's simple, disciplined, and focused on the long term:

## Dollar-Cost Averaging 📅
Invest a fixed amount regularly regardless of market conditions. This reduces the impact of market volatility and removes emotional decision-making.

## Index Fund Investing 📈
Start with broad market index funds that track major indices like the S&P 500. These provide:
- Instant diversification
- Low fees
- Historically reliable returns over long periods

## Asset Allocation 🧩
Divide your investments between:
- Stocks (growth potential) 📊
- Bonds (stability) 📝
- Cash (emergency funds) 💰

A common starting point is the "100 minus your age" rule - the percentage to allocate to stocks.

## Priority Order ⚡
1. Emergency fund (3-6 months of expenses)
2. Employer retirement match (free money!)
3. Pay off high-interest debt
4. Tax-advantaged accounts (IRAs, 401(k)s)
5. Taxable investment accounts

As you gain experience, you can gradually add individual stocks or more specialized funds, but these core principles will serve you throughout your investment journey. 🚀`;
    } else if (lowerQuestion.includes('index')) {
      return `# Understanding Stock Market Indexes 📊

Stock market indexes are like scorecards that track the performance of selected groups of stocks, giving you a snapshot of how a particular market segment is performing.

## Major Global Indexes 🌎

1. **S&P 500** 🏆
   - Tracks 500 of the largest U.S. companies
   - Market-cap weighted (larger companies have more influence)
   - Widely considered the best benchmark for the U.S. stock market

2. **Dow Jones Industrial Average (DJIA)** 🏢
   - Contains 30 large "blue-chip" U.S. companies
   - Price-weighted (higher-priced stocks have more influence)
   - Oldest and most quoted index, but less representative of overall market

3. **NASDAQ Composite** 💻
   - Includes all companies listed on the NASDAQ exchange
   - Heavily weighted toward technology stocks
   - Often moves differently than other indexes due to tech concentration

4. **Russell 2000** 🔍
   - Tracks 2000 smaller U.S. companies (small-cap stocks)
   - Good indicator of the health of smaller businesses

5. **International Indexes** 🌐
   - FTSE 100 (UK), Nikkei 225 (Japan), DAX (Germany), etc.
   - Track leading companies in their respective countries

Indexes are useful for comparing your investment performance, creating index funds that track the market, and as economic indicators of overall market health. 📈`;
    } else if (lowerQuestion.includes('analyze') || lowerQuestion.includes('company')) {
      return `# How to Analyze a Company Before Investing 🔍

When evaluating a potential stock investment, consider both quantitative (numbers) and qualitative factors:

## Fundamental Analysis 📊

### Financial Health 💹
- **Revenue Growth**: Consistent year-over-year increases
- **Profit Margins**: Higher is better, compare to industry averages
- **Debt Levels**: Lower debt-to-equity ratios reduce risk
- **Cash Flow**: Positive operating cash flow is crucial

### Valuation Metrics 💰
- **P/E Ratio**: Price relative to earnings (compare to industry)
- **PEG Ratio**: P/E ratio divided by growth rate (under 1 may indicate undervaluation)
- **Price-to-Book**: Compare to historical averages and competitors

## Qualitative Analysis 🧐

### Business Model 🏭
- Is the company's business easy to understand?
- Does it have competitive advantages (moat)?
- How does it make money, and is that sustainable?

### Management 👥
- Track record of leadership
- Insider ownership (skin in the game)
- Capital allocation history

### Industry Position 🏆
- Market share trends
- Industry growth prospects
- Disruption risks

### Growth Catalysts 🚀
- New products or services
- Expansion opportunities
- Industry tailwinds

Remember to read annual reports (10-K), quarterly reports (10-Q), and listen to earnings calls to get management's perspective on the business. 📑`;
    } else if (lowerQuestion.includes('etf') || lowerQuestion.includes('mutual fund')) {
      return `# ETFs vs. Mutual Funds: Understanding the Differences 📂

Both ETFs (Exchange Traded Funds) and mutual funds allow you to invest in diversified baskets of securities, but they differ in several important ways:

## Exchange-Traded Funds (ETFs) 📈

### Advantages: ✅
- **Trading Flexibility**: Trade like stocks throughout the day at market prices
- **Tax Efficiency**: Generally create fewer taxable events
- **Lower Costs**: Often have lower expense ratios
- **Transparency**: Holdings are disclosed daily
- **Accessibility**: Can buy as little as one share

### Considerations: ⚠️
- Require a brokerage account
- May incur trading commissions (though many brokers now offer commission-free ETFs)

## Mutual Funds 📊

### Advantages: ✅
- **Automatic Investments**: Easy to set up regular contributions
- **Dollar-Based Investing**: Can invest exact dollar amounts
- **Active Management Options**: More actively managed options available
- **No Bid-Ask Spreads**: Trade at net asset value (NAV)

### Considerations: ⚠️
- Only trade once per day after market close
- May have minimum investment requirements
- Often higher expense ratios
- May have sales loads or redemption fees

## When to Choose Each 🤔

**Consider ETFs when:** 💼
- You want intraday trading capability
- Tax efficiency is important
- You're looking for the lowest costs
- You prefer more transparency

**Consider Mutual Funds when:** 📁
- You make regular small investments
- You want active management
- You prefer investing exact dollar amounts
- Automatic investment features are important

Both can be excellent vehicles for diversified, long-term investing. 🚀`;
    } else {
      return `Thank you for your question about investing in the stock market. 💼

When approaching investments, it's important to:

1. **Define your financial goals** 🎯 - Are you investing for retirement, a major purchase, or another objective?

2. **Understand your risk tolerance** ⚖️ - Different investments carry different levels of risk and potential reward.

3. **Consider your time horizon** ⏳ - Longer time horizons generally allow for taking more risk.

4. **Diversify your portfolio** 🧩 - Spreading investments across different asset classes helps manage risk.

5. **Start with the fundamentals** 📚 - Before investing in individual stocks, consider starting with index funds or ETFs that provide broad market exposure.

Remember that investing is personal - what works for someone else might not be right for your situation. Would you like more specific information about any particular aspect of investing? 💰`;
    }
  };

  const handlePredefinedQuestionClick = (predefinedQuestion: string) => {
    setQuestion(predefinedQuestion);
    setTimeout(() => {
      generateAnswer();
    }, 10);
  };

  // Get sentiment icon
  const getSentimentIcon = (sentiment?: 'positive' | 'negative' | 'neutral') => {
    if (sentiment === 'positive') return <div className="text-green-500"><ArrowUp size={14} /></div>;
    if (sentiment === 'negative') return <div className="text-red-500"><ArrowDown size={14} /></div>;
    return <div className="text-gray-500"><div className="w-3.5 h-0.5 bg-gray-500"></div></div>;
  };

  // Toggle chart type
  const toggleChartType = () => {
    setChartType(prevType => prevType === 'line' ? 'area' : 'line');
  };

  return (
    <div className="relative z-10">
      <button 
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-tr from-indigo-600 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="flex items-center">
            <DollarSign size={24} />
          </div>
        )}
      </button>

      <div className={`fixed bottom-20 right-6 w-[380px] sm:w-[420px] md:w-[480px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 backdrop-blur-sm border border-indigo-100 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-t-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg">InvestmentGuru 💰</h2>
                <p className="text-xs text-indigo-100">Your personal market advisor</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 py-1 px-3 rounded-full text-xs">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
                <span>Markets Open</span>
              </div>
            </div>
          </div>
        </div>
        
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-indigo-50 to-white">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-sm w-full max-w-md border border-indigo-100">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-tr from-indigo-100 to-blue-100 p-4 rounded-full">
                    <BarChart2 className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-4">Welcome to InvestmentGuru 💼</h3>
                <p className="text-sm text-gray-600 text-center mb-6">
                  I can help you understand investments, stocks, and financial markets. What would you like to know?
                </p>
                <div className="space-y-2">
                  {predefinedQuestions.map((q, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2.5 rounded-lg text-sm bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-md hover:from-indigo-50 hover:to-blue-50 hover:text-indigo-700 transition-all duration-200 border border-gray-200"
                      onClick={() => handlePredefinedQuestionClick(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-4 ${chat.type === 'question' ? 'flex justify-end' : ''}`}>
                  <div className={`${
                    chat.type === 'question' 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%] shadow-md' 
                      : 'bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 max-w-[90%] shadow-md hover:shadow-lg transition-shadow duration-200'
                  }`}>
                    
                    {chat.type === 'answer' && chat.stockData && chat.stockSymbol && (
                      <div className="mb-4 border-b pb-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center">
                              <span className="text-blue-700 font-bold">{chat.stockSymbol}</span>
                              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                                chat.stockChange && chat.stockChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {chat.sentiment === 'positive' ? '🔥 Hot' : chat.sentiment === 'negative' ? '❄️ Cool' : '⚖️ Neutral'}
                              </span>
                            </div>
                            <span className="text-xs text-blue-500">{chat.stockName}</span>
                          </div>
                          <div className={`flex items-center ${chat.stockChange && chat.stockChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <span className="font-bold">${chat.stockPrice}</span>
                            <span className="text-xs ml-1 flex items-center">
                              {chat.stockChange && chat.stockChange >= 0 ? (
                                <><ArrowUp size={12} /> +{chat.stockChange}%</>
                              ) : (
                                <><ArrowDown size={12} /> {Math.abs(chat.stockChange || 0)}%</>
                              )}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mb-2">
                          <div className="flex space-x-1 items-center">
                            <button 
                              onClick={toggleChartType}
                              className="text-xs py-1 px-2 bg-gray-100 hover:bg-indigo-100 rounded text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                            >
                              {chartType === 'line' ? 'Line Chart' : 'Area Chart'} 
                            </button>
                          </div>
                        </div>
                        
                        <div className="h-48 w-full bg-gradient-to-b from-gray-50 to-white p-1 rounded-lg border border-gray-200">
                          <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'line' ? (
                              <LineChart data={chat.stockData}>
                                <defs>
                                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={chat.stockChange && chat.stockChange >= 0 ? "#16a34a" : "#dc2626"} stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor={chat.stockChange && chat.stockChange >= 0 ? "#16a34a" : "#dc2626"} stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis 
                                  dataKey="date" 
                                  tickFormatter={(date) => date.substring(5)} 
                                  tick={{fontSize: 10, fill: '#6b7280'}}
                                />
                                <YAxis 
                                  domain={['dataMin - 5', 'dataMax + 5']} 
                                  tickFormatter={(value) => `$${value}`}
                                  tick={{fontSize: 10, fill: '#6b7280'}}
                                />
                                <Tooltip 
                                  formatter={(value) => [`$${value}`, 'Price']}
                                  labelFormatter={(label) => `Date: ${label}`}
                                  contentStyle={{borderRadius: '8px', border: '1px solid #e5e7eb'}}
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke={chat.stockChange && chat.stockChange >= 0 ? "#16a34a" : "#dc2626"} 
                                  dot={false}
                                  strokeWidth={2}
                                  activeDot={{ r: 6, fill: chat.stockChange && chat.stockChange >= 0 ? "#16a34a" : "#dc2626", stroke: 'white' }}
                                />
                              </LineChart>
                            ) : (
                              <AreaChart data={chat.stockData}>
                                <defs>
                                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={chat.stockChange && chat.stockChange >= 0 ? "#16a34a" : "#dc2626"} stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor={chat.stockChange && chat.stockChange >= 0 ? "#16a34a" : "#dc2626"} stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis 
                                  dataKey="date" 
                                  tickFormatter={(date) => date.substring(5)} 
                                  tick={{fontSize: 10, fill: '#6b7280'}}
                                />
                                <YAxis 
                                  domain={['dataMin - 5', 'dataMax + 5']} 
                                  tickFormatter={(value) => `$${value}`}
                                  tick={{fontSize: 10, fill: '#6b7280'}}
                                />
                                <Tooltip 
                                  formatter={(value) => [`$${value}`, 'Price']}
                                  labelFormatter={(label) => `Date: ${label}`}
                                  contentStyle={{borderRadius: '8px', border: '1px solid #e5e7eb'}}
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke={chat.stockChange && chat.stockChange >= 0 ? "#16a34a" : "#dc2626"} 
                                  fillOpacity={1}
                                  fill="url(#colorValue)"
                                />
                              </AreaChart>
                            )}
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                          <div className="flex items-