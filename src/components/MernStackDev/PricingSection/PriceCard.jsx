import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PriceCard = ({ pricingLevel, gradientColor, index }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-[#151B24] rounded-xl relative md:max-w-xl flex-1 h-fit`}
    >
      {/* main container  */}
      <div
        className={`bg-[#151B24] px-5 py-10 md:px-10 md:py-20 rounded-xl relative z-[49] m-[1px] grid place-items-center gap-5 `}
      >
        {/* type tag */}
        <div className="py-2 px-10 bg-[#0e1218] rounded text-center font-semibold text-xl ">
          {/* gradient  */}
          <span className={`bg-overlay bg-gradient-to-r ${gradientColor} `}>
            {pricingLevel?.tag}
          </span>
        </div>

        {/* sub tag  */}
        <div className="bg-overlay bg-gradient-to-r from-orange-300 to-orange-600 font-medium text-center md:text-lg max-w-[350px]">
          {pricingLevel?.subTag}
        </div>

        {/* price  */}
        <motion.div
          initial={{ scale: 0.1 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="font-bold text-6xl md:text-7xl"
        >
          ₹{pricingLevel?.price ? pricingLevel.price.toLocaleString() : "0"}
        </motion.div>

        {/* price sub tag  */}
        <div className="text-lg font-semibold text-slate-300">
          Price including sales tax
        </div>

        {/* buy now button  */}
        <button
          className={`bg-gradient-to-r ${gradientColor} py-3 text-sm md:text-base w-full rounded-lg`}
        >
          Buy now
        </button>

        {/* description  */}
        <motion.div initial={{ opacity : 0 , y : 100 }} whileInView={{ opacity : 1 , y : 0 }} className="text-sm text-slate-400 md:text-base">
          {pricingLevel?.description}
        </motion.div>

        {/* it includes divider  */}
        <div className="flex items-center w-full gap-3">
          {/* line left  */}
          <div className="bg-slate-600 h-[0.5px] w-full"></div>
          {/* inner text  */}
          <div className="text-slate-400 font-light text-sm">
            IT&nbsp;INCLUDES
          </div>
          {/* line right  */}
          <div className="bg-slate-600 h-[0.5px] w-full"></div>
        </div>

        {/* features  */}
        <div className="grid gap-3 w-full ">
          {/* heading  */}
          <div className="text-xl md:text-2xl font-semibold">Features</div>
          {/* features list  */}
          <div className="grid gap-4">
            {pricingLevel?.features.map((feature, index) => (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={`${pricingLevel?.tag}_feature_${index}`}
                className="flex gap-3 items-start"
              >
                <Image src="checkmark.svg" width={25} height={25} alt="checkmark" />
                <div className="text-lg md:text-xl font-medium text-slate-300">
                  {feature}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* border  */}
      <div
        className={` bg-gradient-to-b ${gradientColor} absolute top-0 left-0 w-full h-full rounded-xl z-[48] `}
      ></div>
    </motion.div>
  );
};

export default PriceCard;
