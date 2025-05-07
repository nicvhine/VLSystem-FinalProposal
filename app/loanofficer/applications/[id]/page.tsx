'use client';
import { useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import Navbar from '../../navbar';

interface Application {
  id: string;
  name: string;
  contactNumber: number;
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

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const application: Application = {
    id,
    name: 'John Doe',
    contactNumber: 97152116241,
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
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    window.location.href = '/loanofficer/applications'; // Navigate when "OK" is pressed
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className={`min-h-screen bg-gray-100 text-gray-900 ${showModal ? 'backdrop-blur-sm' : ''}`}>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold">Application ID: {id}</h1>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-medium px-4 py-2 rounded-lg">Hold</button>
            <button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-lg"
            >
              Approve
            </button>
            <button className="bg-red-500 hover:bg-red-400 text-white font-medium px-4 py-2 rounded-lg">Deny</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 flex-1 relative">
            <div className="absolute top-6 right-6 w-28 h-28 rounded-md overflow-hidden shadow-sm border">
              <img src={imageUrl} alt="Application" className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-1 pl-4">
              <p><strong>Name:</strong> {application.name}</p>
              <p><strong>Contact Number:</strong> {application.contactNumber}</p>
              <p><strong>Principal Amount:</strong> {formatCurrency(application.principalAmount)}</p>
              <p><strong>Interest Rate:</strong> {application.interestRate}%</p>
              <p><strong>Status:</strong> {application.status}</p>
            </div>

            <div className="mt-6 pl-4">
              <p className="font-semibold mb-2">House Status:</p>
              <label className="mr-6">
                <input
                  type="radio"
                  name="houseStatus"
                  value="Owned"
                  checked={houseStatus === 'Owned'}
                  onChange={() => setHouseStatus('Owned')}
                  className="mr-2"
                />
                Owned
              </label>
              <label>
                <input
                  type="radio"
                  name="houseStatus"
                  value="Rented"
                  checked={houseStatus === 'Rented'}
                  onChange={() => setHouseStatus('Rented')}
                  className="mr-2"
                />
                Rented
              </label>
            </div>

            <h2 className="text-xl font-semibold mt-10 mb-4">Other Details</h2>
            <div className="space-y-1 pl-4">
              <p><strong>Application Date:</strong> {formatDate(application.applicationDate)}</p>
              <p><strong>Principal Amount:</strong> {formatCurrency(application.principalAmount)}</p>
              <p><strong>Interest Rate:</strong> {application.interestRate}%</p>
              <p><strong>Status:</strong> {application.status}</p>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-3">Supporting Documents</h2>
              <ul className="list-disc pl-8 space-y-1 text-blue-600">
                <li><a href="#">Proof of Identity</a></li>
                <li><a href="#">Proof of Address</a></li>
                <li><a href="#">Income Verification</a></li>
                <li><a href="#">Bank Statement</a></li>
              </ul>
            </div>
          </div>

          {/* Right: Notes Section */}
          <div className="bg-white shadow-md rounded-xl p-6 w-full lg:max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Notes</h2>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Write your note..."
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm resize-none"
            />

            <button
              onClick={handleCommentSubmit}
              className="mt-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Submit Note
            </button>

            <div className="mt-6 space-y-4">
              {comments.map((c, idx) => (
                <div key={idx} className="border-t pt-2 text-sm">
                  <p className="text-gray-800">{c.text}</p>
                  <p className="text-gray-500 text-xs text-right mt-1">{c.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
{showModal && (
  <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white text-green-900 rounded-lg p-8 w-96 shadow-2xl transform transition-all duration-300 ease-in-out scale-105">
      <h3 className="text-2xl font-semibold text-center text-green-700">Application Approved!</h3>
      <p className="mt-4 text-lg text-center text-gray-700">The application has been forwarded to the manager.</p>
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleModalClose}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
