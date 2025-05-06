"use client";

import { useEffect, useState } from 'react';
import Navbar from '../../navbar';

const sampleClients = [
  { id: "CLT001", name: "John Doe", address: "123 Main St", numberOfLoans: 3, activeLoan: "Yes", score: 85 },
  { id: "CLT002", name: "Jane Smith", address: "456 Oak Ave", numberOfLoans: 2, activeLoan: "No", score: 92 },
];

const imageUrl = '../idPic.jpg'; 

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [client, setClient] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const foundClient = sampleClients.find((client) => client.id === id);
      setClient(foundClient || null);
    }
  }, [id]);

  if (!client) return <div className="text-center text-xl font-semibold text-gray-800">Client not found or Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Navbar */}
      <Navbar />

      {/* Client Detail Container */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg relative">
          {/* Profile Image */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-300 rounded-md shadow-md m-5 flex items-center justify-center overflow-hidden">
            <img src={imageUrl} alt="Client Image" className="w-full h-full object-cover" />
          </div>

          {/* Client Details */}
          <div className="p-8 pt-12">
            <h1 className="text-2xl font-semibold text-gray-800">Basic Information</h1>
            <div className="mt-6 space-y-4">
              <p><strong>ID:</strong> {client.id}</p>
              <p><strong>Name:</strong> {client.name}</p>
              <p><strong>Address:</strong> {client.address}</p>
              <p><strong>Number of Loans:</strong> {client.numberOfLoans}</p>
              <p><strong>Active Loan:</strong> {client.activeLoan}</p>
              <p><strong>Score:</strong> {client.score}</p>
            </div>

            {/* Divider */}
            <hr className="my-6 border-t border-gray-300" />

            {/* Additional Information */}
            <h1 className="text-2xl font-semibold text-gray-800">Additional Information</h1>
            <div className="mt-6 space-y-4">
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