"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import GradientText from "@/components/common/GradientText";
import H1 from "@/components/common/H1";
import P from "@/components/common/P";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/CourseDetail/enrolled/Tabs";
import McqSection from "@/components/CourseDetail/enrolled/McqSection";
import TaskSection from "@/components/CourseDetail/enrolled/TaskSection";
import VideoCard from "@/components/CourseDetail/enrolled/VideoCard";
import VideoSection from "@/components/CourseDetail/enrolled/VideoSection";

const CourseDetailForRegistered = ({ courseData }) => {
  const [tabValue, setTabValue] = useState("video");

  const courseId = useParams()?.id;
  const [courseDetail, setCourseDetail] = useState(courseData);
  const [mcqCompleted, setMCQCompleted] = useState(false);
  const [nextTopic, setNextTopic] = useState(null);
  const [nextRoadmap, setNextRoadmap] = useState(null);

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/mcq-submissions?where[student_id][equals]=${user.id}&where[task_id][equals]=${selectedTopic?.task?.id}&depth=0`
      );
      const data = await response.json();

      if (data?.docs?.length > 0) {
        setMCQCompleted(data?.docs[0]);
      } else {
        setMCQCompleted(false);
      }
    } catch (error) {
      console.error("Error fetching MCQ submission: ", error);
    }
  };

  useEffect(() => {
    const unlRoadmap = courseDetail?.roadmap.find(
      (rm) => rm.id == courseDetail?.roadmap_id
    );

    const unlRoadmapIndex = courseDetail?.roadmap.findIndex(
      (rm) => rm.id == courseDetail?.roadmap_id
    );

    const unlTopic = unlRoadmap?.Topics?.find(
      (topic) => topic?.id === courseDetail?.topic_id
    );
    const unlTopicIndex = unlRoadmap?.Topics?.findIndex(
      (topic) => topic?.id === courseDetail?.topic_id
    );

    setUnlockedRoadmap(unlRoadmap);
    setUnlockedRoadmapIndex(unlRoadmapIndex);
    setUnlockedTopic(unlTopic);
    setUnlockedTopicIndex(unlTopicIndex);

    setSelectedRoadmap(unlRoadmap);
    setSelectedRoadmapIndex(unlRoadmapIndex);
    setSelectedTopic(unlTopic);
    setSelectedTopicIndex(unlTopicIndex);
  }, [courseDetail, courseData]);

  useEffect(() => {
    if (selectedTopic) {
      fetchMCQSubmission();
    }

    const nxtRoadmap = courseDetail?.roadmap[selectedRoadmapIndex + 1];
    if (nxtRoadmap) {
      setNextRoadmap(nxtRoadmap);
    }else{
      setNextRoadmap(null);
    }

    let nextTopic = selectedRoadmap?.Topics[selectedTopicIndex + 1];

    if (
      !nextTopic &&
      selectedRoadmapIndex < selectedRoadmap?.Topics.length - 1
    ) {
      nextTopic = nextRoadmap?.Topics[0];
    }

    setNextTopic(nextTopic);
  }, [selectedTopic, selectedRoadmap]);

  useEffect(() => {
    setTabValue("video");
  }, [selectedTopic, selectedRoadmap]);

  return (
    <main className="grid gap-5 lg:grid-cols-[.8fr,50%,1fr] min-h-screen py-[120px] px-[2%] ">
      {/* roadmaps  */}
      <section className="bg-[#080b0f] rounded order-[99] lg:order-[0] mt-5 lg:mt-0">
        {/* heading  */}
        <div className="text-white/70 bg-black p-5 font-bold ">Roadmap</div>

        {/* roadmpas  */}
        <div className="max-h-[80vh] overflow-y-auto">
          {courseDetail?.roadmap?.map((roadmap, index) => {
            const isSelected = selectedRoadmap?.id == roadmap?.id;
            const isEven = index % 2 == 0;
            const isUnlocked = unlockedRoadmapIndex >= index; 
            return (
              <>
                <div
                  onClick={() => {
                    if (!isUnlocked) {
                      toast.error(
                        "Please complete previous roadmaps to unlock this roadmap"
                      );
                    } else {
                      setSelectedRoadmap(roadmap);
                      setSelectedRoadmapIndex(index);
                      setSelectedTopic(roadmap?.Topics[0]);
                      setSelectedTopicIndex(0); 
                      setUnlockedTopicIndex(roadmap?.Topics.length - 1);  
                    }
                  }}
                  key={roadmap.id}
                  className={`${!isUnlocked ? "opacity-50 cursor-not-allowed " : ' cursor-pointer'} ${isSelected ? "text-green-500 border-l-4 border-green-500 bg-green-950/50" : "text-white/70 "} hover:brightness-125 font-medium p-3 ${isEven ? "bg-[#0e141b]" : "bg-[#05080b]"}`}
                >
                  <span>Day {roadmap?.day}</span>
                </div>
              </>
            );
          })}
        </div>
      </section>

      {/* video, mcq, tasks tabs  */}
      <section>
        <Tabs
          defaultValue="video"
          value={tabValue}
          onValueChange={(value) => setTabValue(value)}
          className="w-full"
        >
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
                roadmapId: selectedRoadmap?.id,
                topicId: selectedTopic?.id,
                nextTopicId: nextTopic?.id,
                nextRoadmapId: nextRoadmap?.id,
                isLastTopic:
                  selectedTopicIndex === selectedRoadmap?.Topics?.length - 1,
              }}
              actions={{
                setCourseDetail,
              }}
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* topic videos  */}
      <section>
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
          {selectedRoadmap?.Topics?.map((video, index) => {
            console.log("selectedRoadmapIndex", selectedRoadmapIndex);
            console.log("unlockedRoadmapIndex", unlockedRoadmapIndex);
            console.log("index", index);
            console.log("unlockedTopicIndex", unlockedTopicIndex);
            
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
