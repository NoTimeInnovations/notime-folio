"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/utils/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import ReviewCard from "./ReviewCard";
import { Autoplay } from "swiper/modules";

const SwiperSlider = () => {
  const builder = imageUrlBuilder(client);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await client.fetch(`*[_type == "review"]{
              image,
              review,
              name,
              position
            }`);
      setReviews(reviews);
    };

    fetchReviews();
  }, []);
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        className="mySwiper z-10"
      >
        {reviews?.map((review, index) => (
          <SwiperSlide key={`review_${index}`}>
            <ReviewCard
              image={builder.image(review.image).url()}
              name={review.name}
              position={review.position}
              review={review.review}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperSlider;
