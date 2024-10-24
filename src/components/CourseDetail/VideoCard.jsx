import React from "react";
import GradientText from "../common/GradientText";

const VideoCard = ({ index, currentVideoTitle, videoTitle }) => {
  return (
    <div
      className={`grid grid-cols-2 gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-white/20 hover:to-transparent transition-all duration-500 rounded-xl ${videoTitle == currentVideoTitle ? "bg-gradient-to-r from-green-500/20 hover:from-green-500/40  to-transparent" : ""}`}
    >
      <div className="bg-black aspect-video rounded-xl relative">
        {/* duration  */}
        <div className="text-white bg-white/10 rounded absolute bottom-2 px-2 py-1 right-2 text-xs">
          30:00
        </div>
      </div>

      <div className="text-white flex flex-col justify-center">
        {/* day  */}
        <GradientText className={"text-sm font-semibold w-fit"}>
          Topic {index + 1}
        </GradientText>
        {/* title  */}
        <div className="font-medium text-sm line-clamp-3 overflow-hidden text-ellipsis">
          {videoTitle}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
