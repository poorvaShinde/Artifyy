"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthError() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Authentication Error</h1>
        <p className="text-gray-400 mb-4">Redirecting you back...</p>
        <p className="text-sm text-gray-500">
          If you're not redirected, <a href="/" className="text-indigo-400 underline">click here</a>
        </p>
      </div>
    </div>
  );
}
