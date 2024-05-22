import React, { useEffect, useState } from "react";
import Banner from "../components/common/Banner";
import VideoCard from "../components/youtube-videos/VideoCard";
import ScrollProgressIndicator from "../components/common/ScrollProgressIndicator";
import { client } from "../utils/sanity/client";

const YoutubeVideos = () => {
  const [videos, setVideos] = useState();

  useEffect(() => {
    const fetchVideos = async () => {
      const Ytvideos = await client.fetch(`*[_type == 'youtube_videos']{
        thumbnail,
        link,
        title,
        description
      }`);
      setVideos(Ytvideos);
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="min-h-screen py-40 px-5 md:px-10 lg:px-16 xl:px-[15%]">
        <ScrollProgressIndicator />
        <Banner text="Youtube Videos" />

        {/* courses  */}

        <div className="grid gap-10 lg:grid-cols-3 mt-20 place-items-center">
          {videos?.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>
      </div>
    </>
  );
};

export default YoutubeVideos;
