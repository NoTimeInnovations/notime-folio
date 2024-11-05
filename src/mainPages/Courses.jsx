"use client";
import React, { useEffect } from "react";
import CourseCard from "../components/courses/CourseCard";
import ScrollProgressIndicator from "../components/common/ScrollProgressIndicator";
import toast from "react-hot-toast";

const Courses = ({ courses, error }) => {
  useEffect(() => {
    if (error) {
      console.error(error);
      setTimeout(() => {
        toast.error(error);
      }, 1000);
    }
  }, [error]);
  return (
    <div>
      <ScrollProgressIndicator />

      {/* courses  */}
      <div className="grid gap-10 lg:grid-cols-2 lg:mt-20 place-items-center justify-center">
        {courses?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
