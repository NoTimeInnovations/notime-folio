import React, { useEffect, useState } from "react";
import DeveloperCard from "@/components/home/DeveloperCard";
import { client } from "../../utils/sanity/client";
import imageUrlBuilder from '@sanity/image-url'

const DevelopersSection = () => {
  const builder = imageUrlBuilder(client);
  const [developers, setDevelopers] = useState();

  useEffect(() => {
    const query = `*[_type == 'bestDev']{
      name,
      position,
      number_of_projects,
      best_project_link,
      skill,
      profile_image
    }`;

    client.fetch(query).then((res) => {
      setDevelopers(res);
      console.log(res);
    });
  }, []);

  return (
    <div className="grid place-items-center md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-x-10 lg:max-w-2xl xl:max-w-full">
      {developers?.map((dev, index) => (
        <DeveloperCard
          key={index}
          dev={dev}
          ImageSrc={builder.image(dev?.profile_image).url()}
        />
      ))}
    </div>
  );
};

export default DevelopersSection;
