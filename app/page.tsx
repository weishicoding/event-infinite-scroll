import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="text-center">
      <Link href="/event">
        <button className="font-bold mt-10 cursor-pointer border border-cyan-200 bg-cyan-200 p-4 rounded-3xl hover:bg-cyan-300">
          Jump to Event list
        </button>
      </Link>
    </div>
  );
}
