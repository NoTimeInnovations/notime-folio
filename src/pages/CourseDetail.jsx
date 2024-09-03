import GradientText from "@/components/common/GradientText";
import { CouresLearn } from "@/components/courses/CourseLearn";
import { CourseRequirements } from "@/components/courses/CourseRequirements";
import { CourseReview } from "@/components/courses/CourseReview";
import { CourseRoadmap } from "@/components/courses/CourseRoadmap";
import { DetailCard } from "@/components/courses/DetailCard";

import React, { useEffect, useRef, useState } from "react";

const CourseDetail = () => {
    const course = {
        title: "MERN Stack Development",
        description: "Master the MERN stack by building real-world projects.",
        image: "https://via.placeholder.com/300",
        roadmap: [
            {
                day: "Day 1",
                topics: [
                    {
                        title: "Introduction",
                        video: "Video URL",
                        content: "Overview of the MERN stack",
                        exercise: "Introduction Exercise",
                    },
                    {
                        title: "Environment Setup",
                        video: "Video URL",
                        content: "Setting up your environment",
                        exercise: "Setup Exercise",
                    },
                ],
            },
            {
                day: "Day 2",
                topics: [
                    {
                        title: "Understanding MongoDB",
                        video: "Video URL",
                        content: "Basics of MongoDB",
                        exercise: "MongoDB Exercise",
                    },
                    {
                        title: "Building REST APIs",
                        video: "Video URL",
                        content: "How to create REST APIs",
                        exercise: "API Exercise",
                    },
                ],
            },
        ],
        learnings: [
            "Introduction to MERN Stack",
            "Setting up Development Environment",
            "Understanding MongoDB",
            "Creating REST APIs with Express.js",
            "Building User Interfaces with React",
            "Integrating with Node.js Backend",
            "Deployment and Best Practices",
        ],
        requirements: [
            "Basic understanding of JavaScript",
            "Familiarity with HTML and CSS",
            "Basic knowledge of Node.js",
        ],
        reviews: [
            {
                name: "John Doe",
                rating: 4,
                comment: "Great course! Very detailed and informative.",
                profilePic: "https://via.placeholder.com/50",
            },
            {
                name: "Jane Smith",
                rating: 5,
                comment: "Excellent course! Covered all the necessary topics thoroughly.",
                profilePic: "https://via.placeholder.com/50",
            },
        ],
    };


    const reviewSubmit=({rating,review})=>{
        console.log("Review and Rating :",{rating,review});
    }





    return (
        <div className="min-h-screen py-20 mt-10 px-5 md:px-10 lg:px-16 xl:px-[15%] bg-gray-900 text-gray-200">
            {/* Course Detail Card */}
            <DetailCard image={course.image} description={course.description} title={course.title} />

            {/* What We Will Learn Section */}
            <CouresLearn learnings={course.learnings} />
            {/* Previous Requirements */}
            <CourseRequirements requirements={course.requirements} />

            {/* Roadmap Section */}
            <CourseRoadmap roadmap={course.roadmap}></CourseRoadmap>
            {/* Reviews Section */}
            <CourseReview reviews={course.reviews} handleReviewSubmit={reviewSubmit}></CourseReview>
        </div>
    );
};

export default CourseDetail;
