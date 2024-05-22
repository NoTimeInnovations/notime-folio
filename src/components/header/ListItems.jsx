import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";


const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const ListItems = ({ name, url, icon, setIsOpen }) => {
  return (
    <Link href={url} onClick={()=>setIsOpen(false)}>
      <motion.div
        variants={variants}
        className="p-8 flex gap-3 items-center text-white cursor-pointer hover:bg-[#ffffff30] "
      >
        <img src={icon} alt={name} className="w-8" />
        <p className="text-xl font-medium text-nowrap">{name}</p>
      </motion.div>
    </Link>
  );
};

export default ListItems;
