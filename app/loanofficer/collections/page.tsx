"use client";

import { useState, Suspense } from 'react';
import Navbar from '../navbar';
import { FiSearch, FiChevronDown, FiLoader, FiCalendar, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

interface Collection {
  id: string;
  name: string;
  balance: number;
  pastDue: number;
  periodAmount: number;
  paidAmount: number;
  status: 'Paid' | 'Partial' | 'Unpaid' | 'Overdue';
  collector: string;
  note?: string;
}

interface CollectionStats {
  totalPayments: number;
  collectedPayments: number;
  amountToCollect: number;
  collectedAmount: number;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
}

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [activeCollector, setActiveCollector] = useState('All');
  const [selectedDate, setSelectedDate] = useState('March 25, 2025');

  const collectors = ['All', 'Rodelo', 'Earl', 'Shiela', 'Voltair', 'Morgan', 'Stephen'];

  // Sample data - replace with actual data fetching
  const collections: Collection[] = [
    {
      id: "COL001",
      name: "John Doe",
      balance: 45000,
      pastDue: 5000,
      periodAmount: 5000,
      paidAmount: 5000,
      status: "Paid",
      collector: "Rodelo",
      note: "Paid on time"
    },
    {
      id: "COL002",
      name: "Jane Smith",
      balance: 75000,
      pastDue: 0,
      periodAmount: 7500,
      paidAmount: 3750,
      status: "Partial",
      collector: "Morgan",
      note: "Will pay remaining next week"
    },
    {
      id: "COL003",
      name: "Robert Johnson",
      balance: 100000,
      pastDue: 15000,
      periodAmount: 10000,
      paidAmount: 0,
      status: "Overdue",
      collector: "Shiela",
      note: "Not responding to calls"
    }
  ];

  const stats: CollectionStats = {
    totalPayments: 150,
    collectedPayments: 125,
    amountToCollect: 750000,
    collectedAmount: 625000
  };

  // Filter collections based on collector and search query
  const filteredCollections = collections.filter((collection) => {
    const matchesCollector =
      activeCollector === 'All' || collection.collector === activeCollector;
  
    const matchesSearch = Object.values(collection).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return matchesCollector && matchesSearch;
  });
  

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-700 border-green-200';
      case 'partial':
        return 'text-yellow-700 border-yellow-200';
      case 'unpaid':
        return 'text-gray-700 border-gray-200';
      case 'overdue':
        return 'text-red-700 border-red-200';
      default:
        return 'text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-[1600px] mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Collections</h1>
        </div>
      </div>

      {/* Collector Filters */}
      <div className="flex items-center gap-2 mb-6">
                  {collectors.map((collector) => (
                    <button
                      key={collector}
                      onClick={() => setActiveCollector(collector)}
                      className={`px-4 py-1.5 rounded-md text-sm ${
                        activeCollector === collector
                          ? 'bg-red-200 text-red-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {collector}
                    </button>
                  ))}
                </div>
          {/* Calendar and Stats Section */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* Calendar Section */}
            <div className="col-span-4 bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FiCalendar className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-800">Collection Calendar</h2>
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <span className="text-gray-500">Calendar Component Here</span>
              </div>
              <div className="mt-4 text-center text-blue-600 font-medium">
                {selectedDate}
              </div>
            </div>

            {/* Stats Section */}
            <div className="col-span-8 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <FiCheckCircle className="w-6 h-6 opacity-90" />
                  <h3 className="text-lg font-medium">Collection Progress</h3>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-3xl font-bold mb-1">{stats.collectedPayments}</div>
                    <div className="text-sm opacity-90">of {stats.totalPayments} Payments</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium">{Math.round((stats.collectedPayments / stats.totalPayments) * 100)}%</div>
                    <div className="text-sm opacity-90">Collection Rate</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <FiDollarSign className="w-6 h-6 opacity-90" />
                  <h3 className="text-lg font-medium">Amount Collected</h3>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-3xl font-bold mb-1">{formatCurrency(stats.collectedAmount)}</div>
                    <div className="text-sm opacity-90">of {formatCurrency(stats.amountToCollect)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium">{Math.round((stats.collectedAmount / stats.amountToCollect) * 100)}%</div>
                    <div className="text-sm opacity-90">Target Achieved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Sort Controls */}
           <div className="flex gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative min-w-[160px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-200 text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none transition-all"
            >
              <option value="">Sort by</option>
              <option value="date">Release Date</option>
              <option value="amount">Amount</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <FiChevronDown className="text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>

          {/* Collections Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Suspense fallback={<LoadingSpinner />}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">ID</th>
                    <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Balance</th>
                    <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Past Due</th>
                    <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Period Amount</th>
                    <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Paid Amount</th>
                    <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Collector</th>
                    <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCollections.map((collection) => (
                    <tr 
                      key={collection.id} 
                      className="hover:bg-blue-50/60 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{collection.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{collection.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(collection.balance)}</td>
                      <td className="px-6 py-4 text-sm text-red-600">{formatCurrency(collection.pastDue)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(collection.periodAmount)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(collection.paidAmount)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(collection.status)}`}>
                          {collection.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{collection.collector}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{collection.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Suspense>
          </div>
        </div>
      </div>
  );
} 