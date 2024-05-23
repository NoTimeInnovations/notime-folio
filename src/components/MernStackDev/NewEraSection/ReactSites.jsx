import React from "react";
import { logos } from "./Logos";
import { motion } from "framer-motion";
import Image from "next/image";

export const Logo = ({ logo }) => {
  return (
    <abbr
      title={logo.title}
      className="bg-[#161821] p-5 w-28 aspect-square rounded-lg grid place-content-center"
    >
      <Image
        width={10}
        height={10}
        className={`w-10 ${logo.className}`}
        src={`/react-sites${logo.url}`}
        alt={logo.title}
      />
    </abbr>
  );
};

const ReactSites = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      className="grid grid-cols-3 gap-3 w-fit md:gap-10 md:grid-cols-4"
    >
      {logos.map((logo, index) => (
        <motion.div
          key={`logo_${index}`}
          variants={itemVariants}
          viewport={{ once: true }}
          className={`logo_${index}`}
        >
          <Logo logo={logo} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ReactSites;
