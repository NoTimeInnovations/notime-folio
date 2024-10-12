import React from "react";
import Banner from "../components/common/Banner";
import CourseCard from "../components/courses/CourseCard";
import ScrollProgressIndicator from "../components/common/ScrollProgressIndicator";

const Courses = async() => {
  
  // const courses = [
  //   {
  //     id: 1,
  //     title: "MERN Stack Development",
  //     description: "Master MERN stack by building real world projects",
  //     image:
  //       "https://www.jsmastery.pro/_next/image?url=%2Fassets%2Fblog%2Fimages%2FThumnail.png&w=384&q=75",
  //   }
  // ];


  const fetchCourses = async() => {
    try {
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses`);
      const data = await response.json();

      console.log(data);
      
      const formatedData = data?.docs.map((course) => ({
        id : course.id,
        title : course.title,
        description : course.shortDesc,
        image : process.env.NEXT_PUBLIC_PAYLOAD_URL + course.image.url
      }));

      return formatedData;

    } catch (error) {
      
      console.log(error);

    }
  }
  
  const courses = await fetchCourses();

  console.log(courses);
  
  
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
