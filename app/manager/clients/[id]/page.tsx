'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../navbar';

const sampleClients = [
  { id: "CLT001", name: "John Doe", address: "123 Main St", numberOfLoans: 3, activeLoan: "Yes", score: 85 },
  { id: "CLT002", name: "Jane Smith", address: "456 Oak Ave", numberOfLoans: 2, activeLoan: "No", score: 92 },
];

const imageUrl = '/idPic.jpg'; // Ensure this is in the `public/` folder

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [client, setClient] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const foundClient = sampleClients.find((client) => client.id === id);
      setClient(foundClient || null);
    }
  }, [id]);

  if (!client) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-800">
      Client not found or Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <Navbar />

      {/* Client Details */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-red-800 shadow-md">
            <img src={imageUrl} alt="Client Image" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Client Information</h1>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h2>
            <div className="space-y-2 text-sm md:text-base">
              <p><strong>ID:</strong> {client.id}</p>
              <p><strong>Name:</strong> {client.name}</p>
              <p><strong>Address:</strong> {client.address}</p>
              <p><strong>Number of Loans:</strong> {client.numberOfLoans}</p>
              <p><strong>Active Loan:</strong> {client.activeLoan}</p>
              <p><strong>Score:</strong> {client.score}</p>
            </div>
          </div>

          <hr className="border-gray-300" />

          {/* Additional Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Information</h2>
            <div className="space-y-2 text-sm md:text-base">
              <p><strong>Mobile Number:</strong> {client.address}</p>
              <p><strong>Municipality:</strong> {client.address}</p>
              <p><strong>Barangay:</strong> {client.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}