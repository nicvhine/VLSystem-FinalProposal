'use client';

import { useState } from 'react';
import Navbar from '../navbar';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const summary = {
    collectablePayment: 2033,
    collectedPayment: 2000,
    collectableAmount: 45000000,
    collectedAmount: 40000000,
  };
  const unpaidPayment = summary.collectablePayment - summary.collectedPayment;
  const unpaidAmount = summary.collectableAmount - summary.collectedAmount;

  const formatCurrency = (amount) =>
    amount.toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    });

  const payments = [
    { id: 'PMT001', client: 'Juan Dela Cruz', paidAmount: 8000, paidDate: '2025-03-15', paymentMethod: 'PayMongo' },
    { id: 'PMT002', client: 'Maria Santos', paidAmount: 12000, paidDate: '2025-04-10', paymentMethod: 'PayMongo' },
    { id: 'PMT003', client: 'Pedro Reyes', paidAmount: 5000, paidDate: '2025-04-22', paymentMethod: 'Cash' },
    { id: 'PMT004', client: 'Andrea Mendoza', paidAmount: 6000, paidDate: '2025-04-17', paymentMethod: 'PayMongo' },
  ];

  let displayed = payments.filter((p) =>
    [p.id, p.client, p.paidAmount.toString(), p.paidDate, p.paymentMethod]
      .some((val) => val.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (sortBy === 'date') {
    displayed = [...displayed].sort(
      (a, b) => new Date(a.paidDate) - new Date(b.paidDate)
    );
  } else if (sortBy === 'amount') {
    displayed = [...displayed].sort((a, b) => a.paidAmount - b.paidAmount);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Summary */}
      <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Collectable Payments</p>
            <p className="text-lg font-bold text-blue-800">{summary.collectablePayment}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Collected Payments</p>
            <p className="text-lg font-bold text-green-800">{summary.collectedPayment}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Uncollected Payments</p>
            <p className="text-lg font-bold text-red-800">{unpaidPayment}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Collectable Amount</p>
            <p className="text-lg font-bold text-blue-800">{formatCurrency(summary.collectableAmount)}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Collected Amount</p>
            <p className="text-lg font-bold text-green-800">{formatCurrency(summary.collectedAmount)}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Uncollected Amount</p>
            <p className="text-lg font-bold text-red-800">{formatCurrency(unpaidAmount)}</p>
          </div>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex gap-4 mb-6 px-4">
        <div className="relative flex-grow">
          <FiSearch className="absolute inset-y-0 left-3 mt-2 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search payments..."
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-200 text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none transition"
          >
            <option value="">Sort by</option>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <FiChevronDown className="absolute inset-y-0 right-3 mt-2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-4 mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Client</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Paid Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Payment Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayed.map((p) => (
              <tr
                key={p.id}
                className={`hover:bg-blue-50 cursor-pointer transition ${selectedPayment === p.id ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedPayment(p.id)}
              >
                <td className="px-6 py-4 text-sm text-gray-900">{p.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{p.client}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(p.paidAmount)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{p.paidDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{p.paymentMethod}</td>
              </tr>
            ))}
            {displayed.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4 text-gray-400">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}