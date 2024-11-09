import Image from "next/image";
import React, { useRef } from "react";

const VideoModal = ({ selectedVideo, setOpen, isOpen }) => {
  const videoRef = useRef(null);


  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; 
    }
    setOpen(false);
  };

  return (
    <div
      className={`${isOpen ? "bg-black/70 pointer-events-auto z-[999]" : "bg-transparent pointer-events-none z-[-1]"} fixed w-screen h-[105vh] -top-[5px] left-0 grid place-content-center`}
    >
      <div className="bg-black aspect-video w-[90%] lg:w-[50vw] relative justify-self-center rounded-t-md">
        <video
          ref={videoRef}
          className="w-full h-full"
          controls
          controlsList="nodownload"
          poster={
            process.env.NEXT_PUBLIC_PAYLOAD_URL +
            selectedVideo?.videoThumbnail?.url
          }
          src={
            process.env.NEXT_PUBLIC_CLOUDFRONT_URL + "/" + selectedVideo?.video
          }
        />

        {/* close button */}
        <div
          className="absolute top-2 right-2 hover:bg-white transition-all group cursor-pointer bg-black rounded-full p-2"
          onClick={handleClose}
        >
          <Image
            src={"/cross-mark.svg"}
            width={25}
            height={25}
            alt="close"
            className="group-hover:invert"
          />
        </div>
      </div>

      {/* video details */}
      <div className="w-[90%] lg:w-full text-white justify-self-center bg-black p-3 lg:p-5 rounded-b-md">
        {/* title */}
        <div className="font-bold text-xl lg:text-2xl">
          {selectedVideo?.topic}
        </div>
        {/* description */}
        <div className="mt-1 text-sm lg:text-base">
          {selectedVideo?.shortDesc}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
