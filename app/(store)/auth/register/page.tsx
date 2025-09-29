"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/shared/button";
import { handleSignup } from "@/actions/auth";
import { useToastStore } from "@/store/toastStore";
import Link from "next/link";
import Input from "@/components/shared/input";

export default function SignupForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (userData.password !== userData.repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await handleSignup(userData);
      if (error) {
        showToast(error, "error");
        return;
      }
      showToast("Register success!", "success");
      router.push("/account");
    } catch (err: unknown) {
      showToast(
        err instanceof Error ? err.message : "An error occurred",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 p-6 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form onSubmit={submitRegister} className="flex flex-col gap-3 w-80">
        <Input
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <Input
          name="email"
          type="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <Input
          name="password"
          type="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <Input
          name="repeatPassword"
          type="password"
          value={userData.repeatPassword}
          onChange={handleInputChange}
          placeholder="Repeat Password"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

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
