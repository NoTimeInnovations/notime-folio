import React from "react";
import GradientText from "../common/GradientText";
import { motion } from "framer-motion";
import P from "../common/P";

const Founder = () => {
  return (
    <div className="xl:order-2 lg:absolute lg:right-10 lg:top-[-10rem] xl:right-48">
      <div className="grid place-items-center gap-10 lg:gap-8">
        {/* image */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="relative w-52 lg:w-32 aspect-square grid place-items-center"
          >
            <img
              src="/notime-logo-circle.png"
              alt="notime"
              className="w-[99.005%] relative z-40 "
            />
            <div className="absolute z-10 top-0 rounded-full left-0 w-full aspect-square bg-slate-500"></div>
          </motion.div>
        </motion.div>
        {/* title */}
        <motion.div className="flex justify-center" initial={{ opacity : 0 , y : 100 }} animate={{ opacity : 1 , y : 0 }} transition={{ delay : 0.8 }} >
          <P className=" text-center text-lg lg:text-base w-[90%] text-white">
            Your instructor and founders <br />
            <GradientText className={"text-[120%] font-medium"}>
              Muhammed Rinshad&nbsp;S&nbsp;R{" "}
            </GradientText>{" "}
            and{" "}
            <GradientText className={"text-[120%] font-medium"}>
              Thrisha&nbsp;K
            </GradientText>
          </P>
        </motion.div>
      </div>
    </div>
  );
};

export default Founder;
