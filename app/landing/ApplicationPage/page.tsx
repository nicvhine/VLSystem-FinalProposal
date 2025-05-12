'use client';

import { useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import axios from "axios";
import Navbar from "../navbar";

function MapComponent({ setAddress }: { setAddress: (address: string) => void }) {
  const [marker, setMarker] = useState<L.Marker | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (marker) marker.remove();

      const newMarker = L.marker([lat, lng]).addTo(e.target);
      setMarker(newMarker);

      axios.get("https://nominatim.openstreetmap.org/reverse", {
        params: {
          lat,
          lon: lng,
          format: "json",
        },
      })
        .then((response) => {
          const address = response.data.display_name;
          setAddress(address);
          newMarker.bindPopup(address).openPopup();
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
        });
    },
  });

  return null;
}

export default function ApplicationPage() {
  const [address, setAddress] = useState('');
  const [loanType, setLoanType] = useState<string>('');
  const [showLoanTypeModal, setShowLoanTypeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mockLoanId] = useState("VL-" + Math.floor(100000 + Math.random() * 900000));
  const [language, setLanguage] = useState<'en' | 'ceb'>('en');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [houseStatus, setHouseStatus] = useState('');
  const [incomeSource, setIncomeSource] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [selectedLoan, setSelectedLoan] = useState<{ amount: number; interest: number; months: number } | null>(null);
  const handleSubmit = () => setShowSuccessModal(true);
  const closeModal = () => setShowSuccessModal(false);
  const openLoanTypeModal = () => setShowLoanTypeModal(true);
  const handleLoanTypeSelection = (type: string) => {
    setLoanType(type);
    setShowLoanTypeModal(false);
  };
  
  const loanOptions = [
    { amount: 10000, interest: 10, months: 5 },
    { amount: 15000, interest: 10, months: 6 },
    { amount: 20000, interest: 10, months: 8 },
    { amount: 30000, interest: 10, months: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar language={language} setLanguage={setLanguage} />

      <div className="flex flex-col items-center justify-center p-6">
        <button
          onClick={openLoanTypeModal}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Select Loan Type
        </button>

        {loanType && (
          <div className="w-full max-w-4xl mt-6 p-6 bg-white text-black rounded-lg shadow-md space-y-6">
            <h3 className="text-xl text-red-600 font-bold">{loanType}</h3>

            {/* Without Collateral */}
            {loanType === 'Regular Loan w/o Collateral' && (
              <>
                {/* Basic Info */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">Basic Information</h4>
                  <div className="space-y-4">
                    <label className="block font-medium mb-1">Name:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter name" />

                    <label className="block font-medium mb-1">Date of Birth:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter date of birth" />

                    <label className="block font-medium mb-1">Contact Number:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter contact number" />

                    <label className="block font-medium mb-1">Email Address:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter email address" />
                  </div>
                </div>

                {/* Marital Info */}
                <div>
                  <label className="block font-medium mb-1">Marital Status:</label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                </div>

                {/* Spouse Info */}
                {maritalStatus === 'Married' && (
                  <div className="space-y-4">
                    <input className="w-full border p-2 rounded" placeholder="Enter spouse name" />
                    <input className="w-full border p-2 rounded" placeholder="Enter spouse occupation" />
                  </div>
                )}

                <label className="block font-medium mb-1">Number of Children:</label>
                <input className="w-full border p-2 rounded" placeholder="Enter number of children" />
                
                <label className="block font-medium mb-1">Home Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="Click on the map or type here"
                />

                {/* Map */}
                <div className="mt-4 rounded overflow-hidden shadow">
                  <MapContainer
                    center={[12.8797, 121.774]}
                    zoom={6}
                    style={{ height: "400px", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapComponent setAddress={setAddress} />
                  </MapContainer>
                </div>

                {/* House Status */}
                <label className="block font-medium mb-1 mt-4">House Status:</label>
                <div className="flex gap-6">
                  {['owned', 'rented'].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="radio"
                        name="houseStatus"
                        value={status}
                        checked={houseStatus === status}
                        onChange={() => setHouseStatus(status)}
                        className="mr-2"
                      />
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </label>
                  ))}
                </div>

                {/* Source of Income */}
                <div>
                  <h4 className="text-lg font-semibold mb-2 mt-4">Source of Income</h4>
                  <div className="flex gap-6">
                    {['business', 'employed'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="employmentType"
                          value={type}
                          checked={incomeSource === type}
                          onChange={() => setIncomeSource(type)}
                          className="mr-2"
                        />
                        {type === 'business' ? 'Business Owner' : 'Employed'}
                      </label>
                    ))}
                  </div>
                </div>

                {incomeSource === 'business' && (
                  <div className="mt-4 space-y-4">
                    <label className="block font-medium mb-1">Type of Business:</label>
                    <select className="w-full border mb-4  p-2 rounded">
                      <option value="">Select business type</option>
                      <option value="retail">Retail</option>
                      <option value="food">Food & Beverage</option>
                      <option value="services">Services</option>
                      <option value="others">Others</option>
                    </select>

                    <label className="block font-medium mb-1">Date Started:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter Date Started" />

                    <label className="block font-medium mb-1">Business Location:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter Business Location" />

                    <label className="block font-medium mb-1">Monthly Income:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter Monthly Income" />
                  </div>
                  
                )}

                {incomeSource === 'employed' && (
                  <div className="mt-4 space-y-4">
                    <label className="block font-medium mb-1">Occupation/Position:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter Occupation/Position" />
                    
                    <label className="block font-medium mb-1">Employment Status:</label>
                    <select
                      value={employmentStatus}
                      onChange={(e) => setEmploymentStatus(e.target.value)}
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Select employment status</option>
                      <option value="regular">Regular</option>
                      <option value="irregular">Irregular</option>
                    </select>

                    <label className="block font-medium mb-1">Company Name:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter Company Name" />

                    <label className="block font-medium mb-1">Company Address:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter Company Address" />

                    <label className="block font-medium mb-1">Monthly Income:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter Monthly Income" />

                    <label className="block font-medium mb-1">Length of Service:</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter Length of Service" />

                    <label className="block font-medium mb-1">Other Source of Income (if applicable):</label>
                    <input className="w-full border p-2 rounded" placeholder="Enter Other Source of Income" />
                  </div>
                )}

                {/* Loan Details */}
                <div>
                  <h4 className="text-lg  mt-4 space-y-4 font-semibold mb-2">Loan Details</h4>
                  <div className="space-y-4">
                  <label className="block font-medium mb-1">Loan Purpose:</label>
                  <input className="w-full border p-2 rounded" placeholder="Enter Loan Purpose" />

                  <label className="block font-medium mb-2">Character References (3):</label>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Person 1 */}
                    <div>
                      <input
                        className="w-full border p-2 rounded mb-2"
                        placeholder="Name 1"
                      />
                      <input
                        className="w-full border p-2 rounded"
                        placeholder="Phone 1"
                      />
                    </div>

                    {/* Person 2 */}
                    <div>
                      <input
                        className="w-full border p-2 rounded mb-2"
                        placeholder="Name 2"
                      />
                      <input
                        className="w-full border p-2 rounded"
                        placeholder="Phone 2"
                      />
                    </div>

                    {/* Person 3 */}
                    <div>
                      <input
                        className="w-full border p-2 rounded mb-2"
                        placeholder="Name 3"
                      />
                      <input
                        className="w-full border p-2 rounded"
                        placeholder="Phone 3"
                      />
                    </div>
                  </div>


                  <label className="block font-medium mb-1">Loan Amount:</label>
                  <select
                    className="w-full border p-2 rounded"
                    onChange={(e) => {
                      const selected = loanOptions.find((opt) => opt.amount === parseInt(e.target.value));
                      if (selected) setSelectedLoan(selected);
                    }}
                  >
                    <option value="">Select amount</option>
                    {loanOptions.map((opt) => (
                      <option key={opt.amount} value={opt.amount}>
                        ₱{opt.amount.toLocaleString()}
                      </option>
                    ))}
                  </select>

                  <label className="block font-medium mb-1">Loan Type:</label>
                  <input className="w-full border p-2 rounded" value={loanType} />

                  <label className="block font-medium mb-1">Loan Terms:</label>
                  <input className="w-full border p-2 rounded" value={selectedLoan?.months}/>

                  <label className="block font-medium mb-1">Monthly Interest Rate:</label>
                  <input className="w-full border p-2 rounded" value={selectedLoan?.interest}/>

                  <label className="block font-medium mb-1">Payment Schedule/Period:</label>
                  <input className="w-full border p-2 rounded" placeholder="Enter Payment Schedule/Period" />

                  <label className="block font-medium mb-1">Loan Type:</label>
                  <input className="w-full border p-2 rounded" placeholder="Enter Amount Applied" />

          
                </div>
                </div>


                <button
                  onClick={handleSubmit}
                  className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  Submit Application
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Loan Type Modal */}
      {showLoanTypeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setShowLoanTypeModal(false)}
        >
          <div
            className="bg-white p-6 rounded-md shadow-md max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg text-black font-bold mb-4">Select Loan Type</h2>
            {["Regular Loan w/o Collateral", "Regular Loan w/ Collateral", "Open-Term Loan"].map((type) => (
              <button
                key={type}
                onClick={() => handleLoanTypeSelection(type)}
                className="block w-full mb-3 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-md shadow-md max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Application Submitted!</h2>
            <p>Your Loan ID: <strong>{mockLoanId}</strong></p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
