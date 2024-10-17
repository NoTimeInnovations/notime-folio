import Banner from "@/components/common/Banner";
import Courses from "@/pages/Courses";
import Leaderboard from "@/pages/Leaderboard";
import React from "react";

const fetchCourses = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses`
    );
    const data = await response.json();

    const formatedData = data?.docs.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.shortDesc,
      image: process.env.NEXT_PUBLIC_PAYLOAD_URL + course.image.url,
    }));

    return formatedData;
  } catch (error) {
    console.log(error);
  }
};

export default async function page() {
  const courses = await fetchCourses();
  return (
    <div className="mt-12 py-20 mx-20">
      <Banner text="Courses" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 justify-center">
        <div className="flex justify-center lg:order-last">
          <Leaderboard />
        </div>
        <div className="lg:col-span-2">
          <Courses courses={courses} />
        </div>
      </div>
    </div>
  );
}
