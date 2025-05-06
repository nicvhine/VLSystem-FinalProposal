"use client";

import { useState, Suspense } from 'react';
import Navbar from '../navbar';
import { FiSearch, FiChevronDown, FiLoader, FiUserPlus, FiEdit2, FiTrash2, FiMoreVertical, FiX } from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  // role: 'Admin' | 'Office Head' | 'Agent' | 'Collector';
  email: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
}

interface CreateUserFormData {
  name: string;
  email: string;
  // role: 'Admin' | 'Office Head' | 'Agent' | 'Collector';
  status: 'Active' | 'Inactive';
}

function CreateUserModal({ isOpen, onClose, onAdd }: { 
  isOpen: boolean; 
  onClose: () => void;
  onAdd: (data: CreateUserFormData) => void;
}) {
  const [formData, setFormData] = useState<CreateUserFormData>({
    name: '',
    email: '',
    // role: 'Agent',
    status: 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    // setFormData({ name: '', email: '', role: 'Agent', status: 'Active' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as CreateUserFormData['status'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        
        </form>
      </div>
    </div>
  );
}

function EditUserModal({ isOpen, onClose, onSave, user }: { 
  isOpen: boolean; 
  onClose: () => void;
  onSave: (data: CreateUserFormData) => void;
  user: User;
}) {
  const [formData, setFormData] = useState<CreateUserFormData>({
    name: user.name,
    email: user.email,
    // role: user.role,
    status: user.status
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            {/* <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as CreateUserFormData['role'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Admin">Admin</option>
              <option value="Office Head">Office Head</option>
              <option value="Agent">Agent</option>
              <option value="Collector">Collector</option>
            </select> */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as CreateUserFormData['status'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
}

function UserActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical">
        <button
          onClick={onEdit}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FiEdit2 className="mr-3 h-4 w-4" />
          Edit User
        </button>
        <button
          onClick={onDelete}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <FiTrash2 className="mr-3 h-4 w-4" />
          Delete User
        </button>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showActions, setShowActions] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: "USR001",
      name: "John Doe",
      // role: "Admin",
      email: "john.doe@example.com",
      status: "Active",
      lastActive: "2024-03-24T10:30:00"
    },
    {
      id: "USR002",
      name: "Jane Smith",
      // role: "Office Head",
      email: "jane.smith@example.com",
      status: "Active",
      lastActive: "2024-03-24T09:45:00"
    },
    {
      id: "USR003",
      name: "Robert Johnson",
      // role: "Agent",
      email: "robert.j@example.com",
      status: "Inactive",
      lastActive: "2024-03-20T15:20:00"
    },
    {
      id: "USR004",
      name: "Maria Garcia",
      // role: "Collector",
      email: "maria.g@example.com",
      status: "Active",
      lastActive: "2024-03-24T11:15:00"
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = Object.values(user).some(value => 
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'text-purple-700';
      case 'Office Head':
        return 'text-blue-700';
      case 'Agent':
        return 'text-green-700';
      case 'Collector':
        return 'text-yellow-700';
      default:
        return 'text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-red-100 text-red-700 border-red-200';
  };

  const handleEditUser = (userId: string) => {
    setShowActions(null);
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = (data: CreateUserFormData) => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...data }
          : user
      ));
      setShowEditModal(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = (userId: string) => {
    setShowActions(null);
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleCreateUser = (data: CreateUserFormData) => {
    const newUser: User = {
      id: `USR${String(users.length + 1).padStart(3, '0')}`,
      name: data.name,
      // role: data.role,
      email: data.email,
      status: data.status,
      lastActive: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
          </div>
        </div>
          
        {/* Search and Controls */}
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
              <option value="date">User.ID</option>
              <option value="amount">User.Name</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <FiChevronDown className="text-gray-400 w-4 h-4" />
            </div>
          </div>
        
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600 first:rounded-tl-lg">ID</th>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600 last:rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">{user.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  {/* <td className="px-6 py-4"> */}
                    {/* <span className={`px-2.5 py-1 rounded-md text-sm ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span> */}
                  {/* </td> */}
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowActions(showActions === user.id ? null : user.id);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <FiMoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    {showActions === user.id && (
                      <UserActions
                        onEdit={() => handleEditUser(user.id)}
                        onDelete={() => handleDeleteUser(user.id)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit User Modal */}
        {selectedUser && (
          <EditUserModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedUser(null);
            }}
            onSave={handleSaveEdit}
            user={selectedUser}
          />
        )}

        {/* Create User Modal */}
        <CreateUserModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onAdd={handleCreateUser}
        />
      </div>
    </div>
  );
} 