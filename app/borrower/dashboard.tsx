"use client";

import { useState, Suspense } from 'react';
import Navbar from './navbar';
import Link from 'next/link';

export default function HomePage() {
  const loanInfo = {
    borrowerName: "Nichole Vine Alburo",
    creditScore: "10",
    loanId: "2283",
    interestType: "SIMPLE",
    interestRate: "4%",
    releaseDate: "03-22-28",
    startDate: "04-22-28",
    endDate: "03-22-29",
    period: "Month",
    numberOfPeriods: "12",
    status: "Active",
    dueDate: "04-22-28",
    remainingBalance: "90,000.00",
    totalPayments: "₱30,000.00"
  };

  const formatCurrency = (amount) =>
    Number(amount).toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    });

  const mockPayments = [
    {
      referenceNumber: "VL091232434",
      date: "04-22-2025",
      balance: 90000,
      periodAmount: 10000,
      paidAmount: 10000,
      modeofPayment: "PayMongo",
      receiptLink: "/receipts/vl091232434.pdf"
    },
    {
      referenceNumber: "VL091232435",
      date: "03-22-2025",
      balance: 100000,
      periodAmount: 10000,
      paidAmount: 10000,
      modeofPayment: "Cash",
      receiptLink: "/receipts/vl091232435.pdf"
    },
    {
      referenceNumber: "VL091232436",
      date: "02-22-2025",
      balance: 110000,
      periodAmount: 10000,
      paidAmount: 10000,
      modeofPayment: "Paymongo",
      receiptLink: "/receipts/vl091232436.pdf"
    }
  ];

  const [showNotif, setShowNotif] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, <span className="text-red-600">{loanInfo.borrowerName}</span>!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Credit Score */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-gray-800 hover:shadow-lg transition">
            <div className="text-xl font-semibold mb-1">Your Credit Score</div>
            <div className="text-sm text-gray-500 mb-4">Based on your repayment history</div>

            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3.8"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={
                    parseFloat(loanInfo.creditScore) >= 7.5
                      ? 'text-green-500'
                      : parseFloat(loanInfo.creditScore) >= 5
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }
                  stroke="currentColor"
                  strokeWidth="3.8"
                  strokeDasharray={`${(parseFloat(loanInfo.creditScore) / 10) * 100}, 100`}
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="text-5xl font-bold z-10">
                {loanInfo.creditScore}
              </span>
            </div>

            <span className="mt-4 text-sm font-medium text-gray-600">
              {
                parseFloat(loanInfo.creditScore) >= 7.5 ? 'Good Standing' :
                parseFloat(loanInfo.creditScore) >= 5 ? 'Fair Standing' :
                'Poor Standing'
              }
            </span>
          </div>

          {/* Loan Details */}
          <div className="bg-white shadow-md rounded-2xl p-6 text-gray-800 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Current Loan</h2>
              <span className="text-sm">Loan ID: <span className="text-red-500">{loanInfo.loanId}</span></span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p><strong>Interest Type:</strong> <span className="text-red-500">{loanInfo.interestType}</span></p>
                <p><strong>Interest Rate:</strong> {loanInfo.interestRate}</p>
                <p><strong>Release Date:</strong> {loanInfo.releaseDate}</p>
                <p><strong>Start Date:</strong> {loanInfo.startDate}</p>
                <p><strong>End Date:</strong> {loanInfo.endDate}</p>
                <p><strong>Period:</strong> {loanInfo.period}</p>
                <p><strong>No. of Periods:</strong> {loanInfo.numberOfPeriods}</p>
              </div>
              <div className="space-y-1">
                <p><strong>Status:</strong> <span className="text-green-600">{loanInfo.status}</span></p>
                <p><strong>Due Date:</strong> {loanInfo.dueDate}</p>
                <p><strong>Remaining Balance:</strong> {loanInfo.remainingBalance}</p>
                <p><strong>Total Payments:</strong> {loanInfo.totalPayments}</p>
              </div>
            </div>
          </div>

          {/* Payment Progress */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-between text-gray-800 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-4">Payment Progress</h2>
            <div className="relative w-40 h-40 mb-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-300"
                  stroke="currentColor"
                  strokeWidth="3.8"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-600"
                  strokeDasharray="10, 100"
                  stroke="currentColor"
                  strokeWidth="3.8"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-semibold">
                <span className="text-2xl text-gray-800">10%</span>
                <span className="text-gray-500">Paid</span>
              </div>
            </div>
            <button
            className="bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-white-600 transition"
          >
            <Link href="/upcoming-bills">Pay Now</Link>
          </button>

          </div>
        </div>

        {/* Payment Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-10">
          <Suspense fallback={<div>Loading...</div>}>
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Reference #</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Date</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Balance</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Period Amount</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Paid Amount</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">Mode</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">E-Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockPayments.map((payment, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-gray-900">{payment.referenceNumber}</td>
                    <td className="px-6 py-4 text-gray-700">{payment.date}</td>
                    <td className="px-6 py-4 text-gray-600">{formatCurrency(payment.balance)}</td>
                    <td className="px-6 py-4 text-gray-600">{formatCurrency(payment.periodAmount)}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{formatCurrency(payment.paidAmount)}</td>
                    <td className="px-6 py-4 text-gray-900">{payment.modeofPayment}</td>
                    <td className="px-6 py-4">
                      <a
                        href={payment.receiptLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                        download
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
