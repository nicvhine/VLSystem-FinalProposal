'use client';

import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mockLoanId] = useState("VL-" + Math.floor(100000 + Math.random() * 900000));
  const [language, setLanguage] = useState<'en' | 'ceb'>('en');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [spouseName, setSpouseName] = useState('');
  const [spouseOccupation, setSpouseOccupation] = useState('');
  const [houseStatus, setHouseStatus] = useState('');
  const [employmentType, setEmploymentType] = useState<'business' | 'employed' | ''>('');
  const [occupation, setOccupation] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [lengthOfService, setLengthOfService] = useState('');

  const handleSubmit = () => setShowSuccessModal(true);
  const closeModal = () => setShowSuccessModal(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="max-w-4xl mx-auto bg-white text-black p-6 shadow-md rounded-md mt-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Vistula Lending Corporation</h2>
          <p className="text-gray-600">Application Form</p>
        </div>

         <div className="mb-6">
          <label className="block mb-1 font-medium">Amount Applied:</label>
          <input type="number" className="w-full border p-2 rounded" />
        </div>

        <h3 className="text-lg font-bold mb-2">Basic Details</h3>
        <hr className="border-b border-gray-500 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Name of Borrower:</label>
            <input type="text" placeholder="Enter Name" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Date of Birth:</label>
            <input type="date" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Contact Number:</label>
            <input type="text" placeholder="Enter contact number" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Marital Status:</label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          {maritalStatus === 'married' && (
            <>
              <div>
                <label className="block mb-1 font-medium">Spouse Name:</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={spouseName}
                  onChange={(e) => setSpouseName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Spouse's Occupation:</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={spouseOccupation}
                  onChange={(e) => setSpouseOccupation(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {/* House Status */}
        <div className="mt-6">
          <label className="block mb-2 font-medium">House Status:</label>
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
        </div>

        {/* Address Input */}
        <div className="mt-6">
          <label className="block mb-2 font-medium">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Click on the map or type here"
          />
        </div>

        {/* Map */}
        <div className="mt-6 border rounded-lg overflow-hidden shadow-md">
          <MapContainer center={[12.8797, 121.774]} zoom={6} style={{ height: "400px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapComponent setAddress={setAddress} />
          </MapContainer>
        </div>

        {/* Employment Type */}
        <div className="mt-6">
          <label className="block font-medium mb-2">Source of Income:</label>
          <div className="flex gap-6">
            {['business', 'employed'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="employmentType"
                  value={type}
                  checked={employmentType === type}
                  onChange={() => setEmploymentType(type as 'business' | 'employed')}
                  className="mr-2"
                />
                {type === 'business' ? 'Business Owner' : 'Employed'}
              </label>
            ))}
          </div>

          {/* Conditional Fields */}
          {employmentType === 'business' && (
            <div className="mt-4">
              <label className="block font-medium mb-1">Type of Business:</label>
              <select className="w-full border p-2 rounded">
                <option value="">Select business type</option>
                <option value="retail">Retail</option>
                <option value="food">Food & Beverage</option>
                <option value="services">Services</option>
                <option value="others">Others</option>
              </select>
            </div>
          )}

          {employmentType === 'employed' && (
            <>
              <div className="mt-4">
                <label className="block font-medium mb-1">Occupation/Position:</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="mt-4">
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
              </div>

              <div className="mt-4">
                <label className="block font-medium mb-1">Company Name:</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="mt-4">
                <label className="block font-medium mb-1">Company Address:</label>
                <input
                  type="text"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="mt-4">
                <label className="block font-medium mb-1">Monthly Income:</label>
                <input
                  type="text"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="mt-4">
                <label className="block font-medium mb-1">Length of Service:</label>
                <input
                  type="text"
                  value={lengthOfService}
                  onChange={(e) => setLengthOfService(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
            </>
          )}
        </div>

        <h3 className="text-lg font-bold mt-5 mb-2">Loan Details</h3>
        <hr className="border-b border-gray-500 mb-6" />
        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-md max-w-sm text-center">
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
    </div>
  );
}
