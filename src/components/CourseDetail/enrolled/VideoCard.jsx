import React, { useEffect, useState } from "react";
import GradientText from "@/components/common/GradientText";
import toast from "react-hot-toast";
import Image from "next/image";

const VideoCard = ({
  index,
  currentVideoTitle,
  videoTitle,
  onClick,
  isUnlocked,
  videoThumbnail,
  videoUrl,
}) => {
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    if (videoUrl) {
      const video = document.createElement("video");
      video.src = videoUrl;

      video.onloadedmetadata = () => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60)
          .toString()
          .padStart(2, "0");
        setDuration(`${minutes}:${seconds}`);
      };

      return () => {
        video.src = "";
      };
    }
  }, [videoUrl]);

  const handleClick = () => {
    if (!isUnlocked) {
      toast.error("This video is locked.");
      return;
    }
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        !isUnlocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } grid grid-cols-2 gap-3 hover:bg-gradient-to-r hover:from-white/20 hover:to-transparent transition-all duration-500 rounded-xl ${
        videoTitle === currentVideoTitle
          ? "bg-gradient-to-r from-green-500/20 hover:from-green-500/40 to-transparent"
          : ""
      }`}
    >
      <div
        className="bg-black aspect-video rounded-xl relative"
        style={{
          backgroundImage: videoThumbnail ? `url(${videoThumbnail})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* lock icon  */}
        {!isUnlocked && (
          <Image src={"/lock.svg"} alt="lock" width={30} height={30} className="invert absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}

        {/* Display video duration */}
        <div className="text-white bg-white/10 rounded absolute bottom-2 px-2 py-1 right-2 text-xs">
          {duration}
        </div>
      </div>

      <div className="text-white flex flex-col justify-center">
        {/* Display topic number */}
        <GradientText className="text-sm font-semibold w-fit">
          Topic {index + 1}
        </GradientText>

        {/* Display video title */}
        <div className="font-medium text-sm line-clamp-3 overflow-hidden text-ellipsis">
          {videoTitle}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
