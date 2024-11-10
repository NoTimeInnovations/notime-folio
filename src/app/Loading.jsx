"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <div className="loader">
        <div className="orbe" style={{ "--index": 0 }}></div>
        <div className="orbe" style={{ "--index": 1 }}></div>
        <div className="orbe" style={{ "--index": 2 }}></div>
        <div className="orbe" style={{ "--index": 3 }}></div>
        <div className="orbe" style={{ "--index": 4 }}></div>
      </div>
    </div>
  );
};

export default Loading;
