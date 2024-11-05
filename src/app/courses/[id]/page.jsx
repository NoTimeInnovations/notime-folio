"use server";

import CourseDetail from "@/pages/CourseDetail";
import CourseDetailForRegistered from "@/pages/CourseDetailForRegistered";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const fetchCourseDetail = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses/${id}?depth=4`
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
    return formatedData;
  } catch (error) {
    console.log("Error fetching course data: ", error);
  }
};

const fetchUserCourses = async () => {
  try {
    const authToken = cookies().get("auth_token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/me?depth=2`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const data = await response.json();
    return data?.user?.courses;
  } catch (error) {
    console.error("Error fetching user courses: ", error);
  }
};

export const updateCourseData = async (courseId) => {
  const courseDetails   = await fetchCourseDetail(courseId);
  const userCoursesData = await fetchUserCourses();

  const enrolledCourse = userCoursesData?.find(
    (c) => c?.course?.id == courseId
  );

  const courseData = {
    ...courseDetails,
    roadmap_id: enrolledCourse.roadmap_id,
    topic_id: enrolledCourse.topic_id,
  };

  return courseData;
}

const page = async ({ params, searchParams }) => {
  const authToken = cookies().get("auth_token")?.value;
  const courseDetails = await fetchCourseDetail(params?.id);
  const userCoursesData = await fetchUserCourses();

  const enrolledCourse = userCoursesData?.find(
    (c) => c?.course?.id == params?.id
  );
  const enrolledCourseId = enrolledCourse?.course?.id;

  console.log("enrolled_course_id", enrolledCourseId);
  console.log("this_course", courseDetails?.id);

  const courseData = {
    ...courseDetails,
    roadmap_id: enrolledCourse?.roadmap_id,
    topic_id: enrolledCourse?.topic_id,
  };

  if (authToken && enrolledCourseId == params?.id) {
    return <CourseDetailForRegistered courseData={courseData} />;
  } else if (authToken) {
    return <CourseDetail course={courseDetails} />;
  } else {
    redirect("/login");
  }
};

export default page;
