"use client";

import { useEffect, useState } from 'react';

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

  if (!client) return <div>Client not found or Loading...</div>; 

  return (
    <div className="min-h-screen bg-gray-50 text-black p-6">
      <div className="max-w-6xl mx-auto px-6 py-8 bg-gray-200 rounded-lg shadow-lg relative"> 
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-300 rounded-md shadow-md mr-5 mt-5 flex items-center justify-center overflow-hidden">
          <img src={imageUrl} alt="Application Image" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">{client.name}</h1>
        <div className="mt-4">
          <p><strong>ID:</strong> {client.id}</p>
          <p><strong>Address:</strong> {client.address}</p>
          <p><strong>Number of Loans:</strong> {client.numberOfLoans}</p>
          <p><strong>Active Loan:</strong> {client.activeLoan}</p>
          <p><strong>Score:</strong> {client.score}</p>
        </div>
      </div>
    </div>
  );
}