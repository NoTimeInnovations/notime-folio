"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ListItems from "./ListItems";
import Cookies from "js-cookie";

const NavMenu = ({ isOpen, setIsOpen }) => {
  const [menuLinks, setMenuLinks] = useState([
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
      name: "Events",
      url: "/events",
      icon: "/events.svg",
    },
    {
      name: "Contact Us",
      url: "/contact-us",
      icon: "/contact-icon.svg",
    },
    {
      name: "Login",
      url: "/login",
      icon: "/login-icon.svg",
    },
    {
      name: "Register",
      url: "/registration",
      icon: "/register-icon.svg",
    },
  ]);

  const menuVariants = {
    open: {
      clipPath: "circle(150% at 78% 0)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    closed: {
      clipPath: "circle(0% at 78% 0)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  useEffect(() => {
    const user = Cookies.get("user");

    if (user) {
      const newMenuLinks = menuLinks.slice(0, 5);
      setMenuLinks(
        newMenuLinks.concat([
          {
            name: "Dashboard",
            url: "/dashboard",
            icon: "/dashboard-icon.svg",
          },
          {
            name: "Logout",
            url: "/logout",
            icon: "/logout-icon.svg",
          },
        ])
      );
    } else {
      const newMenuLinks = menuLinks.slice(0, 5);
      setMenuLinks(
        newMenuLinks.concat([
          {
            name: "Login",
            url: "/login",
            icon: "/login-icon.svg",
          },
          {
            name: "Register",
            url: "/registration",
            icon: "/register-icon.svg",
          },
        ])
      );
    }
  }, [isOpen]);

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
