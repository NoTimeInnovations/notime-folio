import React, { useState } from "react";

export const CourseRoadmap=({roadmap})=>{
    const [openDay, setOpenDay] = useState(null);
    const toggleDay = (day) => {
        setOpenDay(openDay === day ? null : day);
    };

    return (<>
                <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">
                    Roadmap
                </h2>
                {roadmap.map((day, index) => (
                    <div key={index} className="mb-5">
                        <button
                            className="w-full text-left bg-gray-700 p-4 rounded-lg focus:outline-none shadow-md transition-colors hover:bg-gray-600"
                            onClick={() => toggleDay(day.day)}
                        >
                            <span className="text-lg font-semibold text-gray-300">
                                {day.day}
                            </span>
                        </button>
                        {openDay === day.day && (
                            <div className="mt-2">
                                {day.topics.map((topic, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 border-l-4 border-blue-500 bg-gray-800 shadow-sm rounded-md mb-3 transition-transform transform hover:translate-x-2"
                                    >
                                        <h3 className="font-semibold text-gray-200">
                                            {topic.title}
                                        </h3>
                                        <div className="text-sm text-gray-400 mt-2">
                                            <p className="mb-1">{topic.content}</p>
                                            <p className="text-blue-400 underline cursor-pointer">
                                                {topic.video}
                                            </p>
                                            <p className="text-green-400 mt-1">{topic.exercise}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
    </>)
}