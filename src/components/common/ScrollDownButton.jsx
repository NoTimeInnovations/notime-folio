import React from "react";

const ScrollDownButton = ({to, text}) => {
  return (
    <a href={to}>
      <button className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-700 py-4 px-10 white-shadow rounded-md font-semibold text-lg lg:text-xl">
        <span>{text}</span>
        <img className="w-5" src="/arrow-down.svg" alt="arrow-down" />
      </button>
    </a>
  );
};

export default ScrollDownButton;
