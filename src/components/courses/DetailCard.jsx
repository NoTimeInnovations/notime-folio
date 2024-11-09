"use client";
import React, { useEffect } from "react";
import GradientText from "../common/GradientText";
import Button from "../home/Button";
import H1 from "../common/H1";
import P from "../common/P";
import Image from "next/image";
import { useRouter } from "next/navigation";
import jsCookie from "js-cookie";
import { paymentCCAvenue } from "@/app/actions/handlePayment";
import Cookies from "js-cookie";

export const DetailCard = ({
  image,
  title,
  description,
  price,
  discount,
  id,
  courseLevel,
}) => {
  const [finalPrice, setFinalPrice] = React.useState(0);
  const router = useRouter();

  function calculateDiscountPrice(price, discountPercentage) {
    const discountAmount = (price * discountPercentage) / 100;
    const discountPrice = price - discountAmount;
    return discountPrice;
  }

  useEffect(() => {
    const discountPrice = calculateDiscountPrice(price, discount || 0);
    setFinalPrice(discountPrice);
  }, [price, discount]);

  const handleEnrollToCourse = async () => {
    const user = JSON.parse(jsCookie.get("user"));
    const authToken = jsCookie.get("auth_token");
    const paymentURL = await paymentCCAvenue(
      finalPrice,
      user?.name,
      user?.email,
      id,
      user?.id,
      authToken
    );
    if (paymentURL) {
      Cookies.set("paymentURL", paymentURL, { expires: 0.00023148 }); // 20 sec
      router.push(paymentURL);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-gray-800 shadow-lg rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image and Heading */}
          <div className="md:col-span-1 relative w-[300px] aspect-video my-auto">
            <Image
              className="w-full object-cover rounded-lg transition-transform transform hover:scale-105"
              src={image}
              alt={title}
              fill
            />
          </div>

          {/* Course Details */}
          <div className="md:col-span-2 my-auto">
            <H1 className={"text-center lg:text-start lg:text-[2.5rem] flex items-center gap-2"}>
              <GradientText>{title}</GradientText>
              <div className="font-semibold text-green-500 text-lg">
                - Level {courseLevel}
              </div>
            </H1>
            <P className={"text-center lg:text-start"}>{description}</P>
            <div className="md:col-span-2 space-y-4 mt-5 text-center lg:text-start">
              <div>
                {discount > 0 ? (
                  <>
                    <div className="text-3xl md:text-4xl font-bold">
                      ₹{finalPrice}
                    </div>
                    <div className="text-xl md:text-2xl text-gray-400 line-through">
                      ₹{price}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl md:text-4xl font-bold">
                      ₹{finalPrice}
                    </div>
                  </>
                )}
              </div>
              <Button
                onClick={handleEnrollToCourse}
                text={"Enroll Now"}
                gradient={`bg-gradient-to-r from-green-500 to-yellow-500 text-white lg:max-w-[250px]`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
