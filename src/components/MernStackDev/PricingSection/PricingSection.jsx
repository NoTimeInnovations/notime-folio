import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PriceCard from "./PriceCard";
import { client } from "@/utils/sanity/client";

const PricingSection = () => {
  const [pricingLevels, setPricingLevels] = useState([]);

  useEffect(() => {
    const pricings = async () => {
      const data =
        await client.fetch(`*[_type == "pricing"] | order(order asc) {
        tag,
        subTag,
        price,
        description,
        features
      }
      `);
      setPricingLevels(data);
    };

    pricings();
  }, []);

  const gradientsForLevels = [
    "from-green-500 to-yellow-500",
    "from-sky-500 to-violet-500",
    "from-rose-500 to-amber-500",
    "from-blue-500 to-green-500",
    "from-violet-500 to-sky-500",
  ];

  return (
    <div id="#pricing" className="grid gap-10 md:max-w-[80%] place-items-center mt-10">
      {/* heading  */}
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[2rem] leading-[2rem] md:text-[4rem] md:leading-[4rem] font-bold text-center max-w-4xl"
      >
        Become a top 1% MERN Stack developer in only one course
      </motion.p>

      {/* price card  */}
      <div className="flex flex-col xl:flex-row-reverse gap-10 justify-center items-center">
        {pricingLevels.map((pricingLevel, index) => (
          <PriceCard
            key={`Pricing_level_${index}`}
            index={index}
            gradientColor={
              gradientsForLevels[index % gradientsForLevels.length]
            }
            pricingLevel={pricingLevel}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
