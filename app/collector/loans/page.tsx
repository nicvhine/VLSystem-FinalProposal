"use client";

import { useState, Suspense } from 'react';
import Navbar from '../navbar';
import { FiSearch, FiChevronDown, FiFilter, FiLoader, FiMoreVertical, FiPlus } from 'react-icons/fi';

interface Loan {
  id: string;
  name: string;
  releaseDate: string;
  endDate: string;
  principal: number;
  balance: number;
  status: string;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
}

export default function LoansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCollector, setSelectedCollector] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');

  // Sample data - replace with actual data fetching
  const loans: Loan[] = [
    {
      id: "LN001",
      name: "John Doe",
      releaseDate: "2024-01-15",
      endDate: "2024-07-15",
      principal: 50000,
      balance: 45000,
      status: "Active"
    },
    {
      id: "LN002",
      name: "Jane Smith",
      releaseDate: "2024-02-01",
      endDate: "2024-08-01",
      principal: 30000,
      balance: 30000,
      status: "Active"
    },
    {
      id: "LN003",
      name: "Robert Johnson",
      releaseDate: "2024-01-01",
      endDate: "2024-04-01",
      principal: 25000,
      balance: 5000,
      status: "Overdue"
    }
  ];

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'year', label: 'Year', hasDropdown: true },
    { id: 'collector', label: 'Collector', hasDropdown: true },
    { id: 'agent', label: 'Agent', hasDropdown: true },
    { id: 'overdue', label: 'Overdue' },
    { id: 'closed', label: 'Closed', hasDropdown: true }
  ];

  // Filter loans based on search query and active filters
  const filteredLoans = loans.filter(loan => {
    const matchesSearch = Object.values(loan).some(value => 
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (!matchesSearch) return false;
    
    switch (activeFilter) {
      case 'Overdue':
        return loan.status === 'Overdue';
      case 'Closed':
        return loan.status === 'Closed';
      default:
        return true;
    }
  });

  // Sort loans based on selected sort option
  const sortedLoans = [...filteredLoans].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === 'date') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    if (sortBy === 'amount') return b.principal - a.principal;
    return 0;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600';
      case 'overdue':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      case 'closed':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Loans</h1>
            {/* <p className="text-gray-500 mt-1">Manage and monitor all loans</p> */}
          </div>
          {/* <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FiPlus className="w-4 h-4" />
            New Loan
          </button> */}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {filterTabs.map((tab) => (
            <div key={tab.id} className="relative">
              <button
                onClick={() => setActiveFilter(tab.label)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === tab.label
                    ? 'bg-red-100 text-red-600'
                    : 'hover:bg-gray-100 text-gray-600'
                } ${tab.hasDropdown ? 'pr-8' : ''}`}
              >
                {tab.label}
                {tab.hasDropdown && (
                  <FiChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2" />
                )}
              </button>
            </div>
          ))}
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

        {/* Loans Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Suspense fallback={<LoadingSpinner />}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">ID</th>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Release Date</th>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">End Date</th>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Principal</th>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Balance</th>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Status</th>
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
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{loan.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{loan.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{loan.releaseDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{loan.endDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatCurrency(loan.principal)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatCurrency(loan.balance)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(loan.status)}`}>
                        {loan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Suspense>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{sortedLoans.length}</span> loans
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 