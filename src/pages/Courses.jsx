"use client";
import React from "react";
import CourseCard from "../components/courses/CourseCard";
import ScrollProgressIndicator from "../components/common/ScrollProgressIndicator";

const Courses = ({ courses }) => {
  return (
    <div>
      <ScrollProgressIndicator />

      {/* courses  */}
      <div className="grid gap-10 lg:grid-cols-2 lg:mt-20 place-items-center justify-center">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
