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
      <div className="grid sm:grid-cols-[40%,1fr] place-items-center gap-5 bg-gray-800 shadow-lg rounded-lg p-8">


          {/* Image and Heading */}
          <div className=" relative w-full aspect-video rounded overflow-hidden">
            <Image
              className="w-full h-full"
              src={image}
              alt={title}
              fill
            />
          </div>

          {/* Course Details */}
          <div>
            <H1 className={"flex justify-center sm:justify-start lg:text-[2.5rem]  items-center gap-2"}>
              <GradientText>{title}</GradientText>
              <div className="font-semibold text-green-500 text-lg">
                - Level {courseLevel}
              </div>
            </H1>
            <P className={"text-center sm:text-start"}>{description}</P>
            <div className="sm:col-span-2 space-y-4 mt-5 text-center sm:text-start">
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
    </>
  );
};
