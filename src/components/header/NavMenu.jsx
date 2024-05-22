import React from "react";
import { motion } from "framer-motion";
import ListItems from "./ListItems";

const NavMenu = ({ isOpen, setIsOpen }) => {
  const menuVariants = {
    open: {
      clipPath: "circle(150% at 78% 0)",
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    closed: {
      clipPath: "circle(0% at 78% 0)",
      x: 100,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const menuLinks = [
    {
      name: "MERN Stack Development",
      url: "/mern-stack-development",
      icon: "/mern-stack-icon.svg",
    },
    {
      name: "Student Projects",
      url: "/student-projects",
      icon: "/projects-icon.svg",
    },
    {
      name: "Youtube Videos",
      url: "/youtube-videos",
      icon: "/videos-icon.svg",
    },
    {
      name: "Contact Us",
      url: "/contact-us",
      icon: "/contact-icon.svg",
    },
  ];

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <motion.div
      className="bg-[#111318] overflow-hidden fixed z-[100] h-[calc(100vh-79px)] w-fit right-0 top-[85px] lg:h-auto lg:top-[88px] lg:right-60"
      variants={menuVariants}
      animate={isOpen ? "open" : "closed"}
    >
      {/* items  */}

      <motion.div variants={variants} animate={isOpen ? "open" : "closed"}>
        {menuLinks.map((link, index) => (
          <ListItems
            key={index}
            name={link.name}
            url={link.url}
            setIsOpen={setIsOpen}
            icon={link.icon}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NavMenu;
