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
import toast from "react-hot-toast";

const CourseDetailForRegistered = ({ courseDetail, lastWatched }) => {
  const courseId = useParams()?.id;
  const [mcqCompleted, setMCQCompleted] = useState(false);
  const [nextTopic, setNextTopic] = useState(null);

  const [unlockedTopic, setUnlockedTopic] = useState(null);
  const [unlockedTopicIndex, setUnlockedTopicIndex] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);

  const [unlockedRoadmap, setUnlockedRoadmap] = useState(null);
  const [unlockedRoadmapIndex, setUnlockedRoadmapIndex] = useState(null);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [selectedRoadmapIndex, setSelectedRoadmapIndex] = useState(null);

  const fetchMCQSubmission = async () => {
    try {
      const user = JSON.parse(Cookies.get("user"));
      console.log(selectedTopic?.task?.id);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/mcq-submissions?where[student_id][equals]=${user.id}&where[task_id][equals]=${selectedTopic?.task?.id}&depth=0`
      );
      const data = await response.json();

      if (data?.docs?.length > 0) {
        setMCQCompleted(data?.docs[0]);
      }else{
        setMCQCompleted(false);
      }
    } catch (error) {
      console.error("Error fetching MCQ submission: ", error);
    }
  };

  useEffect(() => {
    const unlRoadmap = courseDetail?.roadmap.find(
      (rm) => rm.id == lastWatched?.day?.trim()
    );

    const unlRoadmapIndex = courseDetail?.roadmap.findIndex(
      (rm) => rm.id == lastWatched?.day?.trim()
    );

    const unlTopic = unlRoadmap?.Topics?.find(
      (topic) => topic?.id === lastWatched?.topic.trim()
    );
    const unlTopicIndex = unlRoadmap?.Topics?.findIndex(
      (topic) => topic?.id === lastWatched?.topic.trim()
    );

    // Set unlocked roadmap/topic and their indexes
    setUnlockedRoadmap(unlRoadmap);
    setUnlockedRoadmapIndex(unlRoadmapIndex);
    setUnlockedTopic(unlTopic);
    setUnlockedTopicIndex(unlTopicIndex);

    // Initialize selected roadmap/topic to unlocked values on page load
    setSelectedRoadmap(unlRoadmap);
    setSelectedRoadmapIndex(unlRoadmapIndex);
    setSelectedTopic(unlTopic);
    setSelectedTopicIndex(unlTopicIndex);
  }, [courseDetail, lastWatched]);

  useEffect(() => {
    if (selectedTopic) {
      fetchMCQSubmission();
    }

    const nextTopic = selectedRoadmap?.Topics[selectedTopicIndex + 1];
    if (nextTopic) {
      setNextTopic(nextTopic);
    }
  }, [selectedTopic]);

  return (
    <main className="grid gap-5 lg:grid-cols-[70%,1fr] min-h-screen py-[120px] px-[7%] ">
      {/* left section */}
      <section className="">
        {/* tabs  */}
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="flex items-center gap-3 mb-5">
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="mcqs">MCQ's</TabsTrigger>
            <TabsTrigger disabled={!mcqCompleted} value="tasks">
              Tasks
            </TabsTrigger>
          </TabsList>
          <TabsContent value="video">
            <VideoSection
              selectedVideo={{
                videoLink: selectedTopic?.video,
                videoTitle: selectedTopic?.topic,
                videoDesc: selectedTopic?.shortDesc,
              }}
            />
          </TabsContent>
          <TabsContent value="mcqs">
            <McqSection
              setMCQCompleted={setMCQCompleted}
              completedMCQ={mcqCompleted}
              mcqs={selectedTopic?.task?.mcqs}
              taskId={selectedTopic?.task?.id}
            />
          </TabsContent>
          <TabsContent value="tasks">
            <TaskSection
              task={{
                taskTitle: selectedTopic?.task?.title,
                taskDesc: selectedTopic?.task?.description,
                problems: selectedTopic?.task?.problems,
                id: selectedTopic?.task?.id,
              }}
              courseInfo={{
                courseId: courseId,
                roadmapId: courseDetail?.id,
                topicId: selectedTopic?.id,
                nextTopicId: nextTopic?.id,
              }}
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* more videos */}
      <section>
        {/* video details */}
        <div className="mt-5 max-w-[95%] mb-5">
          <div className="font-bold text-white text-2xl">
            <GradientText>Day {selectedRoadmap?.day}</GradientText>
          </div>
          <H1 className="font-bold text-white text-[1.5rem]">
            {selectedTopic?.topic}
          </H1>
          <P className="text-white/70 mt-2 text-[1rem]">
            {selectedTopic?.shortDesc}
          </P>
        </div>
        <div className="grid h-fit gap-3">
          {unlockedRoadmap?.Topics?.map((video, index) => {
            const isUnlocked =
              selectedRoadmapIndex <= unlockedRoadmapIndex &&
              index <= unlockedTopicIndex;

            return (
              <VideoCard
                isUnlocked={isUnlocked}
                onClick={() => {
                  if (!isUnlocked) {
                    toast.error(
                      "Please complete previous topics to unlock this topic"
                    );
                  } else {
                    setSelectedTopic(video);
                    setSelectedTopicIndex(index);
                  }
                }}
                index={index}
                currentVideoTitle={selectedTopic?.topic}
                videoTitle={video?.topic}
                key={video?.id}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default CourseDetailForRegistered;
