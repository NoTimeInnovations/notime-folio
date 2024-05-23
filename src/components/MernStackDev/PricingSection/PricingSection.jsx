import React from "react";
import { motion } from "framer-motion";
import PriceCard from "./PriceCard";

const PricingSection = () => {
  return (
    <div className="grid gap-10">
      {/* heading  */}
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[2rem] leading-[2rem] md:text-[4rem] md:leading-[4rem] font-bold text-center"
      >
        Become a top 1% MERN Stack developer in only one course
      </motion.p>

      {/* price card  */}

      <PriceCard />
    </div>
  );
};

export default PricingSection;
