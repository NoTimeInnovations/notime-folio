"use client";

import React from "react";
import HamburgerIcon from "./HamburgerIcon";
import NavMenu from "./NavMenu";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCycle } from "framer-motion";
import { usePathname } from "next/navigation";
import GradientText from "../common/GradientText";

const InterestedInFreelancingText = ({ className }) => {
  return (
    <Link className={`${className} w-fit `} href={"/interested-in-freelancing"}>
      <GradientText className={`font-medium`}>
        Interested in freelancing?
      </GradientText>
    </Link>
  );
};

const Header = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const pathname = usePathname();
  const isStuduio = pathname.includes("/studio");

  return (
    <nav className={`${isStuduio && "hidden"}`}>
      {/* backdrop  */}
      <div
        className={`lg:hidden bg-[#0000004d] pointer-events-none fixed -top-[1px] left-0 h-screen w-screen backdrop-blur-md z-[51] transition-all ${
          isOpen ? "opacity-1 pointer-events-none" : "opacity-0"
        }`}
      ></div>

      {/* freelancing link  */}
      <div className={`lg:hidden fixed bottom-0 left-0 w-screen py-3 z-[51] flex justify-center bg-[#0000006e] backdrop-blur-md border-t-[.5px] border-[#ffffff2d] ${ pathname === '/interested-in-freelancing' && 'hidden' }`}>
        <InterestedInFreelancingText />
      </div>

      {/* header  */}
      <motion.header
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-[#0000006b] z-[51] backdrop-blur-md fixed top-0 left-0 w-screen flex justify-between items-center py-5 px-10 border-b-[1px] border-[#ffffff22] lg:px-40 xl:px-72"
      >
        {/* logo  */}
        <Link
          href={"/"}
          onClick={() => {
            if (isOpen) {
              toggleOpen();
            }
          }}
        >
          <div className="inline-flex items-center gap-4">
            <img src="/notime-logo.svg" alt="logo" className="w-20 lg:w-24" />
            <h1 className="text-white font-semibold text-xl lg:text-2xl">
              Notime
            </h1>
          </div>
        </Link>

        {/* hamburger icon  */}

        <div className="flex items-center gap-5 xl:gap-10">
          <InterestedInFreelancingText className={`hidden ${ pathname !== '/interested-in-freelancing' && 'lg:block' }`} />
          <HamburgerIcon isOpen={isOpen} toggleOpen={toggleOpen} />
        </div>

        {/* links  */}
        <NavMenu isOpen={isOpen} setIsOpen={toggleOpen} />
      </motion.header>
    </nav>
  );
};

export default Header;
