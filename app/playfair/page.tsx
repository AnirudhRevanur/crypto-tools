"use client";
import React, { useState } from "react";
import encodePlayfairCipher from "./encode";
import decodePlayfairCipher from "./decode";

function Playfair() {
  const [encodeText, setEncodeText] = useState("");
  const [encodedText, setEncodedText] = useState("");

  const [decodeText, setDecodeText] = useState("");
  const [decodedText, setDecodedText] = useState("");

  const [keyword, setKeyword] = useState("");

  const baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  const keywordProcessed = keyword.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const uniqueKeywordChars = Array.from(new Set(keywordProcessed))

  const handleEncode = () => {
    const cleaned = encodeText.toUpperCase().replace(/[^A-Z0-9]/g, "")
    const result = encodePlayfairCipher(grid, cleaned)
    setEncodedText(result);
  };

  const handleDecode = () => {
    const result = decodePlayfairCipher(grid, decodeText)
    setDecodedText(result)
  }

  const allChars = uniqueKeywordChars.concat(
    baseChars.split("").filter((ch) => !uniqueKeywordChars.includes(ch))
  )

  const grid = Array.from({ length: 6 }, (_, row) =>
    Array.from({ length: 6 }, (_, col) => {
      const index = row * 6 + col;
      return allChars[index] || ""
    })
  )

  return (
    <div className="flex flex-col text-center p-4">
      <div className="text-3xl mb-6">Playfair (6×6) Cipher Tool</div>

      <div className="flex flex-col items-center gap-6">

        {/* Keyword + Grid Section */}
        <div className="rounded-lg border p-4 w-full max-w-md">
          <h2 className="text-2xl mb-2">Key Grid</h2>
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              if (/^[A-Z0-9]*$/.test(value)) {
                setKeyword(value);
              } else {
                alert("Only letters A–Z and digits 0–9 are allowed.");
              }
            }}
            placeholder="Enter keyword"
            className="border border-gray-300 p-2 w-full mb-4 text-black"
          />

          {/* Grid UI */}
          <div className="grid grid-cols-6 gap-1 justify-center">
            {grid.flat().map((cell, idx) => (
              <div
                key={idx}
                className="w-10 h-10 flex items-center justify-center border border-gray-500 rounded bg-white text-black"
              >
                {cell}
              </div>
            ))}
          </div>
        </div>

        {/* Encode Section */}
        <div className="rounded-lg border p-4 w-full max-w-md">
          <h2 className="text-2xl mb-2">Encode</h2>
          <input
            type="text"
            value={encodeText}
            onChange={(e) => setEncodeText(e.target.value.toUpperCase())}
            placeholder="Enter text to encode"
            className="border border-gray-300 p-2 w-full mb-2 text-black"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded w-full"
            onClick={handleEncode}
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
        <div className="rounded-lg border p-4 w-full max-w-md">
          <h2 className="text-2xl mb-2">Decode</h2>
          <input
            type="text"
            value={decodeText}
            onChange={(e) => setDecodeText(e.target.value.toUpperCase())}
            placeholder="Enter text to decode"
            className="border border-gray-300 p-2 w-full mb-2 text-black"
          />
          <button
            onClick={handleDecode}
            className="bg-blue-500 text-white p-2 rounded w-full"
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

      </div>
    </div>
  );
}

export default Playfair;
