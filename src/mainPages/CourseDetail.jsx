"use client";
import { CouresLearn } from "@/components/courses/CourseLearn";
import { CourseRequirements } from "@/components/courses/CourseRequirements";
import { CourseReview } from "@/components/courses/CourseReview";
import { CourseRoadmap } from "@/components/courses/CourseRoadmap";
import { DetailCard } from "@/components/courses/DetailCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/CourseDetail/not-enrolled/Accordion";
import React, { useEffect, useState } from "react";
import { AccordionHeader } from "@radix-ui/react-accordion";
import H1 from "@/components/common/H1";
import GradientText from "@/components/common/GradientText";
import P from "@/components/common/P";
import Image from "next/image";
import VideoModal from "@/components/CourseDetail/not-enrolled/VideoModal";
import toast from "react-hot-toast";

const CourseDetail = ({ course }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const unlockedVideos = {
    0: {
      0: true,
    },
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (selectedVideo && !isModalOpen) {
      setSelectedVideo(null);
    }
  }, [selectedVideo]);

  return (
    <>
      <VideoModal
        selectedVideo={selectedVideo}
        isOpen={isModalOpen}
        setOpen={setModalOpen}
      />
      <div className="min-h-screen py-20 mt-10 px-5 md:px-10 lg:px-16 xl:px-[15%] bg-gray-900 text-gray-200">
        {/* Course Detail Grid Layout */}
        <DetailCard
          id={course?.id}
          price={course?.amount}
          discount={course?.discount}
          image={course?.image}
          description={course?.description}
          title={course?.title}
          courseLevel={course?.courseLevel}
        />

        {/* Days, What You Will Learn, Prerequisites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {/* Days */}
          <div className="md:col-span-2 space-y-5">
            {/* <CourseRoadmap roadmap={course?.roadmap}></CourseRoadmap> */}

            {/* roadmap  */}
            <div className="bg-[#1F2937] rounded-lg p-5 grid gap-4">
              <H1 className={"text-center lg:text-[2.6rem]"}>Roadmap</H1>

              <Accordion type="single" collapsible>
                {course?.roadmap?.map((roadmap, roadmapIndex) => {
                  return (
                    <AccordionItem
                      value={`day-${roadmap.day}`}
                      className="mt-3"
                      key={roadmap.id}
                    >
                      <AccordionTrigger
                        className={
                          "bg-gradient-to-r hover:from-green-500 hover:to-yellow-500 transition-all duration-1000 font-bold"
                        }
                      >
                        Day {roadmap.day}
                      </AccordionTrigger>
                      <AccordionContent className="grid gap-5 py-5">
                        {roadmap?.Topics?.map((topic, topicIndex) => {
                          const isUnlocked =
                            unlockedVideos[roadmapIndex]?.[topicIndex];

                          return (
                            <div className="bg-gradient-to-r from-slate-950 rounded-md grid gap-5 md:grid-cols-[40%,1fr] cursor-pointer hover:from-green-900 transition-all">
                              {/* topic thumbnail  */}
                              <div
                                onClick={() => {
                                  if (isUnlocked) {
                                    setSelectedVideo({
                                      video: topic?.video,
                                      thumbnail: topic?.videoThumbnail,
                                      topic: topic?.topic,
                                      shortDesc: topic?.shortDesc,
                                    });
                                    setModalOpen(true);
                                  } else {
                                    toast.error("Enroll to unlock this video");
                                  }
                                }}
                                className="bg-black w-full rounded-md hover:brightness-90 group relative overflow-hidden"
                              >
                                {/* thubmnail  */}
                                <Image
                                  src={
                                    process.env.NEXT_PUBLIC_CDN_URL +
                                    topic?.videoThumbnail?.filename
                                  }
                                  alt={topic?.topic}
                                  fill
                                />

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 w-[50px] aspect-square rounded-full grid place-items-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 select-none transition-all duration-500">
                                  {isUnlocked ? (
                                    <Image
                                      src={"/play.svg"}
                                      width={40}
                                      height={40}
                                      className="invert"
                                    />
                                  ) : (
                                    <Image
                                      src={"/lock.svg"}
                                      width={38}
                                      height={38}
                                      className="invert"
                                    />
                                  )}
                                </div>
                              </div>

                              {/* topic details  */}
                              <div className="grid content-center gap-1 p-5">
                                {/* topic title  */}
                                <div className="font-bold text-2xl">
                                  <GradientText>{topic.topic}</GradientText>
                                </div>
                                {/* desc  */}
                                <P className="md:text-sm lg:text-sm text-ellipsis ">
                                  {topic.shortDesc.length > 100
                                    ? topic.shortDesc.slice(0, 100) + "..."
                                    : topic.shortDesc}
                                </P>
                              </div>
                            </div>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>

            <CourseRequirements requirements={course?.preRequirements} />
            <div className="hidden md:block">
              <CourseReview reviews={course?.reviews}></CourseReview>
            </div>
          </div>

          {/* Learnings and Prerequisites */}
          <div className="space-y-5">
            <CouresLearn learnings={course?.learnings} />
          </div>
        </div>

        <div className="md:hidden mt-5">
          <CourseReview reviews={course?.reviews}></CourseReview>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
