"use client";
import GradientText from "@/components/common/GradientText";
import H1 from "@/components/common/H1";
import P from "@/components/common/P";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/Tabs";
import TaskSection from "@/components/CourseDetail/TaskSection";
import VideoCard from "@/components/CourseDetail/VideoCard";
import VideoSection from "@/components/CourseDetail/VideoSection";
import Button from "@/components/home/Button";
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
      {/* left section */}
      <section className="">
        {/* tabs  */}
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="flex items-center gap-3 mb-5">
            <TabsTrigger
              value="video"
              
            >
              Video
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              
            >
              Tasks
            </TabsTrigger>
          </TabsList>
          <TabsContent value="video">
            <VideoSection selectedVideo={selectedVideo} />
          </TabsContent>
          <TabsContent value="tasks">
            <TaskSection />
          </TabsContent>
        </Tabs>
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
