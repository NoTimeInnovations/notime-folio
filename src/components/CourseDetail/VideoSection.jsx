"use client";
import React from "react";
import GradientText from "../common/GradientText";
import H1 from "../common/H1";
import P from "../common/P";

const VideoSection = ({ selectedVideo }) => {
  return (
    <>
      <div className=" aspect-video bg-black rounded-xl"></div>

      {/* video details  */}
      <div className="mt-5 max-w-[95%]">
        {/* day num  */}
        <div className="font-bold text-white text-2xl">
          <GradientText>Day {selectedVideo?.day}</GradientText>
        </div>

        {/* title  */}
        <H1 className="font-bold text-white lg:text-[2rem] leading-[2rem] lg:leading-[2.5rem] xl:leading-[2.5rem]">
          {selectedVideo?.videoTitle}
        </H1>
        {/* description  */}
        <P className={"text-white/70 mt-5"}>{selectedVideo?.videoDesc}</P>
      </div>
    </>
  );
};

export default VideoSection;
