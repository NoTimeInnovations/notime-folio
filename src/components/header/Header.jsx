"use client";

import React, { useEffect, useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import NavMenu from "./NavMenu";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCycle } from "framer-motion";
import { usePathname } from "next/navigation";
import GradientText from "../common/GradientText";
import Cookies from "js-cookie";
import Image from "next/image";
import Avatar from "../common/Avatar";

const InterestedInFreelancingText = ({ className }) => {
  return (
    <Link
      className={`${className} w-fit `}
      href={"https://airtable.com/appsRTpUCJdxOnM0X/pagYAEzHVUCm8iSyY/form"}
    >
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
  const [user, setUser] = useState(null);
  const [mcqPoints, setMcqPoints] = useState(0);
  const [problemPoints, setProblemPoints] = useState(0);

  const fetchUserMCQPoints = async () => {
    const userCookie = JSON.parse(Cookies.get("user"));
    const authToken = Cookies.get("auth_token");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/mcq-submissions?where[student_id][equals]=${userCookie.id}&depth=0`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res?.json();
      const points = data?.docs?.reduce(
        (acc, curr) => acc + curr.pointsScored,
        0
      );
      setMcqPoints(points);
      console.log("mcq points", points);
      
    } catch (err) {
      console.error("Error fetching user points:", err);
    }
  };

  const fetchUserProblemPoints = async () => {
    const userCookie = JSON.parse(Cookies.get("user"));
    const authToken = Cookies.get("auth_token");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/problem-submissions?where[status][equals]=approved&where[user_id][equals]=${userCookie?.id}&depth=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res?.json();

      let points = 0;

      data?.docs?.map((probSubm) => {
        const problem = probSubm?.task_id?.problems?.find(
          (problem) => problem.id === probSubm.problem_id
        );
        points += problem?.point || 0;
      });

      setProblemPoints(points);
      console.log("problem points", points);
      
    } catch (err) {
      console.error("Error fetching user points:", err);
    }
  };

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      fetchUserMCQPoints();
      fetchUserProblemPoints();
    }
    setUser(user ? JSON.parse(user) : null);
  }, [isOpen, pathname]);

  return (
    <nav className={`${isStuduio && "hidden"}`}>
      {/* backdrop  */}
      <div
        className={`lg:hidden bg-[#0000004d] pointer-events-none fixed -top-[1px] left-0 h-screen w-screen backdrop-blur-md z-[51] transition-all ${
          isOpen ? "opacity-1 pointer-events-none" : "opacity-0"
        }`}
      ></div>

      {/* freelancing link  */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 w-screen py-3 z-[51] flex justify-center bg-[#0000006e] backdrop-blur-md border-t-[.5px] border-[#ffffff2d] ${pathname === "/interested-in-freelancing" && "hidden"}`}
      >
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
            <img src="/notime-logo.svg" alt="logo" className="w-10 sm:w-24" />
            <h1 className="text-white font-semibold text-xl lg:text-2xl">
              Notime
            </h1>
          </div>
        </Link>

        {/* hamburger icon  */}

        <div className="flex items-center gap-5 xl:gap-10">
          <InterestedInFreelancingText
            className={`hidden ${pathname !== "/interested-in-freelancing" && "lg:block"}`}
          />

          {/* user  */}
          {user ? (
            <>
              <div
                onClick={() => toggleOpen()}
                className={`flex items-center gap-1 cursor-pointer `}
              >
                <Avatar
                  image={`${user?.image?.url}`}
                  username={user?.name}
                  classname={`${isOpen ? "bg-white/10 p-1 " : ""}  transition-all duration-200`}
                />
                <Image
                  src={"/chevron-down.svg"}
                  alt="arrow-down"
                  width={20}
                  height={20}
                  className={`invert transition-all duration-200 ${isOpen && "rotate-180"}`}
                />
              </div>

              {/* userPoints  */}
              <div className="flex gap-2 items-center">
                <Image
                  src={'/trophy-icon.svg'}
                  alt="points"
                  width={20}
                  height={20}
                  
                />
                <span className="text-white font-semibold text-sm">{mcqPoints + problemPoints}</span>
              </div>
            </>
          ) : (
            <HamburgerIcon isOpen={isOpen} toggleOpen={toggleOpen} />
          )}
        </div>

        {/* links  */}
        <NavMenu isOpen={isOpen} setIsOpen={toggleOpen} />
      </motion.header>
    </nav>
  );
};

export default Header;
