import React from "react";
import Image from "next/image";

const PriceCard = ({ pricingLevel, gradientColor , index }) => {
  return (
    <div className={`bg-[#151B24] rounded-xl relative max-w-xl`}>
      {/* main container  */}
      <div className="bg-[#151B24] px-5 py-10 md:px-10 md:py-20 rounded-xl relative z-[49] m-[1px] grid place-items-center gap-5">
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
        <div className="font-bold text-6xl md:text-7xl">
          ₹{pricingLevel?.price ? pricingLevel.price.toLocaleString() : "0"}
        </div>

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
        <div className="text-sm text-slate-400 md:text-base">
          {pricingLevel?.description}
        </div>

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
              <div
                key={`${pricingLevel?.tag}_feature_${index}`}
                className="flex gap-3 items-start"
              >
                <Image src="checkmark.svg" width={25} height={25} />
                <div className="text-lg md:text-xl font-medium text-slate-300">
                  {feature}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* border  */}
      <div
        className={` bg-gradient-to-b ${gradientColor} absolute top-0 left-0 w-full h-full rounded-xl z-[48] `}
      ></div>
    </div>
  );
};

export default PriceCard;
