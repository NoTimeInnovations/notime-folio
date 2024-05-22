import React from "react";
import { motion } from "framer-motion";

const ToggleBtn = ({isActive , toggleActive}) => {


  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div className={`w-16 h-8 bg-[black] flex rounded-full p-2 cursor-pointer items-center ${!isActive ? 'justify-start' : 'justify-end' }`} onClick={()=>toggleActive()}>
      <motion.div className="w-6 h-6 bg-[white] rounded-full" layout transition={spring} />
    </div>
  );
};

export default ToggleBtn;
