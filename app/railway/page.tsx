"use client";
import React, { useState } from "react";
import { railFenceCipher } from "./encode";

function Railway() {
  const [encodeText, setEncodeText] = useState("");
  const [shift, setShift] = useState(3);
  const [encodedText, setEncodedText] = useState("");

  const handleEncode = () => {
    // Ensure shift is valid
    if (shift <= 0) {
      alert("Shift value must be greater than 0");
      return;
    }

    // Call the railFenceCipher function with encodeText and shift
    const result = railFenceCipher(encodeText, shift);
    setEncodedText(result);
  };

  return (
    <div className="flex flex-col text-center p-4">
      <div className="text-3xl mb-4">Railway Cipher Tool</div>

      <div className="flex flex-col items-center">
        <div className="rounded-lg border border-1 p-4 mb-4 w-full max-w-md">
          <h2 className="text-2xl mb-2">Encode</h2>
          <input
            type="text"
            value={encodeText}
            onChange={(e) => setEncodeText(e.target.value)}
            placeholder="Enter text"
            className="border border-gray-300 p-2 w-full mb-2 text-black"
          />
          <input
            type="number"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value, 10))}
            placeholder="Shift"
            className="border border-gray-300 p-2 w-full text-black mb-2"
          />
          <button
            onClick={handleEncode}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Encode
          </button>
          {encodedText && (
            <div className="mt-4 p-2 border border-gray-300 rounded">
              <h3 className="text-xl mb-2">Encoded Text:</h3>
              <p>{encodedText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Railway;
