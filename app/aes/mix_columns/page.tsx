"use client";
import { useState } from "react";
import mixColumns from "./mixColumns";

const StateGrid = ({ state }: { state: number[][] }) => (
  <div className="grid grid-cols-4 gap-2 font-mono">
    {state.flat().map((b, i) => (
      <div key={i} className="p-2 border rounded bg-gray-100">
        {b.toString(16).padStart(2, "0")}
      </div>
    ))}
  </div>
)

export default function MixColumn() {
  const [matrix, setMatrix] = useState<string[][]>(
    Array(4).fill(null).map(() => Array(4).fill(""))
  );

  const [mixResult, setMixResult] = useState<number[][] | null>(null);
  const [error, setError] = useState("");

  const handleChange = (row: number, col: number, value: string) => {
    const update = matrix.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? value : c))
    );
    setMatrix(update)
  }

  const handleMix = () => {
    try {
      const bytes = matrix.map((row) => row.map((val) => {
        let h = val.trim();
        if (h.startsWith("0x") || h.startsWith("0X")) h = h.slice(2);
        if (!/^[0-9A-Fa-f]{1,2}$/.test(h)) throw new Error("Invalid hex input");
        return parseInt(h, 16);
      }));

      const state: number[][] = [[], [], [], []];
      for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 4; r++) {
          state[r].push(bytes[r][c]);
        }
      }

      const mixed = mixColumns(state);
      setMixResult(mixed);
      setError("");
    } catch (err: any) {
      setError(err.message || "Invalid input ");
      setMixResult(null);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <div className="text-3xl font-bold">AES MixColumns</div>

      {/* Input Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {matrix.map((row, r) => row.map((val, c) => (
          <input
            key={`${r}-${c}`}
            type="text"
            value={val}
            onChange={(e) => handleChange(r, c, e.target.value)}
            placeholder="00"
            maxLength={4}
            className="w-16 p-2 text-center border rounded text-black"

          />
        )))}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleMix}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Mix Columns
      </button>

      {/* Result */}
      {mixResult && (
        <div className="mt-6 text-center">
          <div className="text-xl mb-2">Mixed State</div>
          <StateGrid state={mixResult} />
        </div>
      )}

    </div>
  )
}
