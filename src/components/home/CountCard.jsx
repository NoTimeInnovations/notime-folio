import React from "react";
import Odometer from './Odometer'

const CountCard = ({value , text}) => {
  return (
    <div className="grid place-items-center lg:flex lg:items-center lg:gap-2">
      {/* count  */}
      <div className="flex items-center font-bold text-3xl lg:text-6xl w-min">
        <Odometer value={value} />
        <div>+</div>
      </div>
      {/* text  */}
      <div className="font-medium text-center lg:text-start lg:text-lg w-min opacity-50">{text}</div>
    </div>
  );
};

export default CountCard;
