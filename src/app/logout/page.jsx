"use client";
import LoadingAnimation from "@/components/common/LoadingAnimation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  Cookies.remove("user");
  Cookies.remove("auth_token");
  router.push("/");
  return (
    <div className="min-h-screen grid place-content-center gap-5">
      <div className="justify-self-center">
        <LoadingAnimation />
      </div>
      <div className="text-white font-medium text-center">
        Logging out.......
      </div>
    </div>
  );
};

export default page;
