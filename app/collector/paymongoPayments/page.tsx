'use client';

import { useState } from 'react';
import Navbar from '../navbar';

export default function PaymongoPaymentsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [receiptNo, setReceiptNo] = useState('');

  const filters = ['All', 'Pending', 'Confirmed'];

  const [payments, setPayments] = useState([
    {
      id: 1,
      loanId: 'LN-001',
      clientName: 'Juan Dela Cruz',
      paidAmount: '₱5,000',
      paidDate: '2025-04-20',
      status: 'Pending',
      referenceNo: 'PM-202504191201',
    },
    {
      id: 2,
      loanId: 'LN-002',
      clientName: 'Maria Santos',
      paidAmount: '₱3,500',
      paidDate: '2025-04-19',
      status: 'Pending',
      referenceNo: 'PM-202504191202',
    },
    {
      id: 3,
      loanId: 'LN-003',
      clientName: 'Pedro Pascual',
      paidAmount: '₱7,200',
      paidDate: '2025-04-18',
      status: 'Confirmed',
      referenceNo: 'PM-202504181503',
    },
    {
      id: 4,
      loanId: 'LN-004',
      clientName: 'Andrea Mendoza',
      paidAmount: '₱6,000',
      paidDate: '2025-04-17',
      status: 'Pending',
      referenceNo: 'PM-202504171202',
    },
    {
      id: 5,
      loanId: 'LN-005',
      clientName: 'Carlos Ramirez',
      paidAmount: '₱4,800',
      paidDate: '2025-04-15',
      status: 'Confirmed',
      referenceNo: 'PM-202504151745',
    },
    {
      id: 6,
      loanId: 'LN-006',
      clientName: 'Sofia Reyes',
      paidAmount: '₱2,900',
      paidDate: '2025-04-13',
      status: 'Pending',
      referenceNo: 'PM-202504131311',
    },
    {
      id: 7,
      loanId: 'LN-007',
      clientName: 'Gabriel Cruz',
      paidAmount: '₱9,000',
      paidDate: '2025-04-12',
      status: 'Confirmed',
      referenceNo: 'PM-202504121000',
    }
  ]);

  const generateOfficeReceiptNo = (id) => {
    const now = new Date();
    return `OR-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${id}`;
  };

  const handleConfirmPaymentClick = (payment) => {
    setCurrentPayment(payment);
    setReceiptNo(generateOfficeReceiptNo(payment.id));
    setShowReceiptForm(true);
  };

  const handleGenerateReceipt = () => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === currentPayment.id
          ? {
              ...payment,
              status: 'Confirmed',
            }
          : payment
      )
    );
    alert('Receipt generated and payment confirmed!');
    setShowReceiptForm(false);
    setCurrentPayment(null);
    setReceiptNo('');
  };

  const filteredPayments =
    selectedFilter === 'All'
      ? payments
      : payments.filter((p) => p.status === selectedFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-4 py-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-700 mb-2">
          Showing PayMongo payments: <strong>{selectedFilter}</strong>
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-4 mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Loan ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Client Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Paid Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Paid Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Reference No</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.loanId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.clientName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.paidAmount}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.paidDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.referenceNo}</td>
                  <td className="px-4 py-2">
                    {payment.status === 'Pending' && (
                      <button
                        onClick={() => handleConfirmPaymentClick(payment)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                      >
                        Confirm Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center px-4 py-4 text-gray-400">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showReceiptForm && currentPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white border p-6 rounded-xl shadow-xl max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Generate Receipt</h3>
              <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
                <div>
                  <label className="font-medium">Client Name:</label>
                  <input
                    type="text"
                    value={currentPayment.clientName}
                    readOnly
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="font-medium">Paid Amount:</label>
                  <input
                    type="text"
                    value={currentPayment.paidAmount}
                    readOnly
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="font-medium">Paid Date:</label>
                  <input
                    type="text"
                    value={currentPayment.paidDate}
                    readOnly
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="font-medium">Office Receipt No:</label>
                  <input
                    type="text"
                    value={receiptNo}
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-100"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowReceiptForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateReceipt}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Generate Receipt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}