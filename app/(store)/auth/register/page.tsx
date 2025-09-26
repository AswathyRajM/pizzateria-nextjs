"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/shared/button";
import { handleLogin, handleSignup } from "@/actions/auth";
import { useToastStore } from "@/store/toastStore";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);

  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null)
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const { error } = await handleSignup({
        email,
        password,
      });
      if (error) throw error;
      showToast("Register success!", "success");
      router.push("/account");
    } catch (error: unknown) {
      showToast(
        error instanceof Error ? error.message : "An error occurred",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 p-6 flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form onSubmit={submitRegister} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border"
        />
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
          className="p-2 border"
        />
        <p className="text-red-500 text-sm">{error}</p>
        <Button loading={isLoading} className="!p-3 mt-3" type="submit">
          Register
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
