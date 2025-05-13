'use client';
import { useRef, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import Navbar from '../../navbar';
import dynamic from 'next/dynamic';

interface Application {
  id: string;
  name: string;
  dateOfBirth: string;
  contactNumber: number;
  emailAddress: string;
  maritalStatus: string;
  noOfChildren: number;
  homeAddress: string;
  houseStatus: string;
  occupation: string;
  empStatus: string;
  companyName: string;
  companyAddress: string;
  monthlyIncome: number;
  lengthOfService: string;
  otherSource: string;
  purpose: string;
  loanAmount: number;
  loanType: string;
  loanTerms: number;
  interestRate: string;
  paymentSched: string;
  status: 'Pending' | 'Accepted' | 'Denied' | 'Onhold';
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

  const handleApprove = () => {
    const [firstName, lastName] = application.name.split(' ');
    const username = generateUsername(firstName, lastName);
    setBorrowerUsername(username);
    setShowModal(true);
  };

  const application: Application = {
    id,
    name: 'John Doe',
    dateOfBirth: '2002-03-25',
    contactNumber: 97152116241,
    emailAddress: 'johndoe@gmail.com',
    maritalStatus: 'Single',
    noOfChildren: 2,
    homeAddress: 'Cebu North Road, Lantawan, Cebu, Central Visayas, 6007, Philippines',
    houseStatus: 'Rented',
    occupation: 'Sales Lady',
    empStatus: 'Irregular',
    companyName: 'Gaisano Bogo',
    companyAddress: 'Dela Vina St., Bogo City',
    monthlyIncome: 15000,
    lengthOfService: '3 months',
    otherSource: 'none',
    purpose: 'Tuition Fee',
    loanAmount: 30000,
    loanType: 'Regular Loan Without Collateral',
    loanTerms: 10,
    interestRate: '10%',
    paymentSched: 'Monthly',
    status: 'Pending',
  };

  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [borrowerUsername, setBorrowerUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('changeme');

  const contentRef = useRef<HTMLDivElement>(null); // 🟩 Reference to container

  const generateUsername = (firstName: string, lastName: string): string => {
    return (
      firstName.slice(0, 3).toLowerCase() +
      lastName.charAt(0).toUpperCase() +
      lastName.slice(1).toLowerCase()
    );
  };

  const handleExportPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    if (contentRef.current) {
      html2pdf()
        .from(contentRef.current)
        .set({
          margin: 0.5,
          filename: `${application.name.replace(' ', '_')}_LoanAgreement.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .save();
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-6 text-right">
        <button
          onClick={handleExportPDF}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md shadow"
        >
          Export to PDF
        </button> 
        <button
              onClick={handleApprove}
              className="bg-green-500 ml-5 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Approve
            </button>
        <button
          onClick={handleExportPDF}
          className="bg-red-600 ml-5 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
        >
          Deny
        </button>
      </div>
      <div className="max-w-4xl mt-5 text-black mx-auto bg-white shadow-lg rounded-xl p-6" ref={contentRef}>
        <h2 className="text-center text-xl font-bold mb-4">VISTULA LENDING</h2>
        <p className="text-center text-sm mb-1">BG Business Center, Cantecson, Gairan</p>
        <p className="text-center text-sm mb-6">Bogo City, Cebu</p>

        <h3 className="text-center text-lg font-semibold underline mb-6">LOAN AGREEMENT</h3>

        <p className="mb-4">This Loan Agreement is made and executed by and between:</p>
        <p className="mb-2">
          <strong>VISTULA LENDING CORPORATION</strong>, a business establishment with office address at Gairan, Bogo City, Cebu,
          represented in this instance by its owner <strong>DIVINA DAMAYO ALBURO</strong>, of legal age, Filipino and a resident
          of Don Pedro Rodriguez St., Bogo City, Cebu, hereinafter known as the <strong>LENDER</strong>.
        </p>

        <p className="mb-4">AND</p>

        <p className="mb-4">
          <strong>{application.name}</strong>, of legal age, Filipino and resident of <strong>{application.homeAddress}</strong>,
          hereinafter known as the <strong>BORROWER</strong>.
        </p>

        <p className="font-semibold underline mb-3">WITNESSETH:</p>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          <li>
            <strong>Loan Amount.</strong> The LENDER agrees to lend and the BORROWER agrees to borrow the sum of <strong>{formatCurrency(application.loanAmount)}</strong>.
          </li>
          <li>
            <strong>Interest Rate.</strong> The loan shall accrue interest at a rate of <strong>{application.interestRate}</strong>.
          </li>
          <li>
            <strong>Repayment Terms.</strong> The BORROWER shall repay the loan:
            <ul className="list-disc ml-6 mt-1">
              <li>In <strong>{application.loanTerms}</strong> installment(s) of ₱3,300.00.</li>
              <li>First payment on <strong>May 13, 2025</strong>, then monthly.</li>
            </ul>
          </li>
          <li>
            Loan defaults include:
            <ul className="list-disc ml-6 mt-1">
              <li>3 days missed payment.</li>
              <li>Violation of agreement terms.</li>
            </ul>
          </li>
        </ol>

        <p className="mb-4">
          In case of default, the unpaid balance shall become due and demandable with 10% monthly surcharge.
        </p>

        <p className="mb-6">IN WITNESS WHEREOF, the parties here set their hands this _____ in Gairan, Bogo City, Cebu.</p>

        <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
          <div>
            <p className="font-semibold">LENDER</p>
            <p>DIVINA DAMAYO ALBURO</p>
            <p className="mt-4">Type of ID: ____________________</p>
            <p>ID Number: ______________________</p>
            <p>Valid Until: ______________________</p>
          </div>
          <div>
            <p className="font-semibold">BORROWER</p>
            <p>{application.name}</p>
            <p className="mt-4">Type of ID: ____________________</p>
            <p>ID Number: ______________________</p>
            <p>Valid Until: ______________________</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-16 mb-4 text-sm">
          <p>Signed in the presence of: _________________________</p>
          <p>Signed in the presence of: _________________________</p>
        </div>

        <p className="font-semibold mt-6 underline mb-2">ACKNOWLEDGEMENT</p>
        <p className="text-sm mb-6">
          Before me, a Notary Public for and in City of Bogo, Cebu, this day of ____________, personally appeared,
          indicated, known to me to be the same persons who executed the foregoing instrument and they acknowledged
          to me that the same is their free act and deed.
        </p>

        <p className="text-sm">WITNESS MY HAND AND SEAL on the date and place first written above.</p>
        <p className="text-sm mt-4">
          Doc. No. ______<br />
          Page No. ______<br />
          Book No. ______<br />
          Series of ______
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 text-black z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
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
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact"
                  value={application.emailAddress}
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
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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
