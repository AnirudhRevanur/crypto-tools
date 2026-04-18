"use client";
import React, { useState } from "react";
import { isOnCurve, addPoints, type Point } from "./helper";

function ECC() {

  const [A, setA] = useState(0);
  const [B, setB] = useState(0);
  const [M, setM] = useState(0);
  const [P, setP] = useState<Point>({ x: 0, y: 0 });
  const [Q, setQ] = useState<Point>({ x: 0, y: 0 });
  const [result, setResult] = useState<Point | null | undefined>(undefined);
  const [error, setError] = useState("")

  function handleAdd() {
    setError("");
    setResult(undefined);

    if (!isOnCurve(P, A, B, M)) {
      setError(`Point P (${P.x}, ${P.y}) is not on the curve.`);
      return;
    }

    if (!isOnCurve(Q, A, B, M)) {
      setError(`Point P (${Q.x}, ${Q.y}) is not on the curve.`);
      return;
    }

    const R = addPoints(P, Q, A, M);
    setResult(R);
  }

  return (
    <div className="flex flex-col text-center p-4">
      <div className="text-3xl mb-4">Elliptic Curve Cryptography</div>

      <div className="flex flex-col items-center gap-4">

        {/* Curve parameters */}
        <div className="rounded-lg border border-1 p-4 w-full max-w-md">
          <h2 className="text-2xl mb-4">Curve: y² = x³ + Ax + B (mod M)</h2>
          <div className="flex gap-2 items-center">
            A:
            <input type="number" value={A}
              onChange={(e) => setA(parseInt(e.target.value))}
              placeholder="A"
              className="border border-gray-300 p-2 w-full text-black"
            />
            B:
            <input type="number" value={B}
              onChange={(e) => setB(parseInt(e.target.value))}
              placeholder="B"
              className="border border-gray-300 p-2 w-full text-black"
            />
            M:
            <input type="number" value={M}
              onChange={(e) => setM(parseInt(e.target.value))}
              placeholder="M (prime)"
              className="border border-gray-300 p-2 w-full text-black"
            />
          </div>
        </div>

        {/* Points */}
        <div className="rounded-lg border border-1 p-4 w-full max-w-md">
          <h2 className="text-2xl mb-4">Add Points P + Q</h2>
          <div className="flex gap-2 mb-2 items-center">
            P.x: <input type="number" value={P.x}
              onChange={(e) => setP({ ...P, x: parseInt(e.target.value) })}
              placeholder="P.x"
              className="border border-gray-300 p-2 w-full text-black"
            />
            P.y:
            <input type="number" value={P.y}
              onChange={(e) => setP({ ...P, y: parseInt(e.target.value) })}
              placeholder="P.y"
              className="border border-gray-300 p-2 w-full text-black"
            />
          </div>
          <div className="flex gap-2 mb-4 items-center">
            Q.x:
            <input type="number" value={Q.x}
              onChange={(e) => setQ({ ...Q, x: parseInt(e.target.value) })}
              placeholder="Q.x"
              className="border border-gray-300 p-2 w-full text-black"
            />
            Q.y:
            <input type="number" value={Q.y}
              onChange={(e) => setQ({ ...Q, y: parseInt(e.target.value) })}
              placeholder="Q.y"
              className="border border-gray-300 p-2 w-full text-black"
            />
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Add Points
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="p-2 border border-red-400 rounded w-full max-w-md text-red-400">
            {error}
          </div>
        )}

        {/* Result */}
        {result !== undefined && (
          <div className="p-4 border border-gray-300 rounded w-full max-w-md">
            <h3 className="text-xl mb-2">P + Q =</h3>
            {result === null
              ? <p>Point at Infinity (identity element)</p>
              : <p className="text-2xl">({result.x}, {result.y})</p>
            }
          </div>
        )}

      </div>
    </div>
  )
}

export default ECC;
