"use client";
import React from "react";
import GradientText from "../common/GradientText";
import { useRouter } from "next/navigation";

const CourseCard = ({ course }) => {
  const router = useRouter();
  return (
    <div onClick={()=>router.push(`/courses/${course.id}`)} className="cursor-pointer hover:scale-110 transition-all">
      <div className="w-[20rem] sm:w-[30rem] md:w-[40rem] lg:w-[20rem] xl:w-[25rem] bg-[#0e1116] border-[#252d39] border rounded-lg shadow">
        <div>
          <img className="object-cover w-full h-full rounded-t-lg" src={course.image} alt="" />
        </div>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              {course.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-400">{course.description}</p>
          <a
            href="#"
            className="inline-flex items-center py-2 text-sm font-medium text-center "
          >
            <GradientText>Read more</GradientText>
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
