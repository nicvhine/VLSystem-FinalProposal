"use client";

import { useState } from 'react';
import Navbar from '../navbar';
import { FiSearch, FiChevronDown, FiLoader } from 'react-icons/fi';
import Link from 'next/link';

interface Application {
  id: string;
  name: string;
  applicationDate: string;
  principalAmount: number;
  interestRate: number;
  status: 'Evaluating' | 'Under Approval' | 'Accepted' | 'Denied';
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
}

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Sample data - replace with actual data fetching
  const applications: Application[] = [
    { id: "APP001", name: "John Doe", applicationDate: "2024-03-24", principalAmount: 50000, interestRate: 2.5, status: "Evaluating" },
    { id: "APP002", name: "Jane Smith", applicationDate: "2024-03-23", principalAmount: 75000, interestRate: 2.5, status: "Under Approval" },
    { id: "APP003", name: "Robert Johnson", applicationDate: "2024-03-22", principalAmount: 100000, interestRate: 3.0, status: "Accepted" },
    { id: "APP004", name: "Maria Garcia", applicationDate: "2024-03-21", principalAmount: 25000, interestRate: 2.0, status: "Denied" }
  ];

  // Filter applications based on status and search query
  const filteredApplications = applications.filter(application => {
    const matchesSearch = Object.values(application).some(value => 
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (!matchesSearch) return false;
    
    if (activeFilter === 'All') return true;
    return application.status === activeFilter;
  });

  // Sort applications based on selected criteria
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
    } else if (sortBy === 'amount') {
      return b.principalAmount - a.principalAmount;
    }
    return 0;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Applications</h1>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 mb-6">
          {['All', 'Evaluating', 'Under Approval', 'Accepted', 'Denied'].map(status => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-4 py-1.5 rounded-md text-sm ${
                activeFilter === status
                  ? 'bg-red-200 text-red-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
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

        {/* Applications Table */}
        <div className="bg-white">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600">Application Date</th>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600">Principal Amount</th>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600">Interest Rate</th>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <Link href={`/head/applications/${application.id}`}>
                      {application.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{application.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(application.applicationDate)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(application.principalAmount)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{application.interestRate}%</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-md text-sm ${
                      application.status === 'Accepted' ? 'text-green-700' :
                      application.status === 'Denied' ? 'text-red-700' :
                      application.status === 'Evaluating' ? 'text-yellow-700' :
                      'text-blue-700'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}