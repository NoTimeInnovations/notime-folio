import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const DeveloperCard = ({dev ,ImageSrc}) => {

  const renderStars = (experience) => {
    return Array.from({ length: experience }, (_, index) => (
      <p key={index}>⭐</p>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", damping: 10, stiffness: 100}}
      className=" border-[0.5px] border-[#242b34] bg-[#151B24] py-10 grid place-items-center rounded-xl w-[280px] md:w-[300px]"
    >
      {/* profile  */}
      <div className="grid place-items-center gap-2">
        {/* profile image  */}
        <div className="w-[80px] lg:w-[100px] aspect-square rounded-full overflow-hidden">
          <img
            src={ImageSrc}
            width={10}
            height={10}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* profile name  */}
        <div className="font-semibold text-lg lg:text-xl">{dev?.name}</div>
        {/* developer position  */}
        <div className="font-medium text-xs lg:text-sm opacity-50">
          {dev?.position}
        </div>
        {/* developer no. of projects and best projext  */}
        <div className="flex gap-3 mt-3">
          {/* number of projects  */}
          <div className="font-semibold text-xs lg:text-sm text-black bg-white py-1 px-2 rounded-full">
            {dev?.number_of_projects} Projects
          </div>
          {/* best project  */}
          <Link
            href={dev?.best_project_link}
            className="cursor-pointer font-semibold text-xs lg:text-sm text-white bg-black py-1 px-2 rounded-full"
          >{`Best project 🔥`}</Link>
        </div>

        {/* experience  */}
        <div className="flex items-center mt-3 gap-3">
          {/* label  */}
          <div className="font-semibold text-xs lg:text-sm">Skill</div>
          {/* stars  */}
          <div className="flex items-center">{renderStars(dev?.skill)}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperCard;
