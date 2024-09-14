import React from "react";
import GradientText from "../common/GradientText";

export const DetailCard = ({image,title,description}) => {

    return (<>
        <div className="flex flex-col items-center bg-gray-800 shadow-lg rounded-lg p-8">
            <img
                className="w-full max-w-xs rounded-lg transition-transform transform hover:scale-105"
                src={image}
                alt={title}
            />
            <GradientText>{title}</GradientText>
            <p className="text-gray-400 mt-3 text-center max-w-md">
                {description}
            </p>
        </div>
    </>)
}