import React from "react";
import { motion } from "framer-motion";

const QuestionOpenBtn = ({ isOpen }) => {

    const verticlLineVarient = {

        open : {
            rotate : 90,
        },

        close : {
            rotate : 0,
        }

    }

  return (
    <div >
        {/* circle  */}
      <div className=" border-[3px] border-slate-400 w-8 h-8 rounded-full relative">
        {/* horizontal line  */}
        <div className="bg-slate-400 w-[70%] h-1 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        {/* vertical line  */}
        <motion.div variants={verticlLineVarient} animate={ isOpen ? 'open' : 'close' } className="bg-slate-400 h-[70%] w-1 rounded absolute top-[17%] left-[43%] "></motion.div>
      </div>
    </div>
  );
};

export default QuestionOpenBtn;
