import React from "react";
import DeveloperCard from "@/components/home/DeveloperCard";

const DevelopersSection = () => {
  return (
    <div className="grid place-items-center md:grid-cols-2 xl:grid-cols-4 gap-5 lg:max-w-2xl xl:max-w-full">
      <DeveloperCard />
      <DeveloperCard />
      <DeveloperCard />
      <DeveloperCard />
    </div>
  );
};

export default DevelopersSection;
