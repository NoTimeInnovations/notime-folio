
import CourseDetail from "@/pages/CourseDetail";
import CourseDetailForRegistered from "@/pages/CourseDetailForRegistered";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

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
  const courseDetails = await fetchCourseDetail(params?.id);
  const enrolled_course = courseDetails?.courses?.find(course => course.id == params?.id)?.id;
  const error = params?.error;
  const success = params?.success;

  if (error) {
    toast.error("Payment failed. Please try again.");
  }

  if (success) {
    toast.success("Payment successful. You are now enrolled in the course.");
  }

  console.log('enrolled_course', enrolled_course);
  console.log('my course', courseDetails?.courses);
  
  

  if (authToken && enrolled_course == params?.id) {
    return <CourseDetailForRegistered />;
  }else if (authToken){
    return <CourseDetail course={courseDetails} />;
  }else{
    redirect('/login');
  }

};

export default page;
