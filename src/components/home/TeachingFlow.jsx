"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const flows = Array.from({ length: 10 }, (_, i) => ({
  title: `Title ${i + 1}`,
  desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. ",
}));

const TeachingFlow = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll();

  const barWidth = useTransform(scrollYProgress , [0,1] , ['-50%' , '190%'])
  
  return (
    <div ref={containerRef} className="relative">
      {/* flowboxes  */}
      <div className="flex justify-between items-center relative z-20">
        {flows.map((flow, index) => {
          const startScroll = (1 / flows.length) * (index) ; 
          const endScroll = (1 / flows.length) * (index + 1); 

          const widthPercent = useTransform(
            scrollYProgress,
            [startScroll - .1, endScroll],
            ["0%", "300%"]
          );

          return (
            <div
              key={flow.title}
              className="bg-white/50 relative p-[1px] rounded-md overflow-hidden cursor-pointer select-none"
            >
              <div className="bg-[#151b24] px-5 py-10 rounded-md relative z-10 group min-w-0  hover:min-w-[200px] transition-all duration-1000">
                <h1 className="text-white">{flow.title}</h1>
                <p className="overflow-hidden max-w-[0px] max-h-[0px] group-hover:max-w-[200px] group-hover:max-h-[200px] transition-all duration-1000" >{flow.desc}</p>
              </div>

              {/* color border  */}
              <motion.div
                style={{ scaleX: widthPercent }}
                className="absolute bg-gradient-to-r origin-left from-yellow-500 to-green-500 top-0 left-0 h-full w-full"
              ></motion.div>
            </div>
          );
        })}
      </div>

      {/* bar  */}
      <div className="h-[7px] bg-[#212534] rounded-full w-full absolute top-1/2 -translate-y-1/2 overflow-hidden ">
        <motion.div
          style={{ scaleX: barWidth }}
          className="h-full bg-gradient-to-r from-green-500 to-yellow-500 origin-left rounded-full relative"
        >
        </motion.div>
      </div>
    </div>
  );
};

export default TeachingFlow;
