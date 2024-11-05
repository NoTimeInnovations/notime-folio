"use client";
import React, { useState } from "react";
import H1 from "../common/H1";
import Link from "next/link";

export const CourseRoadmap = ({ roadmap }) => {
  const [openDay, setOpenDay] = useState(null);

  const toggleDay = (day) => {
    setOpenDay(openDay === day ? null : day);
  };

  return (
    <>
      <div className="bg-gray-800 shadow-lg rounded-lg p-6">
        <H1 className="text-center mb-4 lg:text-[2.3rem]">Roadmap</H1>
        {roadmap?.map((day, index) => (
          <div key={index} className="mb-5">
            <button
              className="w-full text-left bg-gradient-to-r from-green-500 to-yellow-500 p-4 rounded-lg focus:outline-none shadow-md transition-all "
              onClick={() => toggleDay(day.day)}
            >
              <span className="text-xl font-bold text-white tracking-wider">
                Day {day.day}
              </span>
            </button>
            {openDay === day.day && (
              <div className="mt-3 space-y-4 transition-all duration-300">
                {day.Topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-5 border-l-4 border-yellow-400 bg-gray-700 shadow-md rounded-md mb-3 transition-all hover:bg-gray-600 hover:shadow-lg"
                  >
                    <h3 className="font-semibold text-lg text-white mb-2">
                      {topic.topic}
                    </h3>
                    <div className="text-sm text-gray-300">
                      <p className="mb-2">{topic.shortDesc}</p>
                      <Link
                        href={topic.video}
                        className="text-blue-400 underline cursor-pointer hover:text-blue-300 transition-colors"
                      >
                        Watch Video
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
