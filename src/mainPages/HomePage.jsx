"use client";
import React from "react";
import GradientText from "@/components/common/GradientText";
import SwiperSlider from "@/components/home/SwiperSlider";
import { motion } from "framer-motion";
import Button from "@/components/home/Button";
import Link from "next/link";
import SocialLinks from "@/components/home/SocialLinks";
import CountsSection from "@/components/home/CountsSection";

import DevelopersSection from "@/components/home/DevelopersSection";
import Testimonial from "@/components/home/Testimonial";
import TeachingFlow from "@/components/home/TeachingFlow";
import H1 from "@/components/common/H1";

const HomePage = () => {
  return (
    <section className="min-h-screen w-screen text-white px-5 md:px-10 lg:px-12 pt-24 md:py-32 xl:px-[10%] xl:py-48">
      {/* top section */}
      <div className="grid grid-cols-1 place-items-center lg:place-items-start lg:justify-center lg:grid-cols-2">
        {/* left side */}
        <div className="flex-1 h-fit grid gap-6 md:w-[650px] lg:w-[500px] xl:w-[650px] ">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-bold pr-4 md:text-center md:pr-0 lg:text-start lg:pr-4 text-[3rem] md:text-[4rem] lg:text-[3rem] xl:text-[4rem] leading-[3.5rem] md:leading-[4rem] xl:leading-[5rem] "
          >
            <GradientText>Master</GradientText> <span>Modern</span> Web
            Development With a <GradientText>Project Based</GradientText>{" "}
            Approach
          </motion.div>

          {/* sub description */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-slate-400 font-light text-xl xl:text-2xl md:text-center lg:text-start"
          >
            Your gateway to efficient learning. Flexible, rewarding, and
            vibrant. Join us, unlock potential, seize every moment.
          </motion.div>

          {/* buttons */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid gap-6 justify-center lg:justify-start xl:grid-cols-2 "
          >
            <Link href="/mern-stack-development" passHref>
              <Button
                text={"MERN Stack Development"}
                gradient={
                  "bg-gradient-to-r from-green-500 to-green-800 white-shadow"
                }
              />
            </Link>
            <Link href="/student-projects" passHref>
              <Button
                text={"Student Projects"}
                gradient={
                  "bg-gradient-to-r from-yellow-500 to-yellow-800 dark-shadow"
                }
              />
            </Link>
          </motion.div>
        </div>

        {/* right side */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="h-min w-full my-20 md:my-10 xl:my-0"
        >
          <SwiperSlider />
        </motion.div>
      </div>

      {/* more contents  */}
      <div className="relative ">
        {/* stop things  */}
        <div className="lg:sticky lg:top-[-270px] z-[10]">
          {/* counts  */}
          <div className="flex justify-center">
            <CountsSection />
          </div>

          <div className="flex justify-center">
            <H1>
              Our Course <GradientText>Journey</GradientText>
            </H1>
          </div>

          {/* teaching flow  */}
          <div className="pb-20 pt-10">
            <TeachingFlow startIndex={0} number={5} />
          </div>

          <div className="pb-20 pt-10 hidden lg:block">
            <TeachingFlow startIndex={5} number={10} />
          </div>

          <div className="flex justify-center">
            <H1>
              Our Top <GradientText>Performer</GradientText>
            </H1>
          </div>

          {/* developers section */}
          <div className="flex justify-center py-10 z-[10]">
            <DevelopersSection />
          </div>

          {/* testimonial section */}
          <div className="flex justify-center relative ">
            <Testimonial />
          </div>
        </div>

        {/* required for animation  */}
        <div className=" lg:min-h-[200vh]"></div>

        {/* social links */}
        <div className="flex justify-center lg:absolute top-10 z-[999] mb-10">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
