
import CourseDetail from "@/pages/CourseDetail";
import CourseDetailForRegistered from "@/pages/CourseDetailForRegistered";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
import React from "react";

const page = () => {
  
  const authToken = cookies().get('auth_token');

  if (!authToken) {
    return <CourseDetail />;
  }

  return <CourseDetailForRegistered />;
};

export default page;
