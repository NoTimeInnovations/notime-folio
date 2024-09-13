import React, { useEffect, useState } from "react";
import H1 from "../../common/H1";
import { client } from "../../../utils/sanity/client";
import LevelCard from "./LevelCard";

const WhatWillYouLearn = () => {
  const [levels, setLevels] = useState();

  useEffect(() => {
    const fetchLevels = async () => {
      const levels = await client.fetch(`*[_type == "levels"]{
        title,
        icon,
        level_title,
        main_contents[] {
          title,
          content
        }
      } | order(title asc)`);

      setLevels(levels);
    };

    fetchLevels();
  }, []);

  const gradientsForLevels = [
    "from-green-500 to-yellow-500",
    "from-sky-500 to-violet-500",
    "from-rose-500 to-amber-500",
    "from-blue-500 to-green-500",
    "from-violet-500 to-sky-500",
  ];

  return (
    <div
      id="details"
      className="grid gap-10 md:gap-10 my-10 max-w-6xl overflow-y-hidden"
    >
      {/* heading  */}
      <H1 className="flex items-center justify-center gap-3 mb-16">
        {/* arrow left  */}
        <img src="/arrow-down.svg" alt="arrow" className="w-12" />
        {/* text  */}
        <H1 className={"text-nowrap"}>See what you'll learn</H1>
        {/* arrow right  */}
        <img src="/arrow-down.svg" alt="arrow" className="w-12" />
      </H1>

      {/* levels */}

      <div className="grid gap-20 lg:grid-cols-2">
        {levels?.map((level, index) => (
          <LevelCard
            key={`${level?.title}_${index}`}
            level={level}
            gradient={gradientsForLevels[index % gradientsForLevels.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default WhatWillYouLearn;
