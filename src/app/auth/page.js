"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.push("/demo");
    } else {
      router.push("/auth?error=missing_token");
    }
  }, [router, searchParams]);

  return <p>Redirecting...</p>;
}
