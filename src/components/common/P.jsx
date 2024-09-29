"use client";
import React from "react";
import { motion } from "framer-motion";

const P = ({ children, className }) => {
  return <motion.div initial={{opacity : 0, y : 20}} whileInView={{ opacity : 1 , y : 0 }} transition={{ delay : 0.2 }} viewport={{ once : true }} className={`text-slate-300 md:text-xl lg:leading-[1.7rem] ${className}`}>{children}</motion.div>;
};

export default P;
