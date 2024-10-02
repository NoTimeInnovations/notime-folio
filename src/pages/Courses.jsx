import React, { useEffect } from "react";
import Banner from "../components/common/Banner";
import CourseCard from "../components/courses/CourseCard";
import ScrollProgressIndicator from "../components/common/ScrollProgressIndicator";

const Courses = () => {
  
  const courses = [
    {
      id: 1,
      title: "MERN Stack Development",
      description: "Master MERN stack by building real world projects",
      image:
        "https://www.jsmastery.pro/_next/image?url=%2Fassets%2Fblog%2Fimages%2FThumnail.png&w=384&q=75",
    },
    {
      id: 2,
      title: "MERN Stack Development",
      description: "Master MERN stack by building real world projects",
      image:
        "https://www.jsmastery.pro/_next/image?url=%2Fassets%2Fblog%2Fimages%2FThumnail.png&w=384&q=75",
    },
    {
      id: 3,
      title: "MERN Stack Development",
      description: "Master MERN stack by building real world projects",
      image:
        "https://www.jsmastery.pro/_next/image?url=%2Fassets%2Fblog%2Fimages%2FThumnail.png&w=384&q=75",
    },
    {
      id: 4,
      title: "MERN Stack Development",
      description: "Master MERN stack by building real world projects",
      image:
        "https://www.jsmastery.pro/_next/image?url=%2Fassets%2Fblog%2Fimages%2FThumnail.png&w=384&q=75",
    },
    {
      id: 5,
      title: "MERN Stack Development",
      description: "Master MERN stack by building real world projects",
      image:
        "https://www.jsmastery.pro/_next/image?url=%2Fassets%2Fblog%2Fimages%2FThumnail.png&w=384&q=75",
    },
    {
      id: 6,
      title: "MERN Stack Development",
      description: "Master MERN stack by building real world projects",
      image:
        "https://www.jsmastery.pro/_next/image?url=%2Fassets%2Fblog%2Fimages%2FThumnail.png&w=384&q=75",
    },
    {
      id: 7,
      title: "MERN Stack Development",
      description: "Master MERN stack by building real world projects",
      image:
        "https://www.jsmastery.pro/_next/image?url=%2Fassets%2Fblog%2Fimages%2FThumnail.png&w=384&q=75",
    },
    {
      id: 8,
      title: "MERN Stack Development",
      description: "Master MERN stack by building real world projects",
      image:
        "https://www.jsmastery.pro/_next/image?url=%2Fassets%2Fblog%2Fimages%2FThumnail.png&w=384&q=75",
    },
  ];
  

  useEffect(() => {
    window.scrollTo(0, 0);
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
