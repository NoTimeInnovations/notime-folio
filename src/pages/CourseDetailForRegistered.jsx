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
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CourseDetailForRegistered = ({ courseDetail, lastWatched }) => {
  const [mcqCompleted, setMCQCompleted] = useState(false);
  const [currentTopic, setCurentTopic] = useState(null);
  const { id: courseId } = useParams();

  const fetchMCQSubmission = async () => {
    try {
      const user = JSON.parse(Cookies.get("user"));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/mcq-submissions?task_id=${currentTopic?.task?.id}?student_id=${user.id}`
      );
      const data = await response.json();

      if (data?.docs?.length > 0) {
        setMCQCompleted(data?.docs[0]);
      }
    } catch (error) {
      console.error("Error fetching MCQ submission: ", error);
    }
  };

  useEffect(() => {
    fetchMCQSubmission();

    console.log("Course Detail: ", courseDetail);
    

    const currTopic = courseDetail?.Topics.find(
      (topic) => topic.id == lastWatched.topic
    );
    setCurentTopic(currTopic);
  }, [courseDetail, lastWatched]);

  return (
    <main className="grid gap-5 lg:grid-cols-[70%,1fr] min-h-screen py-[120px] px-[7%] ">
      {/* left section */}
      <section className="">
        {/* tabs  */}
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="flex items-center gap-3 mb-5">
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="mcqs">MCQ's</TabsTrigger>
            <TabsTrigger disabled={mcqCompleted ? false : true} value="tasks">
              Tasks
            </TabsTrigger>
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
          <TabsContent value="mcqs">
            <McqSection
              setMCQCompleted={setMCQCompleted}
              completedMCQ={mcqCompleted}
              mcqs={currentTopic?.task?.mcqs}
              taskId={currentTopic?.task?.id}
            />
          </TabsContent>
          <TabsContent value="tasks">
            <TaskSection
              task={{
                taskTitle: currentTopic?.task?.title,
                taskDesc: currentTopic?.task?.description,
                problems: currentTopic?.task?.problems,
                id : currentTopic?.task?.id
              }}
              courseInfo={{
                courseId: courseId,
                roadmapId: courseDetail?.id,
                topicId: currentTopic?.id,
              }}
            />
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
        <div className="grid h-fit gap-3">
          {courseDetail?.Topics?.map((video, index) => (
            <VideoCard
              index={index}
              currentVideoTitle={currentTopic?.topic}
              videoTitle={video.topic}
              key={video.topic}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default CourseDetailForRegistered;
