"use client";

import { useEffect, useState } from "react";

interface TrackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrackModal({ isOpen, onClose }: TrackModalProps) {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTrack = () => {
    setStatus("in-review");
  };

  const getProgress = () => {
    switch (status) {
      case "received":
        return 1;
      case "in-review":
        return 2;
      case "approved":
        return 3;
      default:
        return 0;
    }
  };

  const progressSteps = ["Received", "In Review", "Approved"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40rem] relative text-black ">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✖
        </button>
        <h2 className="text-sm text-gray-600 mb-4">Input your application ID</h2>
        <input
          type="text"
          placeholder="APPLICATION ID"
          className="w-full p-2 border rounded mb-4 uppercase"
        />
        <div className="flex justify-center mb-4">
          <button
            onClick={handleTrack}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Track
          </button>
        </div>

        {status && (
          <div className="mt-4">
            <h3 className="text-gray-700 font-semibold mb-2">Application Status:</h3>
            <div className="flex items-center justify-between">
              {progressSteps.map((step, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      index <= getProgress() - 1
                        ? "bg-red-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="mt-1 text-sm text-center">{step}</span>
                  {index < progressSteps.length - 1 && (
                    <div className="h-1 w-full bg-gray-300 mt-2 mb-2 relative">
                      <div
                        className={`absolute h-1 bg-red-600 top-0 left-0 ${
                          index < getProgress() - 1 ? "w-full" : "w-0"
                        } transition-all duration-500`}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}