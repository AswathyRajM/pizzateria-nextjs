"use client";
import React, { useState } from "react";
import Button from "../shared/button";
import { userLogout } from "@/actions/auth";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const [logoutBtnText, SetLogoutBtnText] = useState("Logout");
  const router = useRouter();

  const handleUserLogout = async () => {
    SetLogoutBtnText("Logging out...");
    await userLogout();
    router.push("/");
  };
  return <Button onClick={handleUserLogout}>{logoutBtnText}</Button>;
}

export default LogoutButton;
