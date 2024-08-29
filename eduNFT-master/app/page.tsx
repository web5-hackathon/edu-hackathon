"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      fetch("/api/init")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          setInitialized(true);
        });
    }
  }, [initialized]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-6xl font-bold mb-10">Navigation Page</h1>
      <div className="flex space-x-4">
        <Link href="/users">
          <span className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer">
            User
          </span>
        </Link>
        <Link href="/admin">
          <span className="px-6 py-3 text-lg font-medium text-white bg-green-500 rounded-md hover:bg-green-600 cursor-pointer">
            Admin
          </span>
        </Link>
        <Link href="/teacher">
          <span className="px-6 py-3 text-lg font-medium text-white bg-red-500 rounded-md hover:bg-red-600 cursor-pointer">
            Teacher
          </span>
        </Link>
      </div>
    </div>
  );
}
