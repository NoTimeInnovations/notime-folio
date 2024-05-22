import React from "react";
import { motion } from "framer-motion";

const NormalButton = ({gradient,children , onClick}) => {
  return (
    <motion.div
    initial={{ opacity : 0 , y : 50}}
    whileInView={{ opacity : 1 , y : 0}}
    viewport={{ once : true }}
    onClick={onClick}
      className={`${gradient} cursor-pointer flex items-center py-3 px-10 text-lg font-semibold rounded-md justify-center w-fit`}
    >
      {children}
    </motion.div>
  );
};

export default NormalButton;
