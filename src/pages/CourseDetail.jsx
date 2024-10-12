import { CouresLearn } from "@/components/courses/CourseLearn";
import { CourseRequirements } from "@/components/courses/CourseRequirements";
import { CourseReview } from "@/components/courses/CourseReview";
import { CourseRoadmap } from "@/components/courses/CourseRoadmap";
import { DetailCard } from "@/components/courses/DetailCard";
import React from "react";

const CourseDetail = async ({ id }) => {
  // const course = {
  //   title: "MERN Stack Development",
  //   description: "Master the MERN stack by building real-world projects.",
  //   image: "https://via.placeholder.com/300",
  //   roadmap: [
  //     {
  //       day: "Day 1",
  //       topics: [
  //         {
  //           title: "Introduction",
  //           video: "Video URL",
  //           content: "Overview of the MERN stack",
  //           exercise: "Introduction Exercise",
  //         },
  //         {
  //           title: "Environment Setup",
  //           video: "Video URL",
  //           content: "Setting up your environment",
  //           exercise: "Setup Exercise",
  //         },
  //       ],
  //     },
  //     {
  //       day: "Day 2",
  //       topics: [
  //         {
  //           title: "Understanding MongoDB",
  //           video: "Video URL",
  //           content: "Basics of MongoDB",
  //           exercise: "MongoDB Exercise",
  //         },
  //         {
  //           title: "Building REST APIs",
  //           video: "Video URL",
  //           content: "How to create REST APIs",
  //           exercise: "API Exercise",
  //         },
  //       ],
  //     },
  //     {
  //       day: "Day 3",
  //       topics: [
  //         {
  //           title: "Understanding MongoDB",
  //           video: "Video URL",
  //           content: "Basics of MongoDB",
  //           exercise: "MongoDB Exercise",
  //         },
  //         {
  //           title: "Building REST APIs",
  //           video: "Video URL",
  //           content: "How to create REST APIs",
  //           exercise: "API Exercise",
  //         },
  //       ],
  //     },
  //     {
  //       day: "Day 4",
  //       topics: [
  //         {
  //           title: "Understanding MongoDB",
  //           video: "Video URL",
  //           content: "Basics of MongoDB",
  //           exercise: "MongoDB Exercise",
  //         },
  //         {
  //           title: "Building REST APIs",
  //           video: "Video URL",
  //           content: "How to create REST APIs",
  //           exercise: "API Exercise",
  //         },
  //       ],
  //     },
  //     {
  //       day: "Day 5",
  //       topics: [
  //         {
  //           title: "Understanding MongoDB",
  //           video: "Video URL",
  //           content: "Basics of MongoDB",
  //           exercise: "MongoDB Exercise",
  //         },
  //         {
  //           title: "Building REST APIs",
  //           video: "Video URL",
  //           content: "How to create REST APIs",
  //           exercise: "API Exercise",
  //         },
  //       ],
  //     },
  //   ],
  //   learnings: [
  //     "Introduction to MERN Stack",
  //     "Setting up Development Environment",
  //     "Understanding MongoDB",
  //     "Creating REST APIs with Express.js",
  //     "Building User Interfaces with React",
  //     "Integrating with Node.js Backend",
  //     "Deployment and Best Practices",
  //   ],
  //   requirements: [
  //     "Basic understanding of JavaScript",
  //     "Familiarity with HTML and CSS",
  //     "Basic knowledge of Node.js",
  //   ],
  //   reviews: [
  //     {
  //       name: "John Doe",
  //       rating: 4,
  //       comment: "Great course! Very detailed and informative.",
  //       profilePic: "https://via.placeholder.com/50",
  //     },
  //     {
  //       name: "Jane Smith",
  //       rating: 5,
  //       comment:
  //         "Excellent course! Covered all the necessary topics thoroughly.",
  //       profilePic: "https://via.placeholder.com/50",
  //     },
  //   ],
  // };

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses/${id}?depth=3`
      );
      const data = await response.json();

      const formatedData = {
        id: data?.id,
        title: data?.title,
        amount : data?.amount,
        discount : data?.discount,
        preRequirements : data?.pre_requirements,
        learnings : data?.learnings,
        description: data?.shortDesc,
        image: process.env.NEXT_PUBLIC_PAYLOAD_URL + data?.image.url,
        roadmap : data?.Roadmap,
        reviews : data?.reviews || []
      };

      return formatedData;
    } catch (error) {
      console.log("Error fetching course data: ", error);
    }
  };

  const reviewSubmit = async ({ rating, review }) => {
    "use server";
    console.log("Review and Rating :", { rating, review });
  };

  const course = await fetchCourse();

  console.log("Course Data: ", course);

  return (
    <div className="min-h-screen py-20 mt-10 px-5 md:px-10 lg:px-16 xl:px-[15%] bg-gray-900 text-gray-200">
      {/* Course Detail Grid Layout */}
      <DetailCard
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
            <CourseReview
              reviews={course?.reviews}
              handleReviewSubmit={reviewSubmit}
            ></CourseReview>
          </div>
        </div>

        {/* Learnings and Prerequisites */}
        <div className="space-y-5">
          <CouresLearn learnings={course?.learnings} />
          <CourseRequirements requirements={course?.preRequirements} />
        </div>
      </div>

      <div className="lg:hidden mt-5">
        <CourseReview
          reviews={course?.reviews}
          handleReviewSubmit={reviewSubmit}
        ></CourseReview>
      </div>
    </div>
  );
};

export default CourseDetail;
