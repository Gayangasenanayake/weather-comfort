"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";
import LoginForm from "../components/LoginForm";


export default function LoginPage() {
  const { user, loading, mfaRequired } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !mfaRequired) {
      router.push("/");
    }
  }, [user, loading, router, mfaRequired]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <LoginForm />
    </div>
  );
}