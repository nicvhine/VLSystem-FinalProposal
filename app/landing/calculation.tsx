'use client';

import React, { useState } from 'react';

interface CalculationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalculationModal({ isOpen, onClose }: CalculationModalProps) {
  const [loanType, setLoanType] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [result, setResult] = useState<string>('');

  if (!isOpen) return null;

  const withCollateralTable = [
    { amount: 20000, interest: 7, months: 8 },
    { amount: 50000, interest: 5, months: 10 },
    { amount: 100000, interest: 4, months: 18 },
    { amount: 200000, interest: 3, months: 24 },
    { amount: 300000, interest: 2, months: 36 },
    { amount: 500000, interest: 1.5, months: 60 },
  ];

  const withoutCollateralTable = [
    { amount: 10000, interest: 10, months: 5 },
    { amount: 15000, interest: 10, months: 6 },
    { amount: 20000, interest: 10, months: 8 },
    { amount: 30000, interest: 10, months: 10 },
  ];

  const openTermTable = [
    { amount: 50000, interest: 6 },
    { amount: 100000, interest: 5 },
    { amount: 200000, interest: 4 },
    { amount: 500000, interest: 3 },
  ];

  const getTableByStatus = (status: string) => {
    switch (status) {
      case 'regularWith':
        return withCollateralTable;
      case 'regularWithout':
        return withoutCollateralTable;
      case 'openTerm':
        return openTermTable;
      default:
        return [];
    }
  };

  const calculateLoan = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loanType || !amount) {
      setResult('Please complete the form.');
      return;
    }

    const amt = Number(amount);

    // Add 2% service charge to the amount
    const serviceCharge = amt * 0.02;
    const amountWithServiceCharge = amt + serviceCharge;

    const selectedTable = getTableByStatus(loanType);
    const loanOption = selectedTable.find((opt) => opt.amount === amt);

    if (!loanOption) {
      setResult('Invalid amount for selected employment status.');
      return;
    }

    const rate = loanOption.interest;
    const months = loanOption.months || 0;

    const totalInterest = amountWithServiceCharge * (rate / 100);
    const totalRepayment = amountWithServiceCharge + totalInterest;
    const monthlyPayment = months > 0 ? totalRepayment / months : totalRepayment;

    setResult(
      `Monthly Payment: ₱${monthlyPayment.toFixed(2)}\nTerm: ${months > 0 ? `${months} months` : 'N/A'}\nTotal Payment: ₱${totalRepayment.toFixed(2)}\nService Charge: ₱${serviceCharge.toFixed(2)}`
    );
  };

  const renderTable = () => {
    let tableData: { amount: number; interest: number; months?: number }[] = []

    if (loanType === 'regularWith') {
      tableData = withCollateralTable;
    } else if (loanType === 'regularWithout') {
      tableData = withoutCollateralTable;
    } else if (loanType === 'openTerm') {
      tableData = openTermTable;
    }

    if (tableData.length === 0) return null;

    return (
      <div className="overflow-x-auto mt-4">
        <h3 className="font-semibold mb-2 text-gray-700">
          Available Loan Options ({loanType === 'regularWith'
            ? 'With Collateral'
            : loanType === 'regularWithout'
            ? 'Without Collateral'
            : 'Open-Term'}
        ):
        </h3>
        <table className="min-w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Amount (₱)</th>
              <th className="border px-4 py-2">Interest Rate (%)</th>
              {loanType !== 'openTerm' && (
                <th className="border px-4 py-2">Term (Months)</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className="bg-white hover:bg-gray-50">
                <td className="border px-4 py-2">{item.amount.toLocaleString()}</td>
                <td className="border px-4 py-2">{item.interest}%</td>
                {loanType !== 'openTerm' && (
                  <td className="border px-4 py-2">{item.months}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 text-black z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 text-xl hover:text-red-600"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Loan Simulation
        </h2>

        <form onSubmit={calculateLoan} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Loan Type</label>
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select loan type</option>
              <option value="regularWithout">Regular (Without Collateral)</option>
              <option value="regularWith">Regular (With Collateral)</option>
              <option value="openTerm">Open-Term</option>
            </select>
          </div>

          {renderTable()}

          <div>
            <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount (e.g. 50000)"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Calculate
          </button>
        </form>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded text-gray-800 whitespace-pre-line">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
