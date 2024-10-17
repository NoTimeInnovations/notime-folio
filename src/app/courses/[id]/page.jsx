
import CourseDetail from "@/pages/CourseDetail";
import CourseDetailForRegistered from "@/pages/CourseDetailForRegistered";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const fetchCourseDetail = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/courses/${id}?depth=3`
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


const page = async({ params }) => {
  
  const authToken = cookies().get('auth_token')?.value;
  const enrolled_course = cookies().get('enrolled_course')?.value;
  const courseDetails = await fetchCourseDetail(params?.id);

  if (authToken && enrolled_course == params?.id) {
    return <CourseDetailForRegistered />;
  }else if (authToken){
    return <CourseDetail course={courseDetails} />;
  }else{
    redirect('/login');
  }

};

export default page;
