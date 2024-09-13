import React from "react";
import { motion } from "framer-motion";

const MainImage = () => {
  const mernLogos = [
    "/mongodb.svg",
    "/express.svg",
    "/react.svg",
    "/nodejs.svg",
    "/javascript.svg",
  ];

  return (
    <>
      <div className="flex justify-center items-center relative">
        <motion.div
          animate={{
            rotate: 360,
            transition: {
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            },
          }}
          className="relative aspect-square h-[300px] xs:h-[380px] md:h-[500px] "
        >
          {/* mongodb  */}
          <img
            src={mernLogos[0]}
            alt="mongodb"
            className="w-32 md:w-36 lg:w-40 absolute -top-10 sm:top-0 left-1/2 -translate-x-1/2 "
          />

          {/* express  */}
          <img
            src={mernLogos[1]}
            alt="express"
            className="w-20 md:w-24 lg:w-28 absolute -right-5 sm:right-0 top-1/2 -translate-y-1/2 invert"
          />

          {/* react  */}
          <img
            src={mernLogos[2]}
            alt="react"
            className="w-24 md:w-28 lg:w-32 absolute -bottom-5 sm:bottom-0 left-1/2 -translate-x-1/2"
          />

          {/* nodejs  */}
          <img
            src={mernLogos[3]}
            alt="nodejs"
            className="w-24 md:w-28 lg:w-32 absolute -left-5 sm:left-0 top-1/2 -translate-y-1/2"
          />
        </motion.div>

        {/* javascript  */}
        <img
          src={mernLogos[4]}
          alt="javascript"
          className="w-12 md:w-16 lg:w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </>
  );
};

export default MainImage;
