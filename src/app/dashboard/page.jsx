import Banner from "@/components/common/Banner";
import Courses from "@/mainPages/Courses";
import Leaderboard from "@/mainPages/Leaderboard";
import { cookies } from "next/headers";
import React from "react";
import toast from "react-hot-toast";

const fetchCourses = async () => {
  try {
    const authToken = cookies().get("auth_token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data = await response.json();

    const formatedData = data?.docs?.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.shortDesc,
      image: process.env.NEXT_PUBLIC_PAYLOAD_URL + course.image.url,
      courseLevel: course.courseLevel,
    }));

    return formatedData;
  } catch (error) {
    console.log(error);
  }
};

export default async function page({ searchParams }) {
  if (cookies().get("auth_token") === undefined) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const courses = await fetchCourses();
  console.log(courses);

  const error = searchParams?.error;

  return (
    <div className="mt-12 py-20 mx-20">
      <Banner text="Courses" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 justify-center">
        {/* <div className="flex justify-center lg:order-last">
          <Leaderboard />
        </div> */}
        <div className="lg:col-span-2">
          <Courses error={error} courses={courses} />
        </div>
      </div>
    </div>
  );
}
