import React from "react";
import GradientText from "../common/GradientText";

const VideoCard = ({ video }) => {
  return (
    <div className="grid grid-cols-2 gap-3 ">
      <div className="bg-black aspect-video rounded-xl relative">
        {/* duration  */}
        <div className="text-white bg-white/10 rounded absolute bottom-2 px-2 py-1 right-2 text-xs">
            30:00
        </div>
      </div>

      <div className="text-white place-self-center">
        {/* day  */}
        <GradientText className={'text-sm font-semibold'}>Day {video.day}</GradientText>
        {/* title  */}
        <div className="font-medium text-sm line-clamp-3 overflow-hidden text-ellipsis">{video.videoTitle}</div>
      </div>
    </div>
  );
};

export default VideoCard;
