import React from "react";
import Odometer from './Odometer'

const CountCard = ({value , text}) => {
  return (
    <div className="grid place-items-center ">
      {/* count  */}
      <div className="flex items-center font-bold text-xl lg:text-3xl">
        <Odometer value={value} />
        <div>+</div>
      </div>
      {/* text  */}
      <div className="font-medium text-center lg:text-lg">{text}</div>
    </div>
  );
};

export default CountCard;
