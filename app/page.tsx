import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="text-2xl">
        Welcome to Crypto Tools
      </div>
      <div>
        Choose a cipher to use:
        <div className="flex flex-col p-2">
          <Link
            href="/caesar"
            className="rounded-lg text-center bg-green-600 p-2 m-2"
          >
            Caesar Cipher
          </Link>
          <Link
            href="/vigenere"
            className="rounded-lg text-center bg-green-600 p-2 m-2"
          >
            Vigenere Cipher
          </Link>
          <Link
            href="/railway"
            className="rounded-lg text-center bg-green-600 p-2 m-2"
          >
            Railway Cipher
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
