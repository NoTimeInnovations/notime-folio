import React from "react";

const PriceCard = () => {
  return (
    <div className="bg-[#151B24] rounded-xl relative ">
      {/* main container  */}
      <div className="bg-[#151B24] p-5 rounded-xl relative z-[49] m-[1px]">
        {/* type  */}
        <div>Plus</div>
      </div>
      {/* border  */}
      <div className="bg-gradient-to-b from-red-500 to-red-900 absolute top-0 left-0 w-full h-full rounded-xl z-[48]"></div>
    </div>
  );
};

export default PriceCard;
