"use client"
import React, { useEffect } from "react";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";

const ScrollProgressIndicator = () => {


    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress);

  return (
    <>
      {/* scroll progress indicator  */}
      <motion.div
        style={{ scaleX: scaleX}}
        className={`w-screen origin-left rounded-full fixed top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-yellow-500 z-[100]`}
      ></motion.div>
    </>
  );
};

export default ScrollProgressIndicator;
