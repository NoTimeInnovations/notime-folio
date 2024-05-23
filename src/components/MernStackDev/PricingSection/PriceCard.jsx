import React from "react";
import Image from "next/image";

const PriceCard = () => {
  return (
    <div className="bg-[#151B24] rounded-xl relative ">
      {/* main container  */}
      <div className="bg-[#151B24] px-5 py-10 rounded-xl relative z-[49] m-[1px] grid place-items-center gap-5">
        {/* type tag */}
        <div className="py-2 px-10 bg-[#0e1218] rounded text-center font-semibold text-xl ">
          {/* gradient  */}
          <span className="bg-overlay bg-gradient-to-r from-red-500 to-red-900">
            The Plus Package
          </span>
        </div>

        {/* sub tag  */}
        <div className="bg-overlay bg-gradient-to-r from-orange-300 to-orange-600 font-medium text-center">
          Deep dive + Build & Deploy + Active lessons
        </div>

        {/* price  */}
        <div className="font-bold text-6xl ">₹1,999</div>

        {/* price sub tag  */}
        <div className="text-lg font-semibold text-slate-300">
          Price including sales tax
        </div>

        {/* buy now button  */}
        <button className="bg-gradient-to-r from-red-500 to-red-600 py-3 text-sm w-full rounded-lg">
          Buy now
        </button>

        {/* description  */}
        <div className="text-sm text-slate-400">
          Master the building of MERN Stack apps in an active way & achieve a
          deep understanding of the web. Propel your career forward with special
          bonuses.
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
        <div className="grid gap-3">
          {/* heading  */}
          <div className="text-xl font-semibold">Features</div>
          {/* features list  */}
          <div className="grid gap-4">

            <div className="flex gap-3 items-start">
              <Image src="checkmark.svg" width={25} height={25} />
              <div className="text-lg font-medium text-slate-300">
                {"Access to GitHub Repository (branches after each module)"}
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Image src="checkmark.svg" width={25} height={25} />
              <div className="text-lg font-medium text-slate-300">
                {"Access to GitHub Repository (branches after each module)"}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* border  */}
      <div className="bg-gradient-to-b from-red-500 to-red-900 absolute top-0 left-0 w-full h-full rounded-xl z-[48]"></div>
    </div>
  );
};

export default PriceCard;
