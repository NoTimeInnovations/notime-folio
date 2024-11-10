"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  Cookies.remove("user");
  Cookies.remove("auth_token");
  router.push("/");
  return;
};

export default page;
