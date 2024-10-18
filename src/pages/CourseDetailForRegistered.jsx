"use client";
import GradientText from "@/components/common/GradientText";
import H1 from "@/components/common/H1";
import P from "@/components/common/P";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import McqSection from "@/components/CourseDetail/McqSection";
import TaskSection from "@/components/CourseDetail/TaskSection";
import VideoCard from "@/components/CourseDetail/VideoCard";
import VideoSection from "@/components/CourseDetail/VideoSection";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

// const courseDetail = [
//   {
//     day: 1,
//     videoTitle:
//       "Build & Deploy an Amazing 3D Portfolio with React.js & Three.js | Beginner Three.js Tutorial",
//     videoDesc:
//       "Learn how to build 3D websites from scratch with the Three.js Crash Course. It's a fun and practical way to create a portfolio that really pops!",
//     tasks: {
//       taskTitle: "Create a Rotating 3D Cube",
//       taskDesc:
//         "In this task, you'll create a simple 3D cube that rotates in the browser using Three.js.",
//       problems: [
//         {
//           problemTitle: "Cube Not Rendering",
//           status: "completed",
//           problemDesc:
//             "The cube fails to render on the page, and the screen remains blank.",
//           demo: "http://example.com/cube-not-rendering",
//         },
//         {
//           problemTitle: "Cube Rotation Lag",
//           status: "pending",
//           problemDesc: "The cube rotation is slow and stutters when rotating.",
//           demo: "http://example.com/cube-rotation-lag",
//         },
//       ],
//     },
//   },
//   {
//     day: 2,
//     videoTitle:
//       "Mastering 3D Lighting and Shadows in Three.js | Intermediate Tutorial",
//     videoDesc:
//       "Dive deeper into Three.js as you learn about lighting and shadows to enhance your 3D scenes.",
//     tasks: {
//       taskTitle: "Add Dynamic Lighting to Your Scene",
//       taskDesc:
//         "In this task, you'll implement dynamic lighting that changes with user interaction.",
//       problems: [
//         {
//           problemTitle: "Lighting Not Affecting Object",
//           status: "pending",
//           problemDesc:
//             "The lighting setup is not affecting the 3D objects as expected.",
//           demo: "http://example.com/lighting-not-affecting",
//         },
//         {
//           problemTitle: "Shadows Not Casting",
//           status: "completed",
//           problemDesc:
//             "Shadows are not being cast by the 3D objects in the scene.",
//           demo: "http://example.com/shadows-not-casting",
//         },
//       ],
//     },
//   },
//   {
//     day: 3,
//     videoTitle:
//       "Creating Interactive 3D Experiences with Three.js | Advanced Techniques",
//     videoDesc:
//       "Learn how to make your 3D portfolio interactive by adding event listeners and user controls.",
//     tasks: {
//       taskTitle: "Implement User Controls",
//       taskDesc:
//         "In this task, you'll create controls that allow users to interact with the 3D environment.",
//       problems: [
//         {
//           problemTitle: "Controls Not Responding",
//           status: "pending",
//           problemDesc:
//             "User controls are not responding to mouse movements or keyboard inputs.",
//           demo: "http://example.com/controls-not-responding",
//         },
//         {
//           problemTitle: "Camera Angle Issues",
//           status: "completed",
//           problemDesc:
//             "The camera angle does not change smoothly when the user interacts.",
//           demo: "http://example.com/camera-angle-issues",
//         },
//       ],
//     },
//   },
//   {
//     day: 4,
//     videoTitle: "Optimizing Performance in Three.js | Best Practices",
//     videoDesc:
//       "Explore techniques to optimize your 3D scenes for better performance and smoother animations.",
//     tasks: {
//       taskTitle: "Reduce Polygon Count",
//       taskDesc:
//         "In this task, you'll learn how to simplify your 3D models for better performance.",
//       problems: [
//         {
//           problemTitle: "Performance Lag",
//           status: "pending",
//           problemDesc:
//             "The application lags during complex scenes with many polygons.",
//           demo: "http://example.com/performance-lag",
//         },
//         {
//           problemTitle: "Texture Loading Issues",
//           status: "completed",
//           problemDesc: "Textures are taking too long to load in the scene.",
//           demo: "http://example.com/texture-loading-issues",
//         },
//       ],
//     },
//   },
//   {
//     day: 5,
//     videoTitle: "Deploying Your 3D Portfolio Online | Final Steps",
//     videoDesc:
//       "Learn how to deploy your finished 3D portfolio to the web and share it with the world.",
//     tasks: {
//       taskTitle: "Deploy Your Project on Netlify",
//       taskDesc:
//         "In this task, you'll set up your project for deployment using Netlify.",
//       problems: [
//         {
//           problemTitle: "Deployment Failed",
//           status: "pending",
//           problemDesc: "The deployment to Netlify fails due to missing files.",
//           demo: "http://example.com/deployment-failed",
//         },
//         {
//           problemTitle: "Site Not Responsive",
//           status: "completed",
//           problemDesc:
//             "The deployed site does not respond well on mobile devices.",
//           demo: "http://example.com/site-not-responsive",
//         },
//       ],
//     },
//   },
// ];

const CourseDetailForRegistered = ({ courseDetail, lastWatched }) => {
  console.log("Course Detail: ", courseDetail);

  const currentTopic = courseDetail?.Topics.find(
    (topic) => topic.id == lastWatched.topic
  );

  const otherTopics = courseDetail?.Topics.filter(
    (topic) => topic.id != lastWatched.topic
  );

  console.log("Current Topic: ", currentTopic);

  return (
    <main className="grid gap-5 lg:grid-cols-[70%,1fr] min-h-screen py-[120px] px-[7%] ">
      {/* left section */}
      <section className="">
        {/* tabs  */}
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="flex items-center gap-3 mb-5">
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="mcqs">MCQ's</TabsTrigger>
          </TabsList>
          <TabsContent value="video">
            <VideoSection
              selectedVideo={{
                videoLink: currentTopic?.video,
                videoTitle: currentTopic?.topic,
                videoDesc: currentTopic?.shortDesc,
              }}
            />
          </TabsContent>
          <TabsContent value="tasks">
            <TaskSection
              task={{
                taskTitle: currentTopic?.task?.title,
                taskDesc: currentTopic?.task?.description,
                problems: currentTopic?.task?.problems,
                mcqs: currentTopic?.task?.mcqs,
              }}
            />
          </TabsContent>
          <TabsContent value="mcqs">
            <McqSection mcqs={currentTopic?.task?.mcqs} />
          </TabsContent>
        </Tabs>
      </section>

      {/* more videos  */}
      <section>
        {/* video details  */}
        <div className="mt-5 max-w-[95%] mb-5">
          {/* day num  */}
          <div className="font-bold text-white text-2xl">
            <GradientText>Day {courseDetail?.day}</GradientText>
          </div>

          {/* title  */}
          <H1 className="font-bold text-white text-[1.5rem] xl:text-[1.5rem] lg:text-[1.5rem] leading-[2rem] lg:leading-[2rem] xl:leading-[2rem]">
            {currentTopic?.topic}
          </H1>
          {/* description  */}
          <P
            className={
              "text-white/70 mt-2 text-[1rem] xl:text-[1rem] lg:text-[1rem]"
            }
          >
            {currentTopic?.shortDesc}
          </P>
        </div>
        {otherTopics.map((video) => (
          <VideoCard
            video={{
              videoTitle: video.topic,
              day: courseDetail?.day,
            }}
            key={video.topic}
          />
        ))}
      </section>
    </main>
  );
};

export default CourseDetailForRegistered;
