"use client";

import { useState, Suspense } from "react";
import Navbar from "../navbar";
import {
  FiSearch,
  FiChevronDown,
  FiLoader,
  FiUserPlus,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
} from "react-icons/fi";

interface User {
  id: string;
  name: string;
  role: "Admin" | "Office Head" | "Agent" | "Collector";
  email: string;
  status: "Active" | "Inactive";
  lastActive: string;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
}

function UserActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
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

function CreateUserModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (user: User) => void;
}) {
  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    role: "Admin",
    email: "",
    status: "Active",
    lastActive: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(newUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newUser.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newUser.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Role</label>
            <select
              name="role"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newUser.role}
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Office Head">Office Head</option>
              <option value="Agent">Agent</option>
              <option value="Collector">Collector</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Status</label>
            <select
              name="status"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newUser.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showActions, setShowActions] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const users: User[] = [
    {
      id: "USR001",
      name: "John Doe",
      role: "Admin",
      email: "john.doe@example.com",
      status: "Active",
      lastActive: "2024-03-24T10:30:00",
    },
    {
      id: "USR002",
      name: "Jane Smith",
      role: "Office Head",
      email: "jane.smith@example.com",
      status: "Active",
      lastActive: "2024-03-24T09:45:00",
    },
    {
      id: "USR003",
      name: "Robert Johnson",
      role: "Agent",
      email: "robert.j@example.com",
      status: "Inactive",
      lastActive: "2024-03-20T15:20:00",
    },
    {
      id: "USR004",
      name: "Maria Garcia",
      role: "Collector",
      email: "maria.g@example.com",
      status: "Active",
      lastActive: "2024-03-24T11:15:00",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "text-purple-700";
      case "Office Head":
        return "text-blue-700";
      case "Agent":
        return "text-green-700";
      case "Collector":
        return "text-yellow-700";
      default:
        return "text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-red-100 text-red-700 border-red-200";
  };

  const handleEditUser = (userId: string) => {
    setShowActions(null);
 
  };

  const handleDeleteUser = (userId: string) => {
    setShowActions(null);
  
  };

  const handleCreateUser = (newUser: User) => {
 
    console.log("New user created:", newUser);
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
              <option value="date">Release Date</option>
              <option value="amount">Amount</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <FiChevronDown className="text-gray-400 w-4 h-4" />
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <FiUserPlus className="w-4 h-4" />
            <span>Create User</span>
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600 first:rounded-l-md">
                  ID
                </th>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Role
                </th>
                <th className="bg-gray-100 px-6 py-3 text-left text-sm font-medium text-gray-600 last:rounded-r-md">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                    <td
                      className={`px-6 py-4 text-sm ${getRoleColor(user.role)}`}
                    >
                      {user.role}
                    </td>
                    <td className="relative px-6 py-4 text-sm text-gray-600">
                      <button
                        onClick={() =>
                          setShowActions(showActions === user.id ? null : user.id)
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FiMoreVertical className="w-5 h-5" />
                      </button>
                      {showActions === user.id && (
                        <UserActions
                          onEdit={() => handleEditUser(user.id)}
                          onDelete={() => handleDeleteUser(user.id)}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <CreateUserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateUser}
          />
        </Suspense>
      </div>
    </div>
  );
}