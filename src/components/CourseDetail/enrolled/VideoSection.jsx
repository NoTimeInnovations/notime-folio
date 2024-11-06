"use client";
import React from "react";
import GradientText from "@/components/common/GradientText";
import H1 from "@/components/common/H1";
import P from "@/components/common/P";

const VideoSection = ({ selectedVideo }) => {
  return (
    <>
      <div className=" aspect-video bg-black rounded-xl"></div>

      {/* video details  */}
      <div className="mt-5 max-w-[95%] hidden lg:block">

        {/* title  */}
        <H1 className="font-bold text-white text-[1.5rem] xl:text-[1.5rem] lg:text-[1.5rem] leading-[2rem] lg:leading-[2rem] xl:leading-[2rem]">
          {selectedVideo?.videoTitle}
        </H1>
        {/* description  */}
        <P
          className={
            "text-white/70 mt-2 text-[1rem] xl:text-[1rem] lg:text-[1rem]"
          }
        >
          {selectedVideo?.videoDesc}
        </P>
      </div>
    </>
  );
};

export default VideoSection;
