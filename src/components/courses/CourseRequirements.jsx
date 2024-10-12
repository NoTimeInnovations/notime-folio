"use client";
import React from "react";

export const CourseRequirements = ({requirements}) => {

    return (<>
        <div className=" bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-white text-center">
                Previous Requirements
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
                {requirements?.map((req) => (
                    <li key={req.id} className="grid grid-cols-[24px,1fr] gap-3">
                        <span className="w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full">
                            ✓
                        </span>
                        {req.requirement}
                    </li>
                ))}
            </ul>
        </div>
    </>)
}