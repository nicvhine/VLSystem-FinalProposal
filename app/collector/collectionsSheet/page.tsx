'use client';

import { useState, Suspense } from 'react';
import Navbar from '../navbar';
import Link from 'next/link';

export default function CollectionsSheetPage() {
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [selectedLoan, setSelectedLoan] = useState(null);

  const [isAddPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
  const [isLeaveNoteModalOpen, setLeaveNoteModalOpen] = useState(false);

  const filters = [
    'All',
    'Past Due',
    'Today',
    'Yesterday',
    'Last 3 Days',
    'Last 5 Days',
  ];

  const summary = {
    collectablePayment: 45,
    collectedPayment: 30,
    collectableAmount: 45000,
    collectedAmount: 40000,
  };

  const unpaidPayment = summary.collectablePayment - summary.collectedPayment;
  const unpaidAmount = summary.collectableAmount - summary.collectedAmount;

  const formatCurrency = (amount) =>
    amount.toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    });

  const loans = [
    {
      id: 'LN001',
      client: 'Juan Dela Cruz',
      period: '2025-05-07',
      endDate: '2025-03-31',
      lastPayment: '2025-03-15',
      pastDue: '2 Days',
      periodAmount: 10000,
      paidAmount: 8000,
      paidDate: '2025-03-15',
      status: 'Past Due',
    },
    {
      id: 'LN001',
      client: 'Juan Dela Cruz',
      period: '2025-04-10',
      endDate: '2025-03-31',
      lastPayment: '2025-03-15',
      pastDue: '2 Days',
      periodAmount: 10000,
      paidAmount: 8000,
      paidDate: '2025-03-15',
      status: 'Past Due',
    },
    {
      id: 'LN001',
      client: 'Juan Dela Cruz',
      period: '2025-04-10',
      endDate: '2025-03-31',
      lastPayment: '2025-03-15',
      pastDue: '2 Days',
      periodAmount: 10000,
      paidAmount: 8000,
      paidDate: '2025-03-15',
      status: 'Past Due',
    },
    {
      id: 'LN001',
      client: 'Juan Dela Cruz',
      period: '2025-04-10',
      endDate: '2025-03-31',
      lastPayment: '2025-03-15',
      pastDue: '2 Days',
      periodAmount: 10000,
      paidAmount: 8000,
      paidDate: '2025-03-15',
      status: 'Past Due',
    },
    {
      id: 'LN001',
      client: 'Juan Dela Cruz',
      period: '2025-04-10',
      endDate: '2025-03-31',
      lastPayment: '2025-03-15',
      pastDue: '2 Days',
      periodAmount: 10000,
      paidAmount: 8000,
      paidDate: '2025-03-15',
      status: 'Past Due',
    },
    {
      id: 'LN001',
      client: 'Juan Dela Cruz',
      period: '2025-05-06',
      endDate: '2025-03-31',
      lastPayment: '2025-03-15',
      pastDue: '2 Days',
      periodAmount: 10000,
      paidAmount: 8000,
      paidDate: '2025-03-15',
      status: 'Past Due',
    },
    {
      id: 'LN001',
      client: 'Juan Dela Cruz',
      period: '2025-05-06',
      endDate: '2025-03-31',
      lastPayment: '2025-03-15',
      pastDue: '2 Days',
      periodAmount: 10000,
      paidAmount: 8000,
      paidDate: '2025-03-15',
      status: 'Past Due',
    },
    {
      id: 'LN001',
      client: 'Juan Dela Cruz',
      period: '2025-05-06',
      endDate: '2025-03-31',
      lastPayment: '2025-03-15',
      pastDue: '2 Days',
      periodAmount: 10000,
      paidAmount: 8000,
      paidDate: '2025-03-15',
      status: 'Past Due',
    },
    {
      id: 'LN002',
      client: 'Maria Santos',
      period: 'Apr 2025',
      endDate: '2025-04-30',
      lastPayment: '2025-04-10',
      pastDue: '0',
      periodAmount: 12000,
      paidAmount: 12000,
      paidDate: '2025-04-10',
      status: 'Paid',
    },
  ];


  const getStatusColor = (status) => {
    switch (status) {
      case 'Past Due':
        return 'bg-red-500 text-white';
      case 'Paid':
        return 'bg-green-500 text-white';
      default:
        return 'bg-yellow-500 text-white';
    }
  };

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; 

  const sortedLoans = loans.filter((loan) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Past Due' && loan.pastDue !== '0') return true;
    if (selectedFilter === 'Today' && loan.period === formattedToday) return true;
    return false;
  });


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-4 py-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
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
            <p className="text-sm text-gray-600">Unpaid Payments</p>
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
            <p className="text-sm text-gray-600">Unpaid Amount</p>
            <p className="text-lg font-bold text-red-800">{formatCurrency(unpaidAmount)}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-600">Showing results for: <strong>{selectedFilter}</strong></p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-4 mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Client Name</th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Period</th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">End Date</th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Last Payment</th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Past Due</th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Period Amount</th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedLoans.map((loan) => (
                <tr
                  key={loan.id}
                  className={`hover:bg-blue-50/60 cursor-pointer transition-colors ${
                    selectedLoan === loan.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedLoan(loan.id)}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <Link href={`/loans/${loan.id}`}>
                      {loan.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{loan.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{loan.period}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{loan.endDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatCurrency(loan.periodAmount)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatCurrency(loan.paidAmount)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatCurrency(loan.periodAmount)}</td>
                  <td className="px-6 py-4 text-left">
                  <div className="flex space-x-4">
                    <button
                      className="px-3 py-1.5 text-sm bg-black text-white rounded hover:bg-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddPaymentModalOpen(true);
                      }}
                    >
                      Add Payment
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLeaveNoteModalOpen(true);
                      }}
                      className="px-3 py-1.5 text-sm bg-black text-white rounded hover:bg-gray-700"
                    >
                      Leave Note
                    </button>
                  </div>
                </td>

                </tr>
              ))}
            </tbody>
          </table>
        </Suspense>
      </div>

    
        {/* Add Payment Modal */}
        {isAddPaymentModalOpen && (
          <div className="fixed inset-0 z-20 text-black flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ease-in-out">
            <div className="bg-gradient-to-br from-blue-100 to-white p-8 rounded-2xl shadow-lg w-96">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Payment</h2>
              <form>
                <div className="mb-6">
                  <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-600">Payment Amount</label>
                  <input
                    type="number"
                    id="paymentAmount"
                    name="paymentAmount"
                    className="mt-2 p-4 w-full border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter payment amount"
                  />
                </div>
                <div className="flex justify-between gap-6">
                  <button
                    type="button"
                    onClick={() => setAddPaymentModalOpen(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold text-sm w-full hover:bg-gray-300 transition duration-200 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddPaymentModalOpen(false)}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold text-sm w-full transition duration-200 ease-in-out"
                  >
                    Add Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


      {/* Leave Note Modal */}
{isLeaveNoteModalOpen && (
  <div className="fixed inset-0 z-20 flex items-center text-black justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ease-in-out">
    <div className="bg-gradient-to-br from-blue-100 to-white p-8 rounded-2xl shadow-lg w-96">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Leave a Note</h2>
      <form>
        <div className="mb-6">
          <label htmlFor="note" className="block text-sm font-medium text-gray-600">Note</label>
          <textarea
            id="note"
            name="note"
            className="mt-2 p-4 w-full border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your note here"
          />
        </div>
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => setLeaveNoteModalOpen(false)}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold text-sm w-full hover:bg-gray-300 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setLeaveNoteModalOpen(false)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold text-sm w-full  transition duration-200 ease-in-out"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}