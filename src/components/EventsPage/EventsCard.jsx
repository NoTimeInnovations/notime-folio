import React from "react";
import GradientText from "../common/GradientText";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const EventsCard = ({ event }) => {
  const formatedDate = new Date(event?.date).toDateString();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full bg-[#0e1116] border-[#252d39] border rounded-lg shadow overflow-hidden"
      >
        <div className="relative  w-full aspect-[16/9] overflow-hidden">
          <Image
            src={event?.image?.url}
            alt={event?.title}
            fill
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-2 sm:p-5">
          <div className="mb-1">
            <h5 className=" sm:text-2xl flex items-center gap-2 font-bold tracking-tight text-white">
              {event?.title}
              <span className={`${event?.status === "upcoming" ? 'text-green-500' : 'text-orange-500'} font-medium text-sm`}>- {event?.status}</span>
            </h5>
          </div>

            <div className="flex items-center gap-2 opacity-80 mb-2">
              <Image
                src={'/calander.svg'}
                alt="date"
                width={20}
                height={20}
                className="invert"
              />
              <span className="text-white font-medium text-sm">{formatedDate}</span>
            </div>

          <p className="mb-3 font-normal text-gray-400 text-xs sm:text-base overflow-hidden text-ellipsis">
            {event?.description}
          </p>
          {event?.status === "upcoming" && event?.registrationLink && (
            <Link
              href={event?.registrationLink}
              className="inline-flex items-center py-2 text-sm font-medium text-center "
            >
              <GradientText>Register Now</GradientText>
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
            </Link>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default EventsCard;
