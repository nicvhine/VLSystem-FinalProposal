"use client";

import { useState, Suspense } from 'react';
import Navbar from '../navbar';
import { FiSearch, FiChevronDown, FiUser, FiPhone, FiMail, FiFilter, FiLoader, FiMoreVertical, FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';
import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  address: string;
  numberOfLoans: number;
  activeLoan: string;
  score: number;
  email?: string;
  phone?: string;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
}

function ClientActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical">
        <button
          onClick={onEdit}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FiEdit2 className="mr-3 h-4 w-4" />
          Edit Client
        </button>
        <button
          onClick={onDelete}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <FiTrash2 className="mr-3 h-4 w-4" />
          Delete Client
        </button>
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data - replace with actual data fetching
  const clients: Client[] = [
    {
      id: "CLT001",
      name: "John Doe",
      address: "123 Main St, City",
      numberOfLoans: 3,
      activeLoan: "Yes",
      score: 85,
      email: "john.doe@email.com",
      phone: "+1 234-567-8901"
    },
    {
      id: "CLT002",
      name: "Jane Smith",
      address: "456 Oak Ave, Town",
      numberOfLoans: 2,
      activeLoan: "No",
      score: 92,
      email: "jane.smith@email.com",
      phone: "+1 234-567-8902"
    },
    {
      id: "CLT003",
      name: "Robert Johnson",
      address: "789 Pine Rd, Village",
      numberOfLoans: 1,
      activeLoan: "Yes",
      score: 78,
      email: "robert.j@email.com",
      phone: "+1 234-567-8903"
    },
    {
      id: "CLT004",
      name: "Maria Garcia",
      address: "321 Elm St, Borough",
      numberOfLoans: 4,
      activeLoan: "Yes",
      score: 95,
      email: "maria.g@email.com",
      phone: "+1 234-567-8904"
    },
    {
      id: "CLT005",
      name: "David Wilson",
      address: "567 Maple Dr, City",
      numberOfLoans: 2,
      activeLoan: "Yes",
      score: 88,
      email: "david.w@email.com",
      phone: "+1 234-567-8905"
    },
    {
      id: "CLT006",
      name: "Sarah Brown",
      address: "890 Cedar Ln, Town",
      numberOfLoans: 1,
      activeLoan: "No",
      score: 75,
      email: "sarah.b@email.com",
      phone: "+1 234-567-8906"
    },
    {
      id: "CLT007",
      name: "Michael Lee",
      address: "432 Birch St, Village",
      numberOfLoans: 3,
      activeLoan: "Yes",
      score: 90,
      email: "michael.l@email.com",
      phone: "+1 234-567-8907"
    },
    {
      id: "CLT008",
      name: "Emma Davis",
      address: "765 Pine Ave, Borough",
      numberOfLoans: 2,
      activeLoan: "Yes",
      score: 87,
      email: "emma.d@email.com",
      phone: "+1 234-567-8908"
    },
    {
      id: "CLT009",
      name: "James Taylor",
      address: "234 Oak St, City",
      numberOfLoans: 1,
      activeLoan: "No",
      score: 82,
      email: "james.t@email.com",
      phone: "+1 234-567-8909"
    },
    {
      id: "CLT010",
      name: "Sophia Martinez",
      address: "876 Elm Ave, Town",
      numberOfLoans: 4,
      activeLoan: "Yes",
      score: 93,
      email: "sophia.m@email.com",
      phone: "+1 234-567-8910"
    },
    {
      id: "CLT011",
      name: "William Anderson",
      address: "543 Maple St, Village",
      numberOfLoans: 2,
      activeLoan: "Yes",
      score: 86,
      email: "william.a@email.com",
      phone: "+1 234-567-8911"
    },
    {
      id: "CLT012",
      name: "Olivia White",
      address: "789 Cedar Ave, Borough",
      numberOfLoans: 3,
      activeLoan: "Yes",
      score: 91,
      email: "olivia.w@email.com",
      phone: "+1 234-567-8912"
    },
    {
      id: "CLT013",
      name: "Benjamin King",
      address: "321 Birch Rd, City",
      numberOfLoans: 1,
      activeLoan: "No",
      score: 79,
      email: "benjamin.k@email.com",
      phone: "+1 234-567-8913"
    },
    {
      id: "CLT014",
      name: "Isabella Lopez",
      address: "654 Pine St, Town",
      numberOfLoans: 2,
      activeLoan: "Yes",
      score: 88,
      email: "isabella.l@email.com",
      phone: "+1 234-567-8914"
    },
    {
      id: "CLT015",
      name: "Lucas Scott",
      address: "987 Oak Ave, Village",
      numberOfLoans: 3,
      activeLoan: "Yes",
      score: 84,
      email: "lucas.s@email.com",
      phone: "+1 234-567-8915"
    }
  ];

  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    Object.values(client).some(value => 
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sort clients based on selected sort option
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'id') return a.id.localeCompare(b.id);
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'loans') return b.numberOfLoans - a.numberOfLoans;
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = sortedClients.slice(startIndex, endIndex);

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

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-600 bg-red-50';
  };

  const handleEditClient = (clientId: string) => {
    setShowActions(null);
    // Add edit logic here
  };

  const handleDeleteClient = (clientId: string) => {
    setShowActions(null);
    // Add delete logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Clients</h1>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search clients..."
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
              <option value="">Sort by...</option>
              <option value="name">Name</option>
              <option value="id">ID</option>
              <option value="score">Score</option>
              <option value="loans">Number of Loans</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <FiChevronDown className="text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Suspense fallback={<LoadingSpinner />}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-600 w-32">ID</th>
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-600 w-48">Name</th>
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-600 w-48">Address</th>
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-600 w-40">Number of Loans</th>
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-600 w-32">Active Loan</th>
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-gray-600 w-32">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentClients.map((client) => (
                  <tr 
                    key={client.id} 
                    className={`hover:bg-blue-50/60 cursor-pointer transition-colors ${
                      selectedClient === client.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedClient(client.id)}
                  >
                       <td className="px-6 py-4 text-sm text-gray-900">
                      <Link href={`/manager/clients/${client.id}`}>
                        {client.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-500">{client.name}</div>
                    </td>
                    <td><div className="text-sm text-gray-500">{client.address}</div></td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium text-gray-500">
                        {client.numberOfLoans} loans
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                        client.activeLoan === 'Yes' 
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}>
                        {client.activeLoan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getScoreColor(client.score)}`}>
                        {client.score}
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
            <span className="font-medium">{Math.min(endIndex, sortedClients.length)}</span> of{' '}
            <span className="font-medium">{sortedClients.length}</span> clients
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
    </div>
  );
} 