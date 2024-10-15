"use client";
import { CouresLearn } from "@/components/courses/CourseLearn";
import { CourseRequirements } from "@/components/courses/CourseRequirements";
import { CourseReview } from "@/components/courses/CourseReview";
import { CourseRoadmap } from "@/components/courses/CourseRoadmap";
import { DetailCard } from "@/components/courses/DetailCard";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const CourseDetail = () => {
  const [course, setCourse] = React.useState(null);
  const id = useParams().id;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses/${id}?depth=3`
        );
        const data = await response.json();

        const formatedData = {
          id: data?.id,
          title: data?.title,
          amount: data?.amount,
          discount: data?.discount,
          preRequirements: data?.pre_requirements,
          learnings: data?.learnings,
          description: data?.shortDesc,
          image: process.env.NEXT_PUBLIC_PAYLOAD_URL + data?.image?.url,
          roadmap: data?.Roadmap,
          reviews: data?.reviews || [],
        };

        console.log("Course Data: ", formatedData);

        setCourse(formatedData);
      } catch (error) {
        console.log("Error fetching course data: ", error);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <div className="min-h-screen py-20 mt-10 px-5 md:px-10 lg:px-16 xl:px-[15%] bg-gray-900 text-gray-200">
      {/* Course Detail Grid Layout */}
      <DetailCard
        id={id}
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
          <CourseRoadmap roadmap={course?.roadmap}></CourseRoadmap>
          {/* Reviews Section */}
          <div className="hidden lg:block">
            <CourseReview reviews={course?.reviews}></CourseReview>
          </div>
        </div>

        {/* Learnings and Prerequisites */}
        <div className="space-y-5">
          <CouresLearn learnings={course?.learnings} />
          <CourseRequirements requirements={course?.preRequirements} />
        </div>
      </div>

      <div className="lg:hidden mt-5">
        <CourseReview reviews={course?.reviews}></CourseReview>
      </div>
    </div>
  );
};

export default CourseDetail;
