'use client';

import { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';

interface Agent {
  id: string;
  name: string;
  contactNumber: number;
  commissionedLoans: CommissionedLoan[];
}

interface CommissionedLoan {
  loanId: string;
  borrowerName: string;
  progress: number;
  amount: number;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
}

export default function AgentDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  const commissionRate = 5;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);

  useEffect(() => {
    setTimeout(() => {
      setAgent({
        id,
        name: 'John Doe',
        contactNumber: 97152116241,
        commissionedLoans: [
          { loanId: 'LN-001', borrowerName: 'Alice Reyes', progress: 60, amount: 500000 },
          { loanId: 'LN-002', borrowerName: 'Brian Tan', progress: 80, amount: 90000 },
          { loanId: 'LN-003', borrowerName: 'Carla Santos', progress: 40, amount: 100000 },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading || !agent) return <LoadingSpinner />;

  const totalCommission = agent.commissionedLoans.reduce(
    (acc, loan) => acc + loan.amount * (commissionRate / 100),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl bg-white text-black rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Agent Details</h1>

        <div className="space-y-2 mb-6">
          <p><strong>Agent ID:</strong> {agent.id}</p>
          <p><strong>Name:</strong> {agent.name}</p>
          <p><strong>Contact Number:</strong> {agent.contactNumber}</p>
          <p><strong>Total Commissioned Loans:</strong> {agent.commissionedLoans.length}</p>
          <p><strong>Total Commission Earned:</strong> {formatCurrency(totalCommission)}</p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Commissioned Loans Progress</h2>

        <div className="space-y-4">
          {agent.commissionedLoans.map((loan) => {
            const commissionEarned = loan.amount * (commissionRate / 100);
            return (
              <div key={loan.loanId} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p><strong>Loan ID:</strong> {loan.loanId}</p>
                <p><strong>Borrower:</strong> {loan.borrowerName}</p>
                <p><strong>Loan Amount:</strong> {formatCurrency(loan.amount)}</p>
                <p><strong>Commission:</strong> {formatCurrency(commissionEarned)}</p>
                <p className="mt-2 mb-1"><strong>Progress:</strong> {loan.progress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${loan.progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}