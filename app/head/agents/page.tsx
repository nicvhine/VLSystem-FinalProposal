"use client";

import { useState, Suspense } from 'react';
import Navbar from '../navbar';
import { FiSearch, FiChevronDown, FiLoader, FiUserPlus, FiX } from 'react-icons/fi';

// interface Agent {
//   id: string;
//   name: string;
//   numberOfReferrals: number;
//   totalCommission: number;
//   status: string;
// }

// interface AddAgentFormData {
//   name: string;
//   status: string;
// }

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
}

// function AddAgentModal({ isOpen, onClose, onAdd }: { 
//   isOpen: boolean; 
//   onClose: () => void;
//   onAdd: (data: AddAgentFormData) => void;
// }) {
//   const [formData, setFormData] = useState<AddAgentFormData>({
//     name: '',
//     status: 'Active'
//   });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onAdd(formData);
  //   setFormData({ name: '', status: 'Active' });
  // };

  // if (!isOpen) return null;

  // return (
  //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  //     <div className="bg-white rounded-lg p-6 w-full max-w-md">
  //       <div className="flex justify-between items-center mb-4">
  //         <h2 className="text-xl font-semibold text-gray-800">Add New Agent</h2>
  //         <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
  //           <FiX className="w-5 h-5 text-gray-500" />
  //         </button>
  //       </div>
  //       <form onSubmit={handleSubmit}>
  //         <div className="mb-4">
  //           <label className="block text-sm font-medium text-gray-700 mb-1">
  //             Name
  //           </label>
  //           <input
  //             type="text"
  //             required
  //             value={formData.name}
  //             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
  //             placeholder="Enter agent name"
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label className="block text-sm font-medium text-gray-700 mb-1">
  //             Status
  //           </label>
  //           <select
  //             value={formData.status}
  //             onChange={(e) => setFormData({ ...formData, status: e.target.value })}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
  //           >
  //             <option value="Active">Active</option>
  //             <option value="Inactive">Inactive</option>
  //           </select>
  //         </div>
  //         <div className="flex justify-end gap-2">
  //           <button
  //             type="button"
  //             onClick={onClose}
  //             className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
  //           >
  //             Cancel
  //           </button>
            {/* <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Agent
            </button> */}
          // </div>
        // </form>
      // </div>
//     </div>
//   );
// }

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "AGT001",
      name: "John Doe",
      numberOfReferrals: 15,
      totalCommission: 25000,
      status: "Active"
    },
    {
      id: "AGT002",
      name: "Jane Smith",
      numberOfReferrals: 8,
      totalCommission: 12000,
      status: "Active"
    },
    {
      id: "AGT003",
      name: "Robert Johnson",
      numberOfReferrals: 20,
      totalCommission: 35000,
      status: "Inactive"
    },
    {
      id: "AGT004",
      name: "Maria Garcia",
      numberOfReferrals: 12,
      totalCommission: 18000,
      status: "Active"
    },
    {
      id: "AGT005",
      name: "David Wilson",
      numberOfReferrals: 25,
      totalCommission: 42000,
      status: "Active"
    },
    {
      id: "AGT006",
      name: "Sarah Brown",
      numberOfReferrals: 18,
      totalCommission: 30000,
      status: "Active"
    },
    {
      id: "AGT007",
      name: "Michael Lee",
      numberOfReferrals: 10,
      totalCommission: 15000,
      status: "Inactive"
    },
    {
      id: "AGT008",
      name: "Emma Davis",
      numberOfReferrals: 22,
      totalCommission: 38000,
      status: "Active"
    },
    {
      id: "AGT009",
      name: "William Taylor",
      numberOfReferrals: 16,
      totalCommission: 28000,
      status: "Active"
    },
    {
      id: "AGT010",
      name: "Olivia Martinez",
      numberOfReferrals: 14,
      totalCommission: 22000,
      status: "Active"
    },
    {
      id: "AGT011",
      name: "James Anderson",
      numberOfReferrals: 19,
      totalCommission: 32000,
      status: "Active"
    },
    {
      id: "AGT012",
      name: "Sophia White",
      numberOfReferrals: 11,
      totalCommission: 16000,
      status: "Inactive"
    }
  ]);

  const itemsPerPage = 10;

  // const handleAddAgent = (data: AddAgentFormData) => {
  //   const newAgent: Agent = {
  //     id: `AGT${String(agents.length + 1).padStart(3, '0')}`,
  //     name: data.name,
  //     numberOfReferrals: 0,
  //     totalCommission: 0,
  //     status: data.status
  //   };
  //   setAgents([...agents, newAgent]);
  //   setShowAddModal(false);
  // };

  // Filter agents based on search query
  const filteredAgents = agents.filter(agent =>
    Object.values(agent).some(value => 
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sort agents based on selected sort option
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'referrals') return b.numberOfReferrals - a.numberOfReferrals;
    if (sortBy === 'commission') return b.totalCommission - a.totalCommission;
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAgents = sortedAgents.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      case 'inactive':
        return 'text-red-600';
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
            <h1 className="text-2xl font-semibold text-gray-800">Agents</h1>
          </div>
          {/* <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FiUserPlus className="w-4 h-4" />
            Add Agent
          </button> */}
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
              <option value="name">Name</option>
              <option value="referrals">Referrals</option>
              <option value="commission">Commission</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <FiChevronDown className="text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Suspense fallback={<LoadingSpinner />}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">ID</th>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Number of Referrals</th>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Total Commission</th>
                  <th className="px-6 py-3.5 text-left text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentAgents.map((agent) => (
                  <tr 
                    key={agent.id} 
                    className={`hover:bg-blue-50/60 cursor-pointer transition-colors ${
                      selectedAgent === agent.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedAgent(agent.id)}
                  >
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{agent.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{agent.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{agent.numberOfReferrals}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatCurrency(agent.totalCommission)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(agent.status)}`}>
                        {agent.status}
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
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{Math.min(endIndex, sortedAgents.length)}</span> of{' '}
            <span className="font-medium">{sortedAgents.length}</span> agents
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Agent Modal */}
      {/* <AddAgentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddAgent}
      /> */}
    </div>
  );
} 