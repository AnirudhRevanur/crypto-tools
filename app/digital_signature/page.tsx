import Link from "next/link";

export default function SignaturePage() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="text-2xl">
        Choose Function
      </div>
      <div className="flex flex-col p-2">
        <Link
          href="/digital_signature/signing"
          className="rounded-lg text-center bg-green-600 p-2 m-2"
        >
          Signing
        </Link>

        <Link
          href="/digital_signature/verification"
          className="rounded-lg text-center bg-green-600 p-2 m-2"
        >
          Verification
        </Link>
      </div>

    </div>
  )
}
