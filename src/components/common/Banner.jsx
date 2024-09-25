import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Banner = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      const maxX = containerRect.width - imgRect.width;
      const maxY = containerRect.height - imgRect.height;

      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * maxY);

      img.style.left = `${randomX}px`;
      img.style.top = `${randomY}px`;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-[#181d2448] py-20 px-20 rounded-md relative flex justify-center items-center h-10 rounded-2xl"
    >
      {/* banner title */}
      <div className="text-white text-4xl xl:text-6xl text-center font-bold relative z-40">
        {text}
      </div>
      {/* banner background */}
      <div
        className="absolute top-0 left-0 blur-[2px] w-full h-full overflow-hidden"
        ref={containerRef}
      >
        <img
          src="/html.svg"
          alt="html"
          className="w-10 md:w-16 absolute rotate-12"
        />
        <img
          src="/css.svg"
          alt="css"
          className="w-10 md:w-16 absolute -rotate-12"
        />
        <img
          src="/javascript.svg"
          alt="js"
          className="w-10 md:w-16 absolute -rotate-45"
        />
        <img
          src="/express.svg"
          alt="ex"
          className="w-10 md:w-16 absolute invert -rotate-45"
        />
        <img src="/mongodb.svg" alt="mongo" className="w-10 md:w-16 absolute" />
        <img src="/nodejs.svg" alt="node" className="w-10 md:w-16 absolute" />
        <img src="/react.svg" alt="react" className="w-10 md:w-16 absolute" />
      </div>
    </motion.div>
  );
};

export default Banner;
