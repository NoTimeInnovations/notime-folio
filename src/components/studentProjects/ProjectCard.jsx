import React from "react";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../utils/sanity/client";
import Image from "next/image";

const ProjectCard = ({ project }) => {
  const builder = imageUrlBuilder(client);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" bg-[#0e1116] h-full border-[#252d39] border rounded-lg shadow  overflow-hidden"
      >
        {/* thumbnail  */}
        <a
          target="_blank"
          href={project?.project_link}
          className="relative cursor-pointer "
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className=" absolute z-[1] top-0 left-0 w-full h-full bg-[#00000071] rounded-t-lg backdrop-blur-sm text-white font-medium text-2xl grid place-content-center "
          >
            Visit Site
          </motion.div>
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded">
            <Image
              src={builder?.image(project?.project_image).url()}
              alt={project?.name}
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </a>

        {/* details  */}
        <div className="p-5 grid gap-5">
          {/* developer  */}
          <div className="w-[48px] rounded relative aspect-square overflow-hidden">
            <Image
              src={builder.image(project?.profile_image).url()}
              alt={project?.name}
              fill
              className="object-cover w-full h-full"
            />
          </div>

          {/* title and desc  */}
          <div>
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                {project?.project_title}
              </h5>
            </a>
            <p className="mb-3 font-medium text-sm text-gray-300">
              By {project?.name} - {project?.position}
            </p>
            <p className="mb-3 font-normal text-sm text-gray-400">
              {project?.project_description}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCard;
