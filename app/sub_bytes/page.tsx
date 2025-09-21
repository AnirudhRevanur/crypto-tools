"use client";
import React, { useState } from "react";
import substituteBytes from "./substituteByte";

export default function SubBytes() {
  const [substituteText, setSubstituteText] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleSubstitute = () => {
    let input = substituteText.trim();

    if (!input) {
      setError("Enter a hexadecimal value");
      return;
    }

    if (input.startsWith("0x") || input.startsWith("0X")) {
      input = input.slice(2);
    }

    const hexRegex = /^[0-9A-Fa-f]+$/;

    if (!hexRegex.test(input)) {
      setError("Invalid input. Enter only hexadecimal values");
      return;
    }

    if (input.length !== 2) {
      setError("Input must be exactly 1 byte");
      return;
    }

    setError("");
    const byte = parseInt(input, 16);
    const substituted = substituteBytes(byte);
    setResult("0x" + substituted.toString(16).padStart(2, "0"));
  };

  return (
    <div className="flex flex-col text-center p-4">
      <div className="text-3xl mb-4">AES Sub Bytes</div>

      <div className="flex flex-col items-center">
        <div className="rounded-lg border border-1 p-4 mb-4 w-full max-w-md">
          <h2 className="text-2xl mb-2">Sub Bytes</h2>
          <input
            type="text"
            value={substituteText}
            onChange={(e) => setSubstituteText(e.target.value)}
            placeholder="Enter 1 byte here: "
            className="border border-gray-300 p-2 w-full mb-2 text-black"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleSubstitute}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Substitute
          </button>
          {result && (
            <p className="mt-4 text-lg">
              Substituted Value: {result}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
