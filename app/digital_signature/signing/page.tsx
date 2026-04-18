"use client";
import React, { useState } from "react";
import { generateKeys, sign, isPrime, getRandomPrime } from "../helper";

export default function DigitalSignaturePage() {
  const [p, setP] = useState<string>("");
  const [q, setQ] = useState<string>("");
  const [n, setN] = useState<bigint | null>(null);
  const [publicKey, setPublicKey] = useState<bigint | null>(null);
  const [privateKey, setPrivateKey] = useState<bigint | null>(null);
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [sharedPayload, setSharedPayload] = useState<string>("");
  const [signingMath, setSigningMath] = useState<{ h: bigint; d: bigint; n: bigint } | null>(null);
  const [error, setError] = useState<string>("");

  const handlePickPrimes = () => {
    const p1 = getRandomPrime(1, 1000);
    let p2 = getRandomPrime(1, 1000);
    while (p1 === p2) {
      p2 = getRandomPrime(1, 1000);
    }
    setP(p1.toString());
    setQ(p2.toString());
    setPublicKey(null);
    setPrivateKey(null);
    setSigningMath(null);
  };

  const handleGenerateKeys = () => {
    setError("");
    try {
      const bp = BigInt(p);
      const bq = BigInt(q);

      if (!isPrime(bp)) {
        setError("P must be a prime number.");
        return;
      }
      if (!isPrime(bq)) {
        setError("Q must be a prime number.");
        return;
      }
      if (bp === bq) {
        setError("P and Q should be distinct primes.");
        return;
      }

      const keys = generateKeys(bp, bq);
      setPublicKey(keys.publicKey);
      setPrivateKey(keys.privateKey);
      setN(keys.n);
      setSignature("");
      setSharedPayload("");
      setSigningMath(null);
    } catch (e) {
      setError("Invalid input for P or Q.");
    }
  };

  const handleSign = () => {
    setError("");
    if (privateKey === null || n === null) {
      setError("Please generate keys first.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter a message to sign.");
      return;
    }
    const { hash, signature: s } = sign(message, privateKey, n);
    setSignature(s.toString());
    setSigningMath({ h: hash, d: privateKey, n: n });
    setSharedPayload(`message: ${message},\nsignature: ${s},\npublicKey: ${publicKey},\nn: ${n}`)
  };


  return (
    <div className="flex flex-col text-center p-4">
      <div className="text-3xl mb-4">Digital Signature (RSA): Signature</div>

      <div className="flex flex-col items-center gap-4">
        <div className="rounded-lg border border-1 p-4 w-full max-w-md">
          <h2 className="text-2xl mb-4">1. Key Generation</h2>
          <div className="flex gap-2 mb-2 items-center">
            P:
            <input
              type="number"
              value={p}
              onChange={(e) => setP(e.target.value)}
              placeholder="Prime P"
              className="border border-gray-300 p-2 w-full text-black"
            />
            Q:
            <input
              type="number"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Prime Q"
              className="border border-gray-300 p-2 w-full text-black"
            />
          </div>
          <button
            onClick={handlePickPrimes}
            className="bg-emerald-500 text-white p-2 rounded w-full mb-2"
          >
            Pick Random Primes
          </button>
          <button
            onClick={handleGenerateKeys}
            className="bg-blue-500 text-white p-2 rounded w-full mb-4"
          >
            Generate Keys
          </button>
          {publicKey !== null && (
            <div className="text-left text-sm p-3 bg-gray-100 rounded border border-gray-200 text-black space-y-1">
              <p><span className="font-bold">Public Key (e):</span> {publicKey.toString()}</p>
              <p><span className="font-bold">Private Key (d):</span> {privateKey?.toString()}</p>
              <p><span className="font-bold">Modulus (n):</span> {n?.toString()}</p>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-1 p-4 w-full max-w-md">
          <h2 className="text-2xl mb-4">2. Sign Message</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message here"
            className="border border-gray-300 p-2 w-full mb-2 text-black h-24"
          />
          <button
            onClick={handleSign}
            disabled={privateKey === null}
            className="bg-blue-500 text-white p-2 rounded w-full disabled:bg-gray-400"
          >
            Sign Message
          </button>
          {signature && (
            <div className="mt-4 text-left space-y-2">
              <div className="p-3 bg-blue-50 rounded border border-blue-100 text-xs text-blue-900 font-mono">
                <p className="font-bold mb-1">Math:</p>
                <p>Hash(m) = h = {signingMath?.h.toString()}</p>
                <p>s = hᵈ mod n</p>
                <p>s = {signingMath?.h.toString()} ^ {signingMath?.d.toString()} mod {signingMath?.n.toString()}</p>
                <p>s = {signature}</p>
              </div>
              <p className="text-sm font-bold mb-1">Signature (s):</p>
              <p className="text-sm break-all p-3 bg-gray-100 rounded border border-gray-200 text-black font-mono">
                {signature}
              </p>
            </div>
          )}
          <div className="mt-4 text-left">
            <p className="text-sm font-bold mb-1">Data to be given to the verifier:</p>
            <textarea
              value={sharedPayload}
              onChange={(e) => setSharedPayload(e.target.value)}
              placeholder='{"message":"...","signature":"...","publicKey":"...","n":"..."}'
              className="border border-gray-300 p-2 w-full mb-2 text-black h-28 font-mono text-xs"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 border border-red-400 rounded w-full max-w-md text-red-600 bg-red-50 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
