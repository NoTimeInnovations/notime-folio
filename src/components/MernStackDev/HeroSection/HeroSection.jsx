import React from "react";
import ScrollDownButton from "../../common/ScrollDownButton";
import P from "../../common/P";
import { motion } from "framer-motion";
import MainImage from "./MainImage";

const HeroSection = () => {
  const motionAttributes = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="text-center grid gap-10 place-items-center max-w-5xl">
      {/* headings */}
      <div className="grid gap-5">
        {/* top heading */}
        <p className="text-[#6ce2ff] font-medium tracking-[1px]">
          FOR DEVELOPERS WHO WANT TO STAND OUT AND BECOME IRREPLACEABLE
        </p>

        {/* main heading */}
        <p className="text-[2rem] leading-[2rem] md:text-[4rem] md:leading-[4rem] font-bold">
          Become a top 1%{" "}
          <span className="bg-gradient-to-r from-green-400 to-yellow-500 bg-overlay">
            MERN Stack
          </span>{" "}
          developer in only one course
        </p>

        {/* sub heading */}
        <p
          transition={{ ...motionAttributes.transition, delay: 0.4 }}
          className="font-medium text-slate-300 md:text-[1.3rem] md:px-10 lg:text-[1.7rem]"
        >
          Escape the shallow content & dive deep into the hottest tech of 2024
        </p>
      </div>

      {/* image */}
      <div>
        <MainImage />
      </div>

      {/* uptodate mark */}
      <motion.div
        {...motionAttributes}
        transition={{ ...motionAttributes.transition, delay: 0.6 }}
        className="flex items-center gap-3 justify-center"
      >
        {/* verified icon */}
        <img src="/verfied-icon.svg" alt="verified" className="w-9" />
        <p className="font-semibold text-lg text-slate-300">Up to Date</p>
        {/* Date */}
        <div className="bg-[#0000006d] text-[#5feda4] font-bold p-3 rounded-md w-fit">
          MAY 13, 2024
        </div>
      </motion.div>

      {/* description */}
      <motion.div
        {...motionAttributes}
        transition={{ ...motionAttributes.transition, delay: 0.7 }}
      >
        <P className={"md:px-10 lg:px-32 xl:px-[23%]"}>
          Read the page if you want every single piece of information. Or just
          scroll to the main details by clicking the button below.
        </P>
      </motion.div>

      {/* scroll to details button */}
      <motion.div
        {...motionAttributes}
        transition={{ ...motionAttributes.transition, delay: 0.8 }}
      >
        <ScrollDownButton text={"Scroll to the Detail"} to={"#details"} />
      </motion.div>
    </div>
  );
};

export default HeroSection;
