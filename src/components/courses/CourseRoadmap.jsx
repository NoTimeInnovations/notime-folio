import React, { useState } from "react";

export const CourseRoadmap = ({ roadmap }) => {
    const [openDay, setOpenDay] = useState(null);
    
    const toggleDay = (day) => {
        setOpenDay(openDay === day ? null : day);
    };

    return (
        <>
            <div className="bg-gray-800 shadow-lg rounded-lg mt-12 p-6">
                <h2 className="text-4xl font-extrabold mb-6 text-white text-center">
                    Roadmap
                </h2>
                {roadmap.map((day, index) => (
                    <div key={index} className="mb-5">
                        <button
                            className="w-full text-left bg-gradient-to-r from-indigo-600 to-blue-500 p-4 rounded-lg focus:outline-none shadow-md transition-all hover:shadow-lg hover:scale-105 transform"
                            onClick={() => toggleDay(day.day)}
                        >
                            <span className="text-xl font-bold text-white tracking-wider">
                                {day.day}
                            </span>
                        </button>
                        {openDay === day.day && (
                            <div className="mt-3 space-y-4 transition-all duration-300">
                                {day.topics.map((topic, idx) => (
                                    <div
                                        key={idx}
                                        className="p-5 border-l-4 border-blue-400 bg-gray-700 shadow-md rounded-md mb-3 transition-all hover:bg-gray-600 hover:shadow-lg"
                                    >
                                        <h3 className="font-semibold text-lg text-white mb-2">
                                            {topic.title}
                                        </h3>
                                        <div className="text-sm text-gray-300">
                                            <p className="mb-2">{topic.content}</p>
                                            <p className="text-blue-400 underline cursor-pointer hover:text-blue-300 transition-colors">
                                                Watch Video
                                            </p>
                                            <p className="text-green-400 mt-2">
                                                {topic.exercise}
                                            </p>
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
