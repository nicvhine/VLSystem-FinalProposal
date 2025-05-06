"use client";

import { useEffect, useState } from 'react';
import Navbar from '../../navbar';

const sampleLoans = [
  { id: "LN001", name: "John Doe", status: "Released", principalAmount: "50,000", numberOfLoans: 3, activeLoan: "Yes", score: 85 },
];


export default function LoanDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [loan, setLoan] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const foundClient = sampleLoans.find((loan) => loan.id === id);
      setLoan(foundClient || null);
    }
  }, [id]);

  if (!loan) return <div className="text-center text-xl font-semibold text-gray-800">Client not found or Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Navbar */}
      <Navbar />

      {/* Client Detail Container */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg relative">        

          {/* Client Details */}
          <div className="p-8 pt-12">
            <h1 className="text-2xl font-semibold text-gray-800">Client</h1>
            <div className="mt-6 space-y-4">
              <p><strong>Name:</strong> {loan.name}</p>
            </div>

            {/* Divider */}
            <hr className="my-6 border-t border-gray-300" />

            <h1 className="text-2xl font-semibold text-gray-800">Basic Fields</h1>
            <div className="mt-6 space-y-4">
              <p><strong>Loan ID:</strong> {loan.id}</p>
              <p><strong>Status:</strong> {loan.status}</p>
              <p><strong>Principal Amount:</strong> {loan.principalAmount}</p>
              <p><strong>Period:</strong> {loan.address}</p>
              <p><strong>Number of Months:</strong> {loan.address}</p>
              <p><strong>Number of Period:</strong> {loan.address}</p>
              <p><strong>Period Amount:</strong> {loan.address}</p>

            {/* Divider */}
            <hr className="my-6 border-t border-gray-300" />

            <h1 className="text-2xl font-semibold text-gray-800">Fees</h1>
            <div className="mt-6 space-y-4">
              <p><strong>Interest Type:</strong> {loan.address}</p>
              <p><strong>Interest Rate:</strong> {loan.address}</p>
              <p><strong>Processing Fee:</strong> {loan.address}</p>

                {/* Divider */}
            <hr className="my-6 border-t border-gray-300" />
            <h1 className="text-2xl font-semibold text-gray-800">Loan Progress</h1>
            <div className="mt-6 space-y-4">
              <p><strong>Interest Type:</strong> {loan.address}</p>
              <p><strong>Interest Rate:</strong> {loan.address}</p>
              <p><strong>Processing Fee:</strong> {loan.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}