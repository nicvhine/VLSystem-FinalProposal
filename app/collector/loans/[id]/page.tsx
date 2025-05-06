'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../navbar';

const sampleLoans = [
  {
    id: "LN001",
    name: "John Doe",
    status: "Released",
    principalAmount: "50,000",
    period: "Monthly",
    months: 12,
    periods: 12,
    periodAmount: "4,500",
    interestType: "Flat",
    interestRate: "10%",
    processingFee: "500",
  },
];

export default function LoanDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [loan, setLoan] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const foundLoan = sampleLoans.find((loan) => loan.id === id);
      setLoan(foundLoan || null);
    }
  }, [id]);

  if (!loan) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-800">
        Loan not found or Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Loan Details</h1>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-8">

          {/* Client Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Client</h2>
            <p><strong>Name:</strong> {loan.name}</p>
          </div>

          {/* Basic Fields */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Fields</h2>
            <div className="space-y-2">
              <p><strong>Loan ID:</strong> {loan.id}</p>
              <p><strong>Status:</strong> {loan.status}</p>
              <p><strong>Principal Amount:</strong> {loan.principalAmount}</p>
              <p><strong>Period:</strong> {loan.period}</p>
              <p><strong>Number of Months:</strong> {loan.months}</p>
              <p><strong>Number of Period:</strong> {loan.periods}</p>
              <p><strong>Period Amount:</strong> {loan.periodAmount}</p>
            </div>
          </div>

          {/* Fees Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Fees</h2>
            <div className="space-y-2">
              <p><strong>Interest Type:</strong> {loan.interestType}</p>
              <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
              <p><strong>Processing Fee:</strong> {loan.processingFee}</p>
            </div>
          </div>

          {/* Progress Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Loan Progress</h2>
            <div className="space-y-2">
              <p><strong>Interest Type:</strong> {loan.interestType}</p>
              <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
              <p><strong>Processing Fee:</strong> {loan.processingFee}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}