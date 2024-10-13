
import CourseDetail from "@/pages/CourseDetail";
import CourseDetailForRegistered from "@/pages/CourseDetailForRegistered";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = ({ params }) => {
  
  const authToken = cookies().get('auth_token')?.value;
  const enrolled_course = cookies().get('enrolled_course')?.value;

  console.log("Enrolled Course: ", enrolled_course);
  console.log("Params: ", params);
  console.log("Auth Token: ", authToken);
  
  

  if (authToken && enrolled_course == params?.id) {
    return <CourseDetailForRegistered />;
  }else if (authToken){
    return <CourseDetail id={params?.id} />;
  }else{
    redirect('/login');
  }

};

export default page;
