"use client";
import React, { useState, useEffect } from "react";
import encodeCaesarCipher from "./encode";
import decodeCaesarCipher from "./decode";

const BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Caesar() {
  const [encodeText, setEncodeText] = useState("");
  const [shift, setShift] = useState(3);
  const [encodedText, setEncodedText] = useState("");

  const [decodeText, setDecodeText] = useState("");
  const [decodedText, setDecodedText] = useState("");

  const handleEncode = () => {
    const result = encodeCaesarCipher(encodeText, shift);
    setEncodedText(result);
  };

  const handleDecode = () => {
    const result = decodeCaesarCipher(decodeText, shift);
    setDecodedText(result);
  };

  useEffect(() => {
    localStorage.setItem("Is this the key? ", "6");
  }, []);

  return (
    <div className="flex flex-col text-center p-4">
      <div className="text-3xl mb-4">Caesar Cipher Tool</div>

      <div className="flex flex-col items-center">
        {/* Encode Section */}
        <div className="rounded-lg border border-1 p-4 mb-6 w-full max-w-md">
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

        {/* Decode Section */}
        <div className="rounded-lg border border-1 p-4 mb-10 w-full max-w-md">
          <h2 className="text-2xl mb-2">Decode</h2>
          <input
            type="text"
            value={decodeText}
            onChange={(e) => setDecodeText(e.target.value)}
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
            onClick={handleDecode}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Decode
          </button>
          {decodedText && (
            <div className="mt-4 p-2 border border-gray-300 rounded">
              <h3 className="text-xl mb-2">Decoded Text:</h3>
              <p>{decodedText}</p>
            </div>
          )}
        </div>

        <div className="w-full mb-4">
          <div className="text-2xl mb-4">Shift Values</div>

          <div className="overflow-x-auto pb-2">
            <div className="inline-flex flex-col space-y-2 min-w-max p-2">
              {/* Row 1: Original alphabet */}
              <div className="flex gap-x-1">
                {BASE_CHARS.split("").map((char, i) => (
                  <div
                    key={`orig-${i}`}
                    className="font-bold w-10 h-10 flex items-center justify-center border border-gray-500 rounded text-black bg-white"
                  >
                    {char}
                  </div>
                ))}
              </div>

              {/* Row 2: Arrows */}
              <div className="flex gap-x-1">
                {BASE_CHARS.split("").map((_, i) => (
                  <div
                    key={`arrow-${i}`}
                    className="w-10 h-6 flex items-center justify-center text-gray-500"
                  >
                    ↓
                  </div>
                ))}
              </div>

              {/* Row 3: Shifted alphabet */}
              <div className="flex gap-x-1">
                {BASE_CHARS.split("").map((char, i) => {
                  const shiftedIndex = (i + shift) % BASE_CHARS.length;
                  return (
                    <div
                      key={`shift-${i}`}
                      className="font-bold w-10 h-10 flex items-center justify-center border border-gray-500 rounded text-blue-600 bg-white"
                    >
                      {BASE_CHARS[shiftedIndex]}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
