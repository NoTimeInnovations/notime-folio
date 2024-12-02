"use client";
import React from "react";
import GradientText from "@/components/common/GradientText";
import SwiperSlider from "@/components/home/SwiperSlider";
import { motion } from "framer-motion";
import Button from "@/components/home/Button";
import Link from "next/link";

const TaskPage = () => {
  return (
    <section className="min-h-screen w-screen text-white px-5 md:px-10 lg:px-12 pt-24 md:py-32 xl:px-[10%] xl:py-48">
      {/* Top Section */}
      <div className="grid grid-cols-1 place-items-center lg:place-items-start lg:justify-center lg:grid-cols-2">
        {/* Left Side */}
        <div className="flex-1 h-fit grid gap-6 md:w-[650px] lg:w-[500px] xl:w-[650px] ">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-bold pr-4 md:text-center md:pr-0 lg:text-start lg:pr-4 text-[3rem] md:text-[4rem] lg:text-[3rem] xl:text-[4rem] leading-[3.5rem] md:leading-[4rem] xl:leading-[5rem]"
          >
            <GradientText>Tasks</GradientText>
          </motion.div>

          {/* Sub Description */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-slate-400 font-light text-xl xl:text-2xl md:text-center lg:text-start"
          >
            Dive into coding challenges, master algorithms, and showcase your
            skills. Earn rewards, climb the leaderboard, and unlock your
            potential.
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid gap-6 justify-center lg:justify-start xl:grid-cols-2"
          >
            <Link href="/task-details" passHref>
              <Button
                text={"Task Details"}
                gradient={
                  "bg-gradient-to-r from-green-500 to-green-800 white-shadow"
                }
              />
            </Link>
            <Link href="/submit-solution" passHref>
              <Button
                text={"Submit Solution"}
                gradient={
                  "bg-gradient-to-r from-yellow-500 to-yellow-800 dark-shadow"
                }
              />
            </Link>
          </motion.div>
        </div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="h-min w-full my-20 md:my-10 xl:my-0"
        >
          <SwiperSlider />
        </motion.div>
      </div>

      {/* Profile and Karma Section */}
      <div className="flex justify-between items-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold"
        >
          {/* Title can be added here if needed */}
        </motion.h2>
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          src="/path/to/user-image.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />
      </div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex items-center justify-between p-4 rounded-lg bg-white bg-opacity-10 mb-8 shadow-lg backdrop-blur-md"
      >
        <div className="flex items-center space-x-4">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            src="/path/to/profile-image.png"
            alt="HariDev Avatar"
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-semibold text-xl"
            >
              HariDev
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm text-gray-300"
            >
              Karma Points: 2430
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-sm text-gray-300"
            >
              Tasks Completed: 5/10
            </motion.p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full px-6 py-2 text-sm shadow-lg"
        >
          Continue Preparation
        </motion.div>
      </motion.div>

      {/* Task List Section */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="flex justify-between items-center p-4 rounded-lg bg-white bg-opacity-10 shadow-md backdrop-blur-md"
          >
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
                className="font-semibold text-lg"
              >
                Task {task}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                className="text-sm text-gray-300"
              >
                Variables & Data Types
              </motion.p>
            </div>
            <div className="flex items-center space-x-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.4 }}
                className="text-yellow-400 font-bold"
              >
                10
              </motion.span>
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
                src="/path/to/coin-icon.png"
                alt="Coin Icon"
                className="w-5 h-5"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TaskPage;
