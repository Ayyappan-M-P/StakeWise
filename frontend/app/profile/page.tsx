"use client";
import React, { useState } from 'react';
import { 
  User, Edit, TrendingUp, TrendingDown, Upload, 
  CreditCard, Archive, Clock, CheckCircle, XCircle 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Interfaces
interface InvestmentPlan {
  id: string;
  name: string;
  totalAmount: number;
  startDate: string;
  status: 'Active' | 'Completed' | 'Pending';
  expectedReturn: number;
  investedAmount: number;
  remainingAmount: number;
}

interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  planName: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

const ComprehensiveInvestorProfile: React.FC = () => {
  // State Management
  const [profileImage, setProfileImage] = useState<string>('/api/placeholder/200/200');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    totalInvestment: 50000,
    investmentGrowth: 12.5
  });

  // Investment Data
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([
    {
      id: 'plan1',
      name: 'Tech Startup Fund',
      totalAmount: 100000,
      startDate: '2024-01-15',
      status: 'Active',
      expectedReturn: 15,
      investedAmount: 50000,
      remainingAmount: 50000
    },
    {
      id: 'plan2',
      name: 'Green Energy Portfolio',
      totalAmount: 75000,
      startDate: '2023-12-01',
      status: 'Completed',
      expectedReturn: 12,
      investedAmount: 75000,
      remainingAmount: 0
    }
  ]);

  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([
    {
      id: 'payment1',
      date: '2024-06-01',
      amount: 25000,
      planName: 'Tech Startup Fund',
      status: 'Completed'
    },
    {
      id: 'payment2',
      date: '2024-07-01',
      amount: 25000,
      planName: 'Tech Startup Fund',
      status: 'Pending'
    }
  ]);

  // Chart Data
  const investmentData = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 47000 },
    { month: 'Mar', amount: 48500 },
    { month: 'Apr', amount: 50000 },
    { month: 'May', amount: 52500 },
    { month: 'Jun', amount: 55000 }
  ];

  // Utility Functions
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProfileEdit = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'text-green-500';
      case 'Completed': return 'text-blue-500';
      case 'Pending': return 'text-yellow-500';
      case 'Failed': return 'text-red-500';
      default: return 'text-white-500';
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-xl font-semibold">Investor Profile</h2>
              <Edit 
                className="cursor-pointer text-blue-500 hover:text-blue-700" 
                onClick={() => setIsEditing(!isEditing)}
              />
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="relative group mb-4">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-40 h-40 rounded-full object-cover shadow-lg"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="profileImageUpload"
                  onChange={handleImageUpload}
                />
                <label 
                  htmlFor="profileImageUpload" 
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Upload size={20} />
                </label>
              </div>

              {isEditing ? (
                <div className="w-full space-y-4">
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => handleProfileEdit('name', e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Name"
                  />
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => handleProfileEdit('email', e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                  />
                  <input 
                    type="tel" 
                    value={profile.phoneNumber}
                    onChange={(e) => handleProfileEdit('phoneNumber', e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Phone Number"
                  />
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                  <p className="text-white-600">{profile.email}</p>
                  <p className="text-white-600">{profile.phoneNumber}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Investment Performance */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Investment Performance</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white-50 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white-600">Total Investment</span>
                    <User className="text-blue-500" />
                  </div>
                  <h4 className="text-2xl font-bold">${profile.totalInvestment.toLocaleString()}</h4>
                </div>
                <div className="bg-white-50 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white-600">Investment Growth</span>
                    {profile.investmentGrowth >= 0 ? (
                      <TrendingUp className="text-green-500" />
                    ) : (
                      <TrendingDown className="text-red-500" />
                    )}
                  </div>
                  <h4 className={`text-2xl font-bold ${profile.investmentGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {profile.investmentGrowth}%
                  </h4>
                </div>
                <div className="bg-white-50 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white-600">Net Profit</span>
                    <User className="text-blue-500" />
                  </div>
                  <h4 className={`text-2xl font-bold ${profile.investmentGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${Math.abs((profile.totalInvestment * profile.investmentGrowth / 100)).toLocaleString()}
                  </h4>
                </div>
              </div>
              
              {/* Investment Chart */}
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={investmentData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Plans */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-xl font-semibold">My Investment Plans</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add New Plan
              </button>
            </div>
            <div className="p-6 space-y-4">
              {investmentPlans.map(plan => (
                <div 
                  key={plan.id} 
                  className="bg-white-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold text-lg">{plan.name}</h4>
                    <div className="flex space-x-2 items-center">
                      <span>Total: ${plan.totalAmount.toLocaleString()}</span>
                      <span className={`font-semibold ${getStatusColor(plan.status)}`}>
                        {plan.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>Invested: ${plan.investedAmount.toLocaleString()}</p>
                    <p>Remaining: ${plan.remainingAmount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Payment History</h2>
            </div>
            <div className="p-6 space-y-4">
              {paymentRecords.map(payment => (
                <div 
                  key={payment.id} 
                  className="bg-white-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{payment.planName}</h4>
                    <p className="text-white-500">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${payment.amount.toLocaleString()}</p>
                    <span className={`text-sm ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveInvestorProfile;