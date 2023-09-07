"use client";
import React, { useState } from "react";

export default function Refer() {
  const [copied, setCopied] = useState("");

  const handleCopy = (copyReferelId) => {
    setCopied(copyReferelId);
    navigator.clipboard.writeText(copyReferelId);
    // setTimeout(() => setCopied(false), 3000);
    alert("Referrel id copied!");
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="border border-gray-300 rounded-lg bg-white w-11/12 md:w-1/2 mt-4">
        <h4 className="flex justify-center items-center py-2 md:py-4 text-sm md:text-lg text-black bg-gray-100 border-b-2">
          Your Referral Earnings
        </h4>
        <div className="mx-2 my-1 text-sm md:text-lg md:my-4 flex justify-between items-center px-4 md:px-12">
          <span className="flex justify-center items-center flex-col">
            Referral Earning <p>₹ 0.00</p>
          </span>

          <span>|</span>

          <span className="flex justify-center items-center flex-col">
            Referred Players <p>0</p>
          </span>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg bg-white w-11/12 md:w-1/2 mt-4 md:my-8">
        <h4 className="flex justify-center items-center py-2 md:py-4 text-sm md:text-lg text-black bg-gray-100 border-b-2">
          Referral Code
        </h4>
        <div className="my-3 text-center text-sm md:text-lg md:my-4 flex justify-center items-center px-4 md:px-12">
          <p className="bg-gray-100 py-3 px-8 border rounded-l-lg">
            987654321{" "}
          </p>
          <button
            onClick={() => handleCopy(987654321)}
            className="bg-blue-500 text-white px-4 py-3 rounded-r-lg "
          >
            Copy
          </button>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg bg-white w-11/12 md:w-1/2 mt-4">
        <h4 className="flex justify-center items-center py-2 md:py-4 text-sm md:text-lg text-black bg-gray-100 border-b-2">
          How It Works
        </h4>
        <div className="my-3 text-center text-sm md:text-lg md:my-4 flex justify-between items-center flex-col px-4 md:px-12">
          <p className="border border-gray-300 rounded-t-lg px-2 md:px-12 py-4 w-full">
            You can refer and Earn 2% of your referral winning, every time
          </p>
          <p className="border border-gray-300 rounded-b-lg px-2 md:px-12 py-4 w-full">
            Like if your player plays for ₹10000 and wins, You will get ₹200 as
            referral amount.
          </p>
        </div>
      </div>
    </div>
  );
}
