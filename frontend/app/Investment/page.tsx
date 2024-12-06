"use client";

import React, { useState } from 'react';
import { CreditCard, Bank, ChevronRight, Check } from 'lucide-react';

// Mock investment companies data
const investmentCompanies = [
  { 
    id: 1, 
    name: 'Tech Innovations Ltd', 
    interestRate: 8.5, 
    sector: 'Technology',
    logo: '/api/placeholder/50/50'
  },
  { 
    id: 2, 
    name: 'Green Energy Corp', 
    interestRate: 7.2, 
    sector: 'Renewable Energy',
    logo: '/api/placeholder/50/50'
  },
  { 
    id: 3, 
    name: 'Financial Giants Inc', 
    interestRate: 9.1, 
    sector: 'Finance',
    logo: '/api/placeholder/50/50'
  }
];

const InvestmentPaymentPage = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [paymentStep, setPaymentStep] = useState('companies');
  const [formData, setFormData] = useState({
    accountName: '',
    bankAccount: '',
    ifscCode: '',
    otp: ''
  });

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setPaymentStep('payment');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setPaymentStep('success');
  };

  const renderCompaniesStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Investment Opportunities</h2>
      {investmentCompanies.map(company => (
        <div 
          key={company.id} 
          onClick={() => handleCompanySelect(company)}
          className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 cursor-pointer transition"
        >
          <div className="flex items-center space-x-4">
            <img 
              src={company.logo} 
              alt={`${company.name} logo`} 
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{company.name}</h3>
              <p className="text-sm text-gray-500">{company.sector}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600 font-bold">{company.interestRate}%</span>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Payment for {selectedCompany.name}
      </h2>
      <form onSubmit={handleSubmitPayment} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter account holder name"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
          <input
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter bank account number"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter IFSC code"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">OTP</label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center space-x-2"
        >
          <CreditCard className="mr-2" />
          Proceed to Payment
        </button>
      </form>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6 p-8">
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 p-4 rounded-full">
          <Check className="text-green-600 w-16 h-16" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
      <p className="text-gray-600">
        Your investment in {selectedCompany.name} has been processed.
      </p>
      <div className="space-y-2">
        <p><strong>Amount Invested:</strong> ₹10,000</p>
        <p><strong>Interest Rate:</strong> {selectedCompany.interestRate}%</p>
      </div>
      <button 
        onClick={() => setPaymentStep('companies')}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Back to Investments
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-6">
        {paymentStep === 'companies' && renderCompaniesStep()}
        {paymentStep === 'payment' && renderPaymentStep()}
        {paymentStep === 'success' && renderSuccessStep()}
      </div>
    </div>
  );
};

export default InvestmentPaymentPage;