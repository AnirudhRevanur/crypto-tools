"use client";
import React, { useState } from "react";
import encodeVigenereCipher from "./encode"; // Ensure this function is adapted for Vigenère cipher
import decodeVigenereCipher from "./decode"; // Ensure this function is adapted for Vigenère cipher

function Vigenere() {
  const [encodeText, setEncodeText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [encodedText, setEncodedText] = useState("");

  const [decodeText, setDecodeText] = useState("");
  const [decodedText, setDecodedText] = useState("");

  const handleEncode = () => {
    const result = encodeVigenereCipher(encodeText, keyword);
    setEncodedText(result);
  };

  const handleDecode = () => {
    const result = decodeVigenereCipher(decodeText, keyword);
    setDecodedText(result);
  };

  return (
    <div className="flex flex-col text-center p-4">
      <div className="text-3xl mb-4">Vigenère Cipher Tool</div>

      <div className="flex flex-col items-center">
        <div className="rounded-lg border border-1 p-4 mb-4 w-full max-w-md">
          <h2 className="text-2xl mb-2">Encode</h2>
          <input
            type="text"
            value={encodeText}
            onChange={(e) => setEncodeText(e.target.value)}
            placeholder="Enter text to encode"
            className="border border-gray-300 p-2 w-full mb-2 text-black"
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
            className="border border-gray-300 p-2 w-full mb-2 text-black"
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

        <div className="rounded-lg border border-1 p-4 w-full max-w-md">
          <h2 className="text-2xl mb-2">Decode</h2>

          <input
            type="text"
            value={decodeText}
            onChange={(e) => setDecodeText(e.target.value)}
            placeholder="Enter text to decode"
            className="border border-gray-300 p-2 w-full mb-2 text-black"
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
            className="border border-gray-300 p-2 w-full mb-2 text-black"
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
      </div>
    </div>
  );
}

export default Vigenere;

