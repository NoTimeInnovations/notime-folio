import { motion } from "framer-motion";
import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../utils/sanity/client";

const VideoCard = ({ video }) => {
  const builder = imageUrlBuilder(client);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm bg-[#0e1116] border-[#252d39] border rounded-lg shadow"
      >
        {/* video thumbnail  */}
        <a target="_blank" href={video?.link} className="relative cursor-pointer">
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className=" absolute top-0 left-0 w-full h-full bg-[#00000071] rounded-t-lg backdrop-blur-sm text-white font-medium text-2xl grid place-content-center "
          >
            Watch Now
          </motion.div>
          <img
            className="rounded-t-lg"
            src={builder.image(video?.thumbnail).url()}
            alt=""
          />
        </a>
        <div className="p-5 flex gap-5">
          <a href="https://www.youtube.com/@notimeinstitution6818">
            <img
              className="rounded-full w-16"
              src="/channel_profile.jpg"
              alt="channel"
            />
          </a>
          {/* title and desc  */}
          <div>
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                {video?.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-400">
              {video?.description}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default VideoCard;
