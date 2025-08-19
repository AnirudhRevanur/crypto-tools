"use client";
import React, { ChangeEvent, useMemo, useState } from "react";
import encodePlayfairCipher from "./encode";
import decodePlayfairCipher from "./decode";

const BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function Playfair() {
  const [encodeText, setEncodeText] = useState("");
  const [encodedText, setEncodedText] = useState("");

  const [decodeText, setDecodeText] = useState("");
  const [decodedText, setDecodedText] = useState("");

  const [keyword, setKeyword] = useState("");

  const keywordProcessed = useMemo(
    () => keyword.toUpperCase().replace(/[^A-Z0-9]/g, ""),
    [keyword]
  );

  const uniqueKeywordChars = useMemo(
    () => Array.from(new Set(keywordProcessed)),
    [keywordProcessed]
  )

  const allChars = useMemo(
    () =>
      uniqueKeywordChars.concat(
        BASE_CHARS.split("").filter((ch) => !uniqueKeywordChars.includes(ch))
      ),
    [uniqueKeywordChars]
  )

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setKeyword(value)
  }

  const handleEncode = () => {
    const cleaned = encodeText.toUpperCase().replace(/[^A-Z0-9]/g, "")
    const result = encodePlayfairCipher(allChars, cleaned)
    setEncodedText(result);
  };

  const handleDecode = () => {
    const result = decodePlayfairCipher(allChars, decodeText)
    setDecodedText(result)
  }

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
            onChange={handleKeywordChange}
            placeholder="Enter keyword"
            className="border border-gray-300 p-2 w-full mb-4 text-black"
          />

          {/* Grid UI */}
          <div className="grid grid-cols-6 gap-1 justify-center">
            {allChars.map((cell, i) => {
              const isKeywordChar = uniqueKeywordChars.includes(cell);
              return (
                <div
                  key={i}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-500 rounded bg-white text-black
                    ${isKeywordChar ? "bg-red-500" : "bg-white"}`
                  }
                >
                  {cell}
                </div>
              )
            })}
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
