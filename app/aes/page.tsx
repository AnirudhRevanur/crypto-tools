import Link from "next/link";

export default function AESPage() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="text-2xl">
        Choose an AES Mini Function:
      </div>
      <div className="flex flex-col p-2">
        <Link
          href="/aes/sub_bytes"
          className="rounded-lg text-center bg-green-600 p-2 m-2"
        >
          Substitute Bytes
        </Link>

        <Link
          href="/aes/mix_columns"
          className="rounded-lg text-center bg-green-600 p-2 m-2"
        >
          Mix Columns
        </Link>
      </div>

    </div>
  )
}
