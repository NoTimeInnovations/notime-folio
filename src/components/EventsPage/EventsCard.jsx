import React from "react";
import GradientText from "../common/GradientText";
import Image from "next/image";
import { motion } from "framer-motion";

const EventsCard = ({ event }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once : true }}
        className="w-full bg-[#0e1116] border-[#252d39] border rounded-lg shadow overflow-hidden"
      >
        <div className="relative h-[100px] sm:h-[200px] w-full overflow-hidden">
          <Image
            src={event?.image}
            alt={event?.title}
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-2 sm:p-5">
          <a href="#">
            <h5 className="mb-2 sm:text-2xl font-bold tracking-tight text-white">
              {event?.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-400 text-xs sm:text-base overflow-hidden text-ellipsis">
            {event?.desc}
          </p>
          <a
            href="#"
            className="inline-flex items-center py-2 text-sm font-medium text-center "
          >
            <GradientText>Read more</GradientText>
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </motion.div>
    </>
  );
};

export default EventsCard;
