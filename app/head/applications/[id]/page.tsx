'use client';

import { useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import Navbar from '../../navbar';

interface Application {
  id: string;
  name: string;
  contactNumber: number;
  email: string;
  applicationDate: string;
  principalAmount: number;
  interestRate: number;
  status: 'Pending' | 'Accepted' | 'Denied' | 'Onhold';
  houseStatus: 'Owned' | 'Rented';
}

interface Comment {
  text: string;
  date: string;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
}

const generateUsername = (firstName: string, lastName: string): string => {
  const username = firstName.slice(0, 3).toLowerCase() + lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  return username;
};

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const application: Application = {
    id,
    name: 'John Doe',
    contactNumber: 97152116241,
    email: 'johndoe@gmail.com',
    applicationDate: '2024-03-25',
    principalAmount: 50000,
    interestRate: 3.0,
    status: 'Pending',
    houseStatus: 'Rented',
  };

  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [houseStatus, setHouseStatus] = useState<'Owned' | 'Rented'>(application.houseStatus);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [borrowerUsername, setBorrowerUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('changeme');
  const imageUrl = '../idPic.jpg';

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        text: comment,
        date: new Date().toLocaleString('en-PH', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleApprove = () => {
    const [firstName, lastName] = application.name.split(' ');
    const username = generateUsername(firstName, lastName);
    setBorrowerUsername(username);
    setShowModal(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
   
    <div className="min-h-screen bg-gray-50">
       <Navbar />
       <div className="max-w-[1600px] text-black mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Application ID: {id}</h1>

        
        </div>

        <h2 className="text-center text-2xl font-semibold mb-6">LOAN AGREEMENT</h2>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <p className="mb-4">
            This Loan Agreement is made and entered into on {formatDate(application.applicationDate)}, by and between:
          </p>
          <p className="ml-4 mb-2">
            <strong>Borrower:</strong> {application.name}, contact number {application.contactNumber}.
          </p>
          <p className="ml-4 mb-2">
            <strong>Lender:</strong> Vistula Lending Corp, a company legally operating under the Republic of the Philippines.
          </p>
          <p className="ml-4 mb-2">
            The Lender agrees to loan the Borrower the principal amount of <strong>{formatCurrency(application.principalAmount)}</strong>, 
            with an interest rate of <strong>{application.interestRate}%</strong> per month.
          </p>
          <p className="ml-4 mb-2">
            The Borrower agrees to repay the loan in accordance with the agreed-upon schedule and terms. 
            Failure to make payments may result in penalties and legal action.
          </p>
          <p className="ml-4 mb-2">
            House Status of the Borrower: <strong>{houseStatus}</strong>.
          </p>
          <p className="ml-4 mb-4">
            Both parties agree to abide by the laws governing loan agreements and fair lending practices.
          </p>
        </div>

        {comments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Comments</h3>
            {comments.map((comment, index) => (
              <div key={index} className="border-t pt-2 mt-2">
                <p className="text-base">{comment.text}</p>
                <p className="text-xs text-gray-600 text-right">{comment.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for creating borrower account */}
      {showModal && (
        <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl font-semibold mb-4">Create Borrower Account</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={borrowerUsername}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact"
                  value={application.contactNumber}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Email Number
                </label>
                <input
                  type="email"
                  id="contact"
                  value={application.email}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}