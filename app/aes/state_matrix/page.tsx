"use client";

import { ChangeEvent, useState } from "react";
import alphabetToHex from "./state_matrix";

const BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export default function StateMatrix() {
  const [inputText, setInputText] = useState("");
  const [paddingChar, setPaddingChar] = useState("X");
  const [matrix, setMatrix] = useState<string[]>(Array(16).fill("0x00"))

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setInputText(value)
  }

  const handleMatrixIt = () => {
    let text = inputText.padEnd(16, paddingChar);
    const hexArray = alphabetToHex(text);

    const columnMajor: string[] = [];
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        columnMajor.push(hexArray[row * 4 + col]);
      }
    }

    setMatrix(columnMajor);
  }

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="text-3xl mb-6">AES State Matrix Representation</div>

      <div className="flex flex-col items-center gap-6">

        {/* Input Area */}
        <div className="rounded-lg border p-4 w-full max-w-md">
          <input
            type="text"
            value={inputText}
            placeholder="Enter text here"
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full mb-4 text-black"
            maxLength={16}
          />

          {/* Padding Selection */}
          <div className="mb-4 text-left">
            <label className="block mb-1 font-semibold">Padding Character</label>
            <select
              value={paddingChar}
              onChange={(e) => setPaddingChar(e.target.value)}
              className="border border-gray-300 p-2 w-full text-black"
            >
              {BASE_CHARS.split("").map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>

          </div>


          {/* State Matrix Area */}
          <div className="grid grid-cols-4 gap-6">
            {matrix.map((cell, i) => {
              return (
                <div key={i}
                  className="w-16 h-16 flex items-center justify-center border border-gray-500 rounded text-white text-xl p-2"
                >
                  {cell}
                </div>
              )
            })}
          </div>
        </div>

        {/* Magic Button */}
        <button
          className="border rounded-lg px-4 py-2 bg-blue-600 border-blue-600 hover:bg-blue-800 hover:border-blue-800"
          onClick={handleMatrixIt}
        >
          Matrix It
        </button>


      </div>
    </div>

  )
}
