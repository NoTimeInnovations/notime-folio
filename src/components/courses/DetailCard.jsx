import React from "react";
import GradientText from "../common/GradientText";

export const DetailCard = ({ image, title, description }) => {

    return (<>
        <div className="flex flex-col items-center bg-gray-800 shadow-lg rounded-lg p-8">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Image and Heading */}
                <div className="md:col-span-1">
                    <img
                        className="w-full max-w-xs rounded-lg transition-transform transform hover:scale-105"
                        src={image}
                        alt={title}
                    />
                </div>

                {/* Course Details */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <GradientText>{title}</GradientText>
                    </div>
                    <p className="text-gray-400 mt-3 text-center max-w-md">
                        {description}
                    </p>
                    <div className="md:col-span-2 space-y-4 text-green-500">
                        <div className="text-3xl md:text-4xl font-bold">
                            $90,000
                        </div>
                        <div className="text-xl md:text-2xl text-gray-400 line-through">
                            $100,000
                        </div>
                        <button className="px-4 py-2 mt-4 bg-indigo-600 text-white rounded">
                            Enroll Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </>)
}