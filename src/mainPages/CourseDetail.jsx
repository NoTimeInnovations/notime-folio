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
import React from "react";
import { AccordionHeader } from "@radix-ui/react-accordion";
import H1 from "@/components/common/H1";
import GradientText from "@/components/common/GradientText";
import P from "@/components/common/P";

const CourseDetail = ({ course }) => {
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-20 mt-10 px-5 md:px-10 lg:px-16 xl:px-[15%] bg-gray-900 text-gray-200">
      {/* Course Detail Grid Layout */}
      <DetailCard
        id={course?.id}
        price={course?.amount}
        discount={course?.discount}
        image={course?.image}
        description={course?.description}
        title={course?.title}
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
              {course?.roadmap?.map((roadmap) => {
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
                      {roadmap?.Topics?.map((topic) => {
                        return (
                          <div className="bg-gradient-to-r from-slate-950 rounded-md grid grid-cols-[250px,1fr] cursor-pointer hover:from-green-900 transition-all">
                            {/* topic thumbnail  */}
                            <div className="bg-black aspect-video h-full rounded-md"></div>

                            {/* topic details  */}
                            <div className="grid content-center gap-1 p-5">
                              {/* topic title  */}
                              <div className="font-bold text-2xl">
                                <GradientText>{topic.topic}</GradientText>
                              </div>
                              {/* desc  */}
                              <P className='md:text-base lg:text-base'>{topic.shortDesc}</P>
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
          <div className="hidden lg:block">
            <CourseReview reviews={course?.reviews}></CourseReview>
          </div>
        </div>

        {/* Learnings and Prerequisites */}
        <div className="space-y-5">
          <CouresLearn learnings={course?.learnings} />
        </div>
      </div>

      <div className="lg:hidden mt-5">
        <CourseReview reviews={course?.reviews}></CourseReview>
      </div>
    </div>
  );
};

export default CourseDetail;
