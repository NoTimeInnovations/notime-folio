"use client";

import { cn } from "@/utils/utils";
import Image from "next/image";
import React from "react";

const Avatar = ({ image, username, classname }) => {
  return (
      <Image
        src={image || "/no-profile.svg"}
        alt={username || "avatar"}
        width={40}
        height={40}
        loading="lazy"
        className={cn("rounded-full", classname)}
      />
  );
};

export default Avatar;
