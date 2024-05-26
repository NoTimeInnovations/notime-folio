import React, { useRef } from "react";
import { delay, motion, useScroll, useTransform } from "framer-motion";

const PossibilitieCard = ({ heading, children, arrange }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center center", "start end"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], ["100%", "-60%"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      ref={ref}
      className={`flex items-center ${arrange} relative`}
    >
      <div className="w-[300px] md:w-[400px] lg:w-[600px] p-[0.04rem] md:p-[0.1rem] grid place-items-center rounded-xl overflow-hidden relative">
        <motion.div
          style={{ scaleY: scaleY }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="origin-top absolute w-full h-full bg-gradient-to-br from-yellow-500 to-green-500"
        ></motion.div>
        <div className="p-5 md:p-10 lg:py-20 rounded-xl bg-[#090c10] z-49 relative ">
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-[2.2rem] font-semibold">
            {heading}
          </h1>
          <p className="text-xs md:text-sm lg:text-base xl:text-xl opacity-50 mt-3 lg:mt-5">
            {children}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PossibilitieCard;
