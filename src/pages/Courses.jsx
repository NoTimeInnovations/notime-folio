"use client";
import React, { useEffect } from "react";
import CourseCard from "../components/courses/CourseCard";
import ScrollProgressIndicator from "../components/common/ScrollProgressIndicator";

const Courses = () => {
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses`
        );
        const data = await response.json();

        console.log(data);

        const formatedData = data?.docs.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.shortDesc,
          image: process.env.NEXT_PUBLIC_PAYLOAD_URL + course.image.url,
        }));

        setCourses(formatedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, []);
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
