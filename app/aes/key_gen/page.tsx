"use client";
import React, { useState } from "react";
import { generateHex16, keyExpansion } from "./keyExpansion";

export default function KeyGen() {
  const [randomKey, setRandomKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [error, setError] = useState("");
  const [roundKeys, setRoundKeys] = useState<number[][] | null>(null);

  const handleRandomString = () => {
    let randomString = generateHex16()
    setRandomKey(randomString);
  }

  const handleGenerate = () => {
    let input = keyInput.trim().replace(/\s+/g, "");

    if (!input) {
      setError("Enter a 16-byte hexadecimal key");
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

    if (input.length !== 32) {
      setError("Input must be exactly 16 bytes (32 hex characters)");
      return;
    }

    setError("");
    const keyBytes: number[] = [];
    for (let i = 0; i < 32; i += 2) {
      keyBytes.push(parseInt(input.slice(i, i + 2), 16));
    }

    try {
      const words = keyExpansion(keyBytes);
      setRoundKeys(words);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const formatWord = (word: number[]) => {
    return word.map((b) => b.toString(16).padStart(2, "0").toUpperCase()).join(" ");
  };

  const formatRoundKey = (words: number[][], round: number) => {
    const start = round * 4;
    return words
      .slice(start, start + 4)
      .map((w) => w.map((b) => b.toString(16).padStart(2, "0").toUpperCase()).join(""))
      .join(" ");
  };

  return (
    <div className="flex flex-col text-center p-4 min-h-screen">
      <div className="text-3xl mb-4">AES Key Generation</div>
      <div className="flex flex-col items-center">
        <div className="rounded-lg border border-1 p-4 mb-4 w-full max-w-2xl">
          <h2 className="text-2xl mb-2">Generate Random String</h2>
          <button
            onClick={handleRandomString}
            className="bg-blue-500 text-white p-2 rounded w-full mb-4"
          >
            Generate Random String
          </button>
          {randomKey && <p className="mb-2">{randomKey}</p>}
        </div>

        <div className="rounded-lg border border-1 p-4 mb-4 w-full max-w-2xl">
          <h2 className="text-2xl mb-2">Key Expansion (AES-128)</h2>
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Enter 16-byte key (hex): 2b7e151628aed2a6abf7158809cf4f3c"
            className="border border-gray-300 p-2 w-full mb-2 text-black"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleGenerate}
            className="bg-blue-500 text-white p-2 rounded w-full mb-4"
          >
            Generate Round Keys
          </button>

          {roundKeys && (
            <div className="mt-4 text-left overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-2 border">Round</th>
                    <th className="p-2 border">Round Key (16 bytes)</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(11)].map((_, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}>
                      <td className="p-2 border text-center font-bold">{i}</td>
                      <td className="p-2 border font-mono">
                        {formatRoundKey(roundKeys, i)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="text-xl mt-6 mb-2">Expanded Words (Total 44)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {roundKeys.map((word, i) => (
                  <div key={i} className="p-2 border rounded bg-gray-800 font-mono text-sm">
                    <span className="text-blue-400 mr-2">w[{i}]</span> {formatWord(word)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
