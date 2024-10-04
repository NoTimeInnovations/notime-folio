"use client";
import GradientText from "@/components/common/GradientText";
import H1 from "@/components/common/H1";
import P from "@/components/common/P";
import VideoCard from "@/components/CourseDetail/VideoCard";
import React from "react";

const courseDetail = [
  {
    day: 1,
    videoTitle:
      "Build & Deploy an Amazing 3D Portfolio with React.js & Three.js | Beginner Three.js Tutorial",
    videoDesc:
      "Learn how to build 3D websites from scratch with the Three.js Crash Course. It's a fun and practical way to create a portfolio that really pops!",
  },
  {
    day: 2,
    videoTitle:
      "Build & Deploy an Amazing 3D Portfolio with React.js & Three.js | Beginner Three.js Tutorial",
    videoDesc:
      "Learn how to build 3D websites from scratch with the Three.js Crash Course. It's a fun and practical way to create a portfolio that really pops!",
  },
  {
    day: 3,
    videoTitle:
      "Build & Deploy an Amazing 3D Portfolio with React.js & Three.js | Beginner Three.js Tutorial",
    videoDesc:
      "Learn how to build 3D websites from scratch with the Three.js Crash Course. It's a fun and practical way to create a portfolio that really pops!",
  },
  {
    day: 4,
    videoTitle:
      "Build & Deploy an Amazing 3D Portfolio with React.js & Three.js | Beginner Three.js Tutorial",
    videoDesc:
      "Learn how to build 3D websites from scratch with the Three.js Crash Course. It's a fun and practical way to create a portfolio that really pops!",
  },
  {
    day: 5,
    videoTitle:
      "Build & Deploy an Amazing 3D Portfolio with React.js & Three.js | Beginner Three.js Tutorial",
    videoDesc:
      "Learn how to build 3D websites from scratch with the Three.js Crash Course. It's a fun and practical way to create a portfolio that really pops!",
  },
];

const CourseDetailForRegistered = () => {
  const selectedVideo = courseDetail[0];
  const otherVideos = courseDetail.filter(
    (courseVideos) => courseVideos.day != selectedVideo.day
  );

  return (
    <main className="grid gap-5 lg:grid-cols-[70%,1fr] min-h-screen py-[120px] px-[7%]">
      {/* video section */}
      <section className="">
        {/* video  */}
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
      </section>

      {/* more videos  */}
      <section className="grid gap-5  h-fit">
        {otherVideos.map((video) => (
          <VideoCard video={video} key={video.videoTitle} />
        ))}
      </section>
    </main>
  );
};

export default CourseDetailForRegistered;
