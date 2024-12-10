"use client";

import axios from 'axios';
import { useState } from 'react';

const PaymentPage = () => {
  const [userId, setUserId] = useState(1); // Replace with logged-in user's ID
  const [paymentMethod, setPaymentMethod] = useState('');
  const [company, setCompany] = useState('');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState({}); // Store payment-specific details

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/payment', {
        userId,
        paymentMethod,
        company,
        amount,
        details,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Make a Payment</h2>
      <div className="mt-4">
        <label>Choose a Company</label>
        <select value={company} onChange={(e) => setCompany(e.target.value)} className="border p-2">
          <option value="">Select a company</option>
          {[
            "AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NFLX", "NVDA", "META", "INTC", "ADBE",
            "AMD", "ORCL", "IBM", "CRM", "PYPL", "CSCO", "UBER", "SQ", "SPOT", "SHOP",
          ].map((comp) => (
            <option key={comp} value={comp}>{comp}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label>Payment Method</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border p-2">
          <option value="">Select a method</option>
          <option value="GPay">GPay</option>
          <option value="CreditCard">Credit Card</option>
          <option value="NetBanking">Net Banking</option>
        </select>
      </div>

      {/* Add conditionally rendered inputs for payment details */}
      {paymentMethod === 'GPay' && (
        <div className="mt-4">
          <label>Scan QR Code:</label>
          <img src="/path-to-qr-code.png" alt="QR Code" className="w-32 h-32" />
        </div>
      )}

      {paymentMethod === 'CreditCard' && (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Card Number"
            className="border p-2 w-full"
            onChange={(e) => setDetails({ ...details, cardNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            className="border p-2 w-full"
            onChange={(e) => setDetails({ ...details, expiryDate: e.target.value })}
          />
          <input
            type="password"
            placeholder="CVC"
            className="border p-2 w-full"
            onChange={(e) => setDetails({ ...details, cvc: e.target.value })}
          />
        </div>
      )}

      {paymentMethod === 'NetBanking' && (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Bank Name"
            className="border p-2 w-full"
            onChange={(e) => setDetails({ ...details, bankName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Account Number"
            className="border p-2 w-full"
            onChange={(e) => setDetails({ ...details, accountNo: e.target.value })}
          />
        </div>
      )}

      <div className="mt-4">
        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          className="border p-2 w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        onClick={handlePayment}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
