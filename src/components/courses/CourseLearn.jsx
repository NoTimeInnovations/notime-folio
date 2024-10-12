"use client";
import React from "react";

export const CouresLearn = ({learnings}) => {
    return (<>
        <div className=" bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-white text-center">
                What You Will Learn
            </h2>
            <ul className="space-y-3">
                {learnings?.map((learning) => (
                    <li key={learning.id} className="grid grid-cols-[24px,1fr] gap-3">
                        <div className="w-6 aspect-square  grid place-items-center bg-green-500 text-white rounded-full">
                            ✓
                        </div>
                        <span className="text-gray-300">{learning.learning}</span>
                    </li>
                ))}
            </ul>
        </div>
    </>)

}