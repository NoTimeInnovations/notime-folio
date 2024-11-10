"use client";
import LoadingAnimation from "@/components/common/LoadingAnimation";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <LoadingAnimation />
    </div>
  );
};

export default Loading;
