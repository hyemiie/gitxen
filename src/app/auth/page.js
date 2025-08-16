"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only try to get token if searchParams exist
    if (!searchParams) return;

    const token = searchParams.get("token");

    if (token && typeof token === "string") {
      localStorage.setItem("token", token);
      router.push("/demo");
    } else {
      // Optional: only redirect if you’re sure you’re on callback route
      if (window.location.pathname === "/auth/callback") {
        router.push("/auth?error=missing_token");
      }
    }
  }, [router, searchParams]);

  return <p>Redirecting...</p>;
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
