"use client";

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
    <div className="min-h-screen bg-gray-50 text-black">
        <Navbar />
        <div className="flex justify-between items-center mb-4 p-6">
          <h1 className="text-2xl font-bold mt-10">Application ID: {id}</h1>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400">
              Hold
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400">
              Approve
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">
              Deny
            </button>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap mt-6">
          {/* Application Details */}
          <div className="w-full lg:w-3/4 pr-4 bg-gray-300 rounded-lg p-4">
            <div className="relative mt-4">
              {/* Image Placeholder in Top-Right */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-300 rounded-md shadow-md flex items-center justify-center overflow-hidden">
                <img src={imageUrl} alt="Application Image" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <p className="ml-10 mb-1">Name: {application.name}</p>
              <p className="ml-10 mb-1">Contact Number: {application.contactNumber}</p>
              <p className="ml-10 mb-1">Principal Amount: {formatCurrency(application.principalAmount)}</p>
              <p className="ml-10 mb-1">Interest Rate: {application.interestRate}%</p>
              <p className="ml-10 mb-1">Status: {application.status}</p>

              {/* House Status */}
              <div>
                <p className="mb-2 ml-10">House Status:</p>
                <label className="mr-4 ml-10">
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
              <p className="ml-10 mb-1">Application Date: {formatDate(application.applicationDate)}</p>
              <p className="ml-10 mb-1">Principal Amount: {formatCurrency(application.principalAmount)}</p>
              <p className="ml-10 mb-1">Interest Rate: {application.interestRate}%</p>
              <p className="ml-10 mb-1">Status: {application.status}</p>

              {/* Supporting Documents */}
              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Supporting Documents</h2>

                <ul className="list-disc pl-8">
                  <li>
                    <a
                      href="#"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Document 1: Proof of Identity
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Document 2: Proof of Address
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Document 3: Income Verification
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Document 4: Bank Statement
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comment Section */}
          <div className="w-full lg:w-1/4 pl-4 bg-white p-4 rounded-lg shadow-md mt-6 lg:mt-0">
            <h2 className="text-xl font-semibold mb-4">Notes</h2>

            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border rounded-md shadow-sm"
                rows={4}
                placeholder="Write your note..."
              />
            </div>

            <button
              onClick={handleCommentSubmit}
              className="flex justify-end bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit Note
            </button>

            <div className="mt-4">
              {comments.map((comment, index) => (
                <div key={index} className="border-t mt-4 pt-2">
                  <p className="text-base">{comment.text}</p>
                  <p className="text-xs text-gray-600 flex justify-end">{comment.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
  );
}