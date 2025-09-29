"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/shared/button";
import { handleLogin } from "@/actions/auth";
import { useToastStore } from "@/store/toastStore";
import Link from "next/link";
import Input from "@/components/shared/input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await handleLogin({
        email,
        password,
      });
      if (error) {
        showToast(error, "error");
        return;
      }
      showToast("You are logged in!", "success");
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
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submitLogin} className="flex flex-col gap-3 w-80">
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button loading={isLoading} className="!p-3 mt-4" type="submit">
          Login
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
}
