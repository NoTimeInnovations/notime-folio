"use client";
import React from "react";

const ScrolltoEnrollBtn = () => {
  return (
    <div
      onClick={() => {
        const enrollSection = document.querySelector("#enroll");
        const enrollSectionTop = enrollSection.getBoundingClientRect().top;

        window.scrollBy({ top: enrollSectionTop - 150, behavior: "smooth" });
      }}
      className="z-[999] hover:shadow-amber-950 shadow-lg shadow-amber-600 cursor-pointer select-none fixed right-5 bottom-5 md:right-10 md:bottom-10 bg-gradient-to-b from-amber-600 to-yellow-500 w-16 lg:w-20 lg:text-[1.1rem] aspect-square rounded-full grid place-items-center p-1 text-xs font-semibold text-center"
    >
      Enroll <br /> Now
    </div>
  );
};

export default ScrolltoEnrollBtn;
