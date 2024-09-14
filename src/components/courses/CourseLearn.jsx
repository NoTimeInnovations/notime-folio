import React from "react";


export const CouresLearn = ({learnings}) => {
    return (<>
        <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-white text-center">
                What You Will Learn
            </h2>
            <ul className="space-y-3">
                {learnings.map((learning, index) => (
                    <li key={index} className="flex items-center">
                        <span className="w-6 h-6 mr-3 flex items-center justify-center bg-green-500 text-white rounded-full">
                            ✓
                        </span>
                        <span className="text-gray-300">{learning}</span>
                    </li>
                ))}
            </ul>
        </div>
    </>)

}