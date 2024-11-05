"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import PossibilitieCard from "../MernStackDev/CareerPathsSection/PossibilitieCard";

// const flows = [
//   {
//     title: "Course Enrollment",
//     desc: "Enroll to start your learning journey and gain essential skills.",
//   },
//   {
//     title: "Learning Phase",
//     desc: "Engage in sessions and projects to deepen your understanding.",
//   },
//   {
//     title: "Course Enrollment",
//     desc: "Secure your spot to access resources and expert guidance.",
//   },
//   {
//     title: "Practice",
//     desc: "Apply what you've learned through practical exercises.",
//   },
//   {
//     title: "Build",
//     desc: "Work on projects that demonstrate your skills.",
//   },
//   {
//     title: "Mentor Review",
//     desc: "Get feedback from mentors to refine your work.",
//   },
//   {
//     title: "Project Building",
//     desc: "Collaborate on projects to showcase your abilities.",
//   },
//   {
//     title: "Course Completion",
//     desc: "Celebrate completion and earn a certificate.",
//   },
//   {
//     title: "Step into Freelance",
//     desc: "Learn to navigate the freelance landscape.",
//   },
//   {
//     title: "Internship Phase",
//     desc: "Gain experience through internships for job readiness.",
//   },
//   {
//     title: "Technical Interview Preparation",
//     desc: "Master common interview questions and strategies.",
//   },
//   {
//     title: "Placement Assistance",
//     desc: "Get support for job placements and opportunities.",
//   },
// ];

const flows = [
  {
    title: "Course Enrollment",
    desc: "Enroll to start your learning journey and access resources.",
  },
  {
    title: "Learning Phase",
    desc: "Engage in sessions and projects to deepen your understanding.",
  },
  {
    title: "Practice & Build",
    desc: "Apply your knowledge through practical exercises and projects.",
  },
  {
    title: "Mentor Review",
    desc: "Receive feedback from mentors to improve your work.",
  },
  {
    title: "Project Collaboration",
    desc: "Work with peers on projects to showcase your skills.",
  },
  {
    title: "Course Completion",
    desc: "Celebrate completion and earn your certificate.",
  },
  {
    title: "Freelancing & Internship",
    desc: "Navigate freelancing and gain experience through internships.",
  },
  {
    title: "Interview Preparation",
    desc: "Master interview questions and strategies.",
  },
  {
    title: "Placement Assistance",
    desc: "Get support for job placements and career opportunities.",
  },
  {
    title: "Skill Development Continues",
    desc: "Continuous learning to enhance your skills and career prospects.",
  },
];

const TeachingFlow = ({ startIndex, number }) => {
  const containerRef = useRef();
  const mobileContainerRef = useRef();
  const { scrollYProgress } = useScroll();

  const barWidth = useTransform(scrollYProgress, [0, 1], ["-50%", "190%"]);


  const { scrollYProgress : scrollYMobile } = useScroll({
    target : mobileContainerRef,
    offset : ['start end' , 'end center']
  });
  const barHeight = useTransform(scrollYMobile , [0,1] , ["-5%", "100%"])

  return (
    <>
    {/* desktop divs  */}
      <div ref={containerRef} className="relative hidden lg:block">
        {/* flowboxes  */}
        <div className="flex justify-between items-center relative z-20">
          {flows.slice(startIndex, number).map((flow, index) => {
            const startScroll = (1 / flows.length) * index;
            const endScroll = (1 / flows.length) * (index + 1);

            const widthPercent = useTransform(
              scrollYProgress,
              [startScroll - 0.1, endScroll],
              ["0%", "300%"]
            );

            return (
              <div
                key={flow.title}
                className="bg-white/50 relative p-[1px] rounded-md overflow-hidden cursor-pointer select-none"
              >
                <div className="bg-[#151b24] px-5 py-10 rounded-md relative z-10 group min-w-0  hover:min-w-[200px] transition-all duration-1000">
                  <h1 className="text-white font-semibold">{flow.title}</h1>
                  <p className="overflow-hidden max-w-[0px] text-white/50 pt-2 max-h-[0px] group-hover:max-w-[200px] group-hover:max-h-[200px] transition-all duration-1000">
                    {flow.desc}
                  </p>
                </div>

                {/* color border  */}
                <motion.div
                  style={{ scaleX: widthPercent }}
                  className="absolute bg-gradient-to-r origin-left from-yellow-500 to-green-500 top-0 left-0 h-full w-full"
                ></motion.div>
              </div>
            );
          })}
        </div>

        {/* bar  */}
        <div className="h-[7px] bg-[#212534] rounded-full w-full absolute top-1/2 -translate-y-1/2 overflow-hidden ">
          <motion.div
            style={{ scaleX: barWidth }}
            className="h-full bg-gradient-to-r from-green-500 to-yellow-500 origin-left rounded-full relative"
          ></motion.div>
        </div>
      </div>

      {/* mobile divs  */}
      <div className="h-[100%] grid place-items-center relative">
        {/* center line  */}
        <div
          ref={mobileContainerRef}
          className="absolute w-2 h-[100%] bg-[#212534] rounded-full overflow-hidden"
        >
          {/* coloured line  */}
          <motion.div
            style={{ scaleY: barHeight }}
            className="w-full h-full bg-gradient-to-b from-yellow-500 to-green-500 rounded-full origin-top"
          ></motion.div>
        </div>

        {/* flows */}

        <div className=" w-full grid gap-44 py-40 lg:hidden">
          {
            flows.map((flow,index) => (
              <PossibilitieCard key={'possibility_' + index} heading={flow.title} arrange={'justify-center'}>
                {flow.desc}
              </PossibilitieCard>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default TeachingFlow;
