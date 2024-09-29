"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { EventDetails } from "@/pages/EventsPage";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroCarousel() {
  const TreandingEvents = EventDetails?.filter(
    (events) => events.trending === true
  );

  return (
    <motion.section initial={{ opacity : 0 , filter : 'blur(10px)'  }} whileInView={{ opacity : 1 , filter : 'blur(0px)' }} transition={{ duration : .5 }} >
      <Swiper
        breakpoints={{
          1024: {
            slidesPerView: 1.4,
          },
        }}
        effect={"coverflow"}
        grabCursor={true}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop="true"
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        className="mySwiper event-page-swiper"
      >
        {TreandingEvents?.map((event, index) => (
          <SwiperSlide
            className="relative group rounded-md overflow-hidden"
            key={`${event?.title}_${index}_carousel`}
          >
            {/* carousel image  */}
            <div className="relative w-full h-[300px] sm:h-[500px] rounded-md overflow-hidden">
              <Image
                src={event?.image}
                alt={event?.title}
                fill
                className="object-cover w-full h-full brightness-75 group-hover:brightness-95"
              />
            </div>

            {/* carousel contents */}
            <div className="absolute text-white p-[3%] sm:p-[5%] top-0 left-0 gap-2 flex flex-col justify-end w-full h-full bg-gradient-to-b from-transparent to-black group-hover:opacity-50 transition-all duration-500">
              <div
                className={`text-black flex w-fit items-end gap-1 bg-gradient-to-r  text-xs sm:text-sm px-3 sm:px-5 py-2  ${event.status === "upcoming" ? "from-green-500 via-green-500 to-transparent" : "from-yellow-500 via-yellow-500 to-transparent"}`}
              >
                <span>
                  <Image
                    src={"/calander.svg"}
                    alt="date"
                    width={30}
                    height={30}
                    className="aspect-square w-[20px] sm:w-[30px]"
                  />
                </span>
                <span className="font-medium">{event.date}</span>
                <span>-</span>
                <span className="font-semibold capitalize text-sm sm:text-base">
                  {event.status}
                </span>
              </div>
              <div className="font-semibold  sm:max-w-[50%] text-balance text-xl sm:text-3xl">
                {event.title}
              </div>
              <div className="sm:max-w-[60%] text-xs sm:text-sm text-white/70">
                {event.desc}
              </div>
              <div className="flex items-end gap-1 text-sm">
                <span>
                  <Image
                    src={"/location.svg"}
                    alt="location"
                    width={20}
                    height={20}
                    className="invert"
                  />
                </span>
                <span>{event.location}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}
