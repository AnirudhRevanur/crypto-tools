"use client";
import React, { useState } from "react";
import { verify } from "../helper";

export default function DigitalSignaturePage() {
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [verifyingMath, setVerifyingMath] = useState<{ s: bigint; e: bigint; n: bigint; h: bigint; hPrime: bigint } | null>(null);
  const [error, setError] = useState<string>("");
  const [receiverMessage, setReceiverMessage] = useState<string>("");
  const [receiverSignature, setReceiverSignature] = useState<string>("");
  const [receiverPublicKey, setReceiverPublicKey] = useState<string>("");
  const [receiverN, setReceiverN] = useState<string>("");


  const handleVerify = () => {
    setError("");
    if (!receiverMessage || !receiverSignature || !receiverPublicKey || !receiverN) {
      setError("Receiver needs message, signature, public key, and n.");
      return;
    }
    try {
      const sig = BigInt(receiverSignature);
      const e = BigInt(receiverPublicKey);
      const mod = BigInt(receiverN);
      const { hash, decryptedHash, isValid } = verify(receiverMessage, sig, e, mod);
      setVerificationResult(isValid);
      setVerifyingMath({ s: sig, e: e, n: mod, h: hash, hPrime: decryptedHash });
    } catch (e) {
      setError("Invalid receiver data. Ensure signature, public key, and n are valid integers.");
    }
  };

  return (
    <div className="flex flex-col text-center p-4">
      <div className="text-3xl mb-4">Digital Signature (RSA): Verification</div>

      <div className="flex flex-col items-center gap-4">

        <div className="rounded-lg border border-1 p-4 w-full max-w-md">
          <h2 className="text-2xl mb-4">3. Verify Signature</h2>
          <p className="text-sm text-gray-600 mb-4">
            Verification uses only message + signature + sender&apos;s public key.
          </p>
          <div className="text-left space-y-2 mb-4">
            <label className="text-sm font-semibold text-gray-700">Message</label>
            <textarea
              value={receiverMessage}
              onChange={(e) => setReceiverMessage(e.target.value)}
              className="border border-gray-300 p-2 w-full text-black h-20"
            />
            <label className="text-sm font-semibold text-gray-700">Signature (s)</label>
            <input
              type="text"
              value={receiverSignature}
              onChange={(e) => setReceiverSignature(e.target.value)}
              className="border border-gray-300 p-2 w-full text-black"
            />
            <label className="text-sm font-semibold text-gray-700">Public Key (e)</label>
            <input
              type="text"
              value={receiverPublicKey}
              onChange={(e) => setReceiverPublicKey(e.target.value)}
              className="border border-gray-300 p-2 w-full text-black"
            />
            <label className="text-sm font-semibold text-gray-700">Modulus (n)</label>
            <input
              type="text"
              value={receiverN}
              onChange={(e) => setReceiverN(e.target.value)}
              className="border border-gray-300 p-2 w-full text-black"
            />
          </div>
          <button
            onClick={handleVerify}
            disabled={!receiverSignature || !receiverPublicKey || !receiverN}
            className="bg-blue-500 text-white p-2 rounded w-full disabled:bg-gray-400 mb-4"
          >
            Verify Signature
          </button>
          {verifyingMath && (
            <div className="text-left mb-4 p-3 bg-purple-50 rounded border border-purple-100 text-xs text-purple-900 font-mono space-y-1">
              <p className="font-bold mb-1">Math:</p>
              <p>h = Hash(m) = {verifyingMath.h.toString()}</p>
              <p>h&apos; = sᵉ mod n</p>
              <p>h&apos; = {verifyingMath.s.toString()} ^ {verifyingMath.e.toString()} mod {verifyingMath.n.toString()}</p>
              <p>h&apos; = {verifyingMath.hPrime.toString()}</p>
              <p className="mt-2 font-bold">{verifyingMath.h === verifyingMath.hPrime ? "h == h' (Valid)" : "h != h' (Invalid)"}</p>
            </div>
          )}
          {verificationResult !== null && (
            <div className={`p-4 rounded border ${verificationResult ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700"} font-bold`}>
              {verificationResult ? "✅ Signature Valid!" : "❌ Signature Invalid!"}
            </div>
          )}
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
